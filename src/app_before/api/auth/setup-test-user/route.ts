import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    console.log('开始设置测试用户...')
    
    // 检查用户是否已存在
    const existingUser = await prisma.user.findUnique({
      where: { 
        email: '123090327@link.cuhk.edu.cn' 
      }
    })

    if (existingUser) {
      console.log('更新已存在的用户...')
      // 更新用户基本信息
      const updatedUser = await prisma.user.update({
        where: { 
          email: '123090327@link.cuhk.edu.cn' 
        },
        data: {
          password: '123456',
          name: 'Test User'
        }
      })
      
      console.log('用户更新成功:', {
        email: updatedUser.email,
        name: updatedUser.name
      })
    } else {
      console.log('创建新用户...')
      // 创建新用户
      const newUser = await prisma.user.create({
        data: {
          email: '123090327@link.cuhk.edu.cn',
          password: '123456',
          name: 'Test User'
        }
      })
      
      console.log('新用户创建成功:', {
        email: newUser.email,
        name: newUser.name
      })
    }

    return NextResponse.json({ 
      success: true, 
      message: '测试用户设置成功' 
    })
  } catch (error) {
    console.error('Setup test user error:', error)
    return NextResponse.json(
      { success: false, message: '设置测试用户失败' },
      { status: 500 }
    )
  }
}