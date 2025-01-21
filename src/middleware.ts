import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 由于我们现在不需要验证逻辑，所以直接返回 next()
  return NextResponse.next()
}

// 配置哪些路径需要经过 middleware 处理
export const config = {
  matcher: '/courses/:path*'
} 