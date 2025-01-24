'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const courses = [
  {
    id: 1,
    title: 'AI Python for Beginners',
    provider: 'DeepLearning.AI',
    providerLogo: '/images/deeplearning-ai-logo.jpg',
    type: 'Course',
    image: '/images/deeplearning-ai-logo.jpg'
  },
  {
    id: 2,
    title: 'Google Prompting Essentials',
    provider: 'Google',
    providerLogo: '/images/google-logo.jpg',
    type: 'Course',
    image: '/images/google-logo.jpg'
  },
  {
    id: 3,
    title: 'Microsoft Excel',
    provider: 'Microsoft',
    providerLogo: '/images/microsoft-logo.jpg',
    type: 'Professional Certificate',
    image: '/images/microsoft-logo.jpg'
  }
]

export default function CoursesPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('检查认证状态...')
        // 从 localStorage 获取用户信息
        const userStr = localStorage.getItem('user')
        console.log('从localStorage获取到的用户信息:', userStr)
        
        if (!userStr) {
          console.log('未找到用户信息，重定向到主页')
          window.location.href = '/'
          return
        }

        try {
          const userData = JSON.parse(userStr)
          console.log('解析到的用户信息:', userData)
          
          // 验证用户邮箱
          if (!userData.email?.endsWith('@link.cuhk.edu.cn')) {
            console.log('无效的用户邮箱')
            window.location.href = '/'
            return
          }
          
          setUser(userData)
          setLoading(false)
        } catch (parseError) {
          console.error('解析用户信息失败:', parseError)
          window.location.href = '/'
        }
      } catch (error) {
        console.error('认证检查失败:', error)
        window.location.href = '/'
      }
    }

    checkAuth()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">欢迎回来, {user.name || user.email}</h1>
            <p className="mt-2 text-sm text-gray-500">
              探索我们最新的课程内容，开始您的学习之旅。
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
              >
                <div className="aspect-h-3 aspect-w-4 bg-gray-200 sm:aspect-none sm:h-48">
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={400}
                    height={300}
                    className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                  />
                </div>
                <div className="flex flex-1 flex-col space-y-4 p-4">
                  <div className="flex items-center space-x-2">
                    <Image
                      src={course.providerLogo}
                      alt={course.provider}
                      width={24}
                      height={24}
                      className="h-6 w-6"
                    />
                    <span className="text-sm text-gray-600">{course.provider}</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">
                    <a href={`/course/${course.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {course.title}
                    </a>
                  </h3>
                  <div className="mt-auto">
                    <div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
                      {course.type}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 