'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const validateEmail = (email: string) => {
    return email.endsWith('@link.cuhk.edu.cn')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('开始登录流程...')
    setError('')

    // 验证邮箱域名
    if (!validateEmail(email)) {
      console.log('邮箱格式验证失败')
      setError('Please use your CUHK(SZ) email (@link.cuhk.edu.cn)')
      return
    }

    try {
      // 先确保清除旧的认证信息
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      
      console.log('发送登录请求...', { email })  // 不打印密码
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'  // 确保接收和发送 cookies
      })

      console.log('收到响应状态:', response.status)
      const data = await response.json()
      console.log('响应数据:', {
        success: data.success,
        message: data.message,
        hasToken: !!data.token
      })

      if (!response.ok) {
        console.error('HTTP错误:', response.status, response.statusText)
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      if (data.success && data.token) {
        console.log('登录成功，保存认证信息...')
        
        // 存储 token
        localStorage.setItem('token', data.token)
        
        try {
          console.log('解析token...')
          // 解码 token 获取用户信息
          const [header, payload, signature] = data.token.split('.')
          console.log('Token 结构完整性:', {
            hasHeader: !!header,
            hasPayload: !!payload,
            hasSignature: !!signature
          })
          
          const decodedPayload = JSON.parse(atob(payload))
          console.log('解码后的用户信息:', {
            userId: decodedPayload.userId,
            email: decodedPayload.email,
            name: decodedPayload.name
          })
          
          const userInfo = {
            id: decodedPayload.userId,
            email: decodedPayload.email,
            name: decodedPayload.name
          }
          
          localStorage.setItem('user', JSON.stringify(userInfo))
          console.log('用户信息已保存到 localStorage')
          
          // 验证数据是否正确保存
          const savedToken = localStorage.getItem('token')
          const savedUser = localStorage.getItem('user')
          console.log('验证保存的数据:', {
            tokenSaved: !!savedToken,
            userSaved: !!savedUser
          })
          
          console.log('准备跳转到课程页面...')
          // 直接跳转，不再检查cookie
          window.location.href = '/courses'
          
        } catch (parseError) {
          console.error('Token解析失败:', parseError)
          setError('登录过程出错，请重试')
        }
      } else {
        console.log('登录失败:', data.message)
        setError(data.message || '登录失败，请重试')
      }
    } catch (err) {
      console.error('登录过程出错:', err)
      if (err instanceof Error) {
        console.error('错误详情:', {
          name: err.name,
          message: err.message,
          stack: err.stack
        })
      }
      setError('登录失败，请重试')
    }
  }

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">CUHK(SZ) Learning Platform</span>
              <img
                alt="CUHK(SZ) logo"
                src="/images/cuhksz-logo.png"
                className="h-8 w-auto"
              />
            </a>
          </div>
        </nav>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Welcome to CUHK(SZ) Learning Platform
            </h1>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              {error && (
                <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-500">
                  {error}
                </div>
              )}
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    CUHK(SZ) Email
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@link.cuhk.edu.cn"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in with CUHK(SZ) Email
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                New student?{' '}
                <Link 
                  href="/register"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Register with your CUHK(SZ) email
                </Link>
              </p>
            </div>
          </div>
        </div>
        
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  )
}
