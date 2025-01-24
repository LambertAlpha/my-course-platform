import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
)

export async function middleware(request: NextRequest) {
  console.log('中间件处理请求:', request.nextUrl.pathname)
  
  // 获取并解码 token
  const encodedToken = request.cookies.get('token')?.value
  console.log('从cookie中获取到encodedToken:', !!encodedToken)

  if (request.nextUrl.pathname.startsWith('/courses')) {
    console.log('访问课程页面，检查认证...')
    
    if (!encodedToken) {
      console.log('未找到token，重定向到主页')
      return NextResponse.redirect(new URL('/', request.url))
    }

    try {
      // 解码并验证 token
      console.log('开始解码token...')
      const token = decodeURIComponent(encodedToken)
      console.log('token解码成功，开始验证...')
      
      const { payload } = await jose.jwtVerify(token, JWT_SECRET)
      const decoded = payload as {
        userId: string;
        email: string;
        name?: string;
        university: string;
      }
      
      console.log('token验证成功，用户信息:', {
        userId: decoded.userId,
        email: decoded.email,
        name: decoded.name,
        university: decoded.university
      })
      
      // 验证是否是 CUHK(SZ) 邮箱
      if (!decoded.email?.endsWith('@link.cuhk.edu.cn')) {
        console.log('非CUHK(SZ)邮箱，重定向到主页')
        return NextResponse.redirect(new URL('/', request.url))
      }
      
      // 添加用户信息到请求头
      const response = NextResponse.next()
      response.headers.set('X-User-Email', decoded.email)
      response.headers.set('X-User-Id', decoded.userId)
      if (decoded.name) {
        response.headers.set('X-User-Name', decoded.name)
      }
      
      console.log('认证通过，允许访问课程页面')
      return response
    } catch (error) {
      console.error('token验证失败:', error)
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/courses/:path*'
} 