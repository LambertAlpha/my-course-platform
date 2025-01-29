'use client'

import { usePathname } from 'next/navigation'
import Navigation from './Navigation'

export default function NavigationWrapper() {
  const pathname = usePathname()
  
  // 不需要显示导航栏的路径列表
  const noNavPaths = ['/', '/register']
  
  // 检查是否需要显示导航栏
  if (noNavPaths.includes(pathname)) {
    return null
  }

  return <Navigation />
} 