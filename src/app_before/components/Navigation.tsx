'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Navigation() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/courses" className="-m-1.5 p-1.5 flex items-center">
            <span className="sr-only">Unicourse</span>
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <span className="ml-2 text-lg font-semibold text-gray-900">Unicourse</span>
          </Link>
        </div>

        {/* 搜索框 */}
        <div className="flex-1 max-w-lg px-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索课程（如：MAT1001）..."
              className="w-full h-10 pl-4 pr-10 text-sm bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-indigo-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>

        {/* 导航链接 */}
        <div className="hidden lg:flex lg:gap-x-8">
          <Link href="/courses/sme" className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600">
            SME
          </Link>
          <Link href="/courses/sds" className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600">
            SDS
          </Link>
          <Link href="/courses/sse" className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600">
            SSE
          </Link>
        </div>

        {/* 个人中心 */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link href="/profile" className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600">
            个人中心
          </Link>
        </div>

        {/* 移动端菜单按钮 */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">打开菜单</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
} 