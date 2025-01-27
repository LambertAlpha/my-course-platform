'use client'

import Image from 'next/image'
import Link from 'next/link'
import Navigation from '../components/Navigation'

const schools = [
  {
    id: 1,
    name: '经管学院',
    description: '探索金融、经济与管理课程',
    image: '/images/sme-banner.jpg',
    link: '/courses/sme'
  },
  {
    id: 2,
    name: '数据科学学院',
    description: '发现统计与数据分析课程',
    image: '/images/sds-banner.jpg',
    link: '/courses/sds'
  },
  {
    id: 3,
    name: '理工学院',
    description: '学习数学与计算机科学课程',
    image: '/images/sse-banner.jpg',
    link: '/courses/sse'
  }
]

export default function CoursesPage() {
  return (
    <>
      <Navigation />
      <main className="bg-white">
        {/* 欢迎横幅 */}
        <div className="relative isolate overflow-hidden">
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
          <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
            <div className="px-6 lg:px-0 lg:pt-4">
              <div className="mx-auto max-w-2xl">
                <div className="max-w-lg">
                  <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    欢迎来到Unicourse在线课程平台
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    你的考试复习助手
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 学院卡片 */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {schools.map((school) => (
              <Link 
                key={school.id}
                href={school.link}
                className="relative group block w-full overflow-hidden rounded-lg bg-white shadow-lg transition transform hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-h-9 aspect-w-16 bg-gray-200">
                  <Image
                    src={school.image}
                    alt={school.name}
                    width={600}
                    height={400}
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/images/placeholder.jpg'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold">{school.name}</h3>
                  <p className="mt-2 text-sm text-gray-200">
                    {school.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* 平台特点 */}
          <div className="mt-24">
            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              平台特色
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto h-12 w-12 text-indigo-600">
                  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900">优质课程资源</h3>
                <p className="mt-2 text-gray-600">精选各学院热门课程，提供全面的学习体系</p>
              </div>
              <div className="text-center">
                <div className="mx-auto h-12 w-12 text-indigo-600">
                  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900">灵活学习方式</h3>
                <p className="mt-2 text-gray-600">在线随时学习，进度自由掌控</p>
              </div>
              <div className="text-center">
                <div className="mx-auto h-12 w-12 text-indigo-600">
                  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900">专业教学团队</h3>
                <p className="mt-2 text-gray-600">高绩选手录制课程，助力高效备考</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
    </>
  )
}