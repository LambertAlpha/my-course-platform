'use client'

import Image from 'next/image'
import Link from 'next/link'

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
                  <h1 className="text-8xl font-bold tracking-tight text-gray-900 drop-shadow-[0_5px_5px_rgba(139,92,246,0.5)]">
                    Welcome
                  </h1>
                  <h2 className="text-5xl font-semibold tracking-tight text-gray-800 pl-8 mt-2 drop-shadow-[0_4px_4px_rgba(139,92,246,0.4)]">
                    to Unicourse
                  </h2>
                  <p className="text-xl leading-8 text-gray-600 mt-12">
                    欢迎来到 Unicourse 在线课程平台
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
        </div>
      </main>
    </>
  )
}