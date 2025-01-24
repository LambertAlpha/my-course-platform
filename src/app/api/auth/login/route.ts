import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import * as jose from 'jose'
import type { LoginResponse } from '@/types'
import type { User } from '@prisma/client'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
)

export async function POST(request: Request) {
  try {
    console.log('开始处理登录请求...')
    const body = await request.text()
    console.log('收到请求体:', body)
    
    let email: string, password: string
    try {
      const data = JSON.parse(body)
      email = data.email
      password = data.password
    } catch (parseError) {
      console.error('JSON解析失败:', parseError)
      return NextResponse.json(
        { success: false, message: '无效的请求格式' },
        { status: 400 }
      )
    }

    console.log('解析的登录信息:', { email })  // 不打印密码

    // 验证邮箱格式
    if (!email.endsWith('@link.cuhk.edu.cn')) {
      console.log('邮箱格式验证失败')
      return NextResponse.json(
        { success: false, message: '请使用CUHK(SZ)邮箱' },
        { status: 400 }
      )
    }

    // 查找用户
    console.log('查找用户...')
    const user = await prisma.user.findUnique({
      where: { email }
    })

    console.log('用户查找结果:', { 
      found: !!user
    })

    // 验证用户存在和密码
    if (!user || user.password !== password) {
      console.log('用户验证失败')
      return NextResponse.json(
        { success: false, message: '邮箱或密码错误' },
        { status: 401 }
      )
    }

    console.log('用户验证成功，生成token...')
    // 生成 token
    const tokenData = {
      userId: user.id,
      email: user.email,
      name: user.name || undefined,
      university: 'CUHK(SZ)'
    }
    console.log('Token数据:', tokenData)
    
    const token = await new jose.SignJWT(tokenData)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(JWT_SECRET)
    
    console.log('Token生成成功')

    const responseData: LoginResponse = {
      success: true,
      message: '登录成功',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name || undefined
      }
    }

    const response = NextResponse.json(responseData)

    console.log('设置cookie...')
    // 设置 cookie 用于认证
    const encodedToken = encodeURIComponent(token)
    response.cookies.set({
      name: 'token',
      value: encodedToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 24 hours
    })
    console.log('Cookie设置完成')

    // 验证cookie是否设置成功
    const setCookie = response.headers.get('Set-Cookie')
    console.log('Set-Cookie header:', setCookie)

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: '登录失败，请重试' },
      { status: 500 }
    )
  }
}