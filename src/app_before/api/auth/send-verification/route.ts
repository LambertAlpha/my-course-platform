import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateVerificationCode, sendVerificationEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // 验证邮箱格式
    if (!email.endsWith('@link.cuhk.edu.cn')) {
      return NextResponse.json(
        { error: '请使用CUHK(SZ)邮箱注册' },
        { status: 400 }
      )
    }

    // 检查邮箱是否已注册
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: '该邮箱已注册' },
        { status: 400 }
      )
    }

    // 生成6位验证码
    const verificationCode = generateVerificationCode()

    // 保存验证码到数据库
    await prisma.verificationCode.create({
      data: {
        email,
        code: verificationCode,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10分钟有效期
      },
    })

    // 发送验证码邮件
    await sendVerificationEmail(email, verificationCode)

    return NextResponse.json({ message: '验证码已发送' })
  } catch (error) {
    console.error('发送验证码失败:', error)
    return NextResponse.json(
      { error: '发送验证码失败' },
      { status: 500 }
    )
  }
} 