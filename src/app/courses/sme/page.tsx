'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { Course } from '../../types/course'

const smeCourses: Course[] = [
  {
    id: 1,
    title: 'FIN 2010 - 公司金融',
    provider: 'SME',
    type: '金融系', 
    image: '/images/courses_images/fin2010.jpg',
    description: '公司金融基础理论与实践'
  },
  {
    id: 2,
    title: 'FIN 2020 - 投资学',
    provider: 'SME',
    type: '金融系',
    image: '/images/courses_images/fin2020.jpg',
    description: '投资理论与组合管理'
  },
  {
    id: 3,
    title: 'FIN 3080 - 固定收益证券',
    provider: 'SME',
    type: '金融系',
    image: '/images/courses_images/fin3080.jpg',
    description: '债券市场与固定收益证券分析'
  },
  {
    id: 4,
    title: 'FIN 4060 - 金融衍生品',
    provider: 'SME',
    type: '金融系',
    image: '/images/courses_images/fin4060.jpg',
    description: '期权、期货及其他衍生品'
  },
  {
    id: 5,
    title: 'ECO 2010 - 微观经济学',
    provider: 'SME',
    type: '经济系',
    image: '/images/courses_images/eco2010.jpg',
    description: '微观经济学原理与应用'
  },
  {
    id: 6,
    title: 'ECO 2011 - 宏观经济学',
    provider: 'SME',
    type: '经济系',
    image: '/images/courses_images/eco2011.jpg',
    description: '宏观经济学原理与政策'
  },
  {
    id: 7,
    title: 'ECO 2121 - 计量经济学',
    provider: 'SME',
    type: '经济系',
    image: '/images/courses_images/eco2121.jpg',
    description: '经济计量方法与应用'
  },
  {
    id: 8,
    title: 'ECO 3121 - 高级计量经济学',
    provider: 'SME',
    type: '经济系',
    image: '/images/courses_images/eco3121.jpg',
    description: '进阶计量经济学方法'
  },
  {
    id: 9,
    title: 'MIS 2051 - 管理信息系统',
    provider: 'SME',
    type: '管理系',
    image: '/images/courses_images/mis2051.jpg',
    description: '信息系统在管理中的应用'
  },
  {
    id: 10,
    title: 'MGT 2020 - 组织行为学',
    provider: 'SME',
    type: '管理系',
    image: '/images/courses_images/mgt2020.jpg',
    description: '组织中的个人与群体行为'
  }
];

export default function SMECoursesPage() {
  const router = useRouter();

  const handleCourseClick = (e: React.MouseEvent, courseId: number) => {
    e.preventDefault();
    router.push(`/course/${courseId}`);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">经济管理学院课程</h1>
            <p className="mt-2 text-sm text-gray-500">
              探索经济、金融、管理领域的优质课程
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {smeCourses.map((course) => (
              <div
                key={course.id}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white cursor-pointer"
                onClick={(e) => handleCourseClick(e, course.id)}
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
                  <h3 className="text-lg font-medium text-gray-900">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-500">{course.description}</p>
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