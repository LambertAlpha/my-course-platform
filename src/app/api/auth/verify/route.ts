import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { email, password, verificationCode } = await request.json()

    // 查找验证码记录
    const verification = await prisma.verificationCode.findFirst({
      where: {
        email,
        code: verificationCode,
        expiresAt: {
          gt: new Date(),
        },
      },
    })

    if (!verification) {
      return NextResponse.json(
        { error: '验证码无效或已过期' },
        { status: 400 }
      )
    }

    // 对密码进行加密
    const hashedPassword = await bcrypt.hash(password, 10)

    // 创建新用户
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: email.split('@')[0], // 使用邮箱前缀作为默认用户名
      },
    })

    // 删除验证码记录
    await prisma.verificationCode.delete({
      where: {
        id: verification.id,
      },
    })

    return NextResponse.json({ message: '注册成功' })
  } catch (error) {
    console.error('验证失败:', error)
    return NextResponse.json(
      { error: '验证失败' },
      { status: 500 }
    )
  }
} 