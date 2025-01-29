'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Course } from '../../types/course'

// 数据学院课程数据
const sdsCourses: Course[] = [
  {
    id: 16,
    title: 'STA2001 - 概率论',
    provider: 'SDS',
    type: '统计系',
    image: '/images/courses_images/sta2001.jpg',
    description: '概率论基础理论'
  },
  {
    id: 17,
    title: 'STA2002 - 数理统计',
    provider: 'SDS',
    type: '统计系',
    image: '/images/courses_images/sta2002.jpg',
    description: '统计学基础理论与方法'
  },
  {
    id: 18,
    title: 'STA2002H - 数理统计（荣誉）',
    provider: 'SDS',
    type: '统计系',
    image: '/images/courses_images/sta2002h.jpg',
    description: '统计学进阶理论与方法'
  },
  {
    id: 19,
    title: 'STA4001 - 随机过程',
    provider: 'SDS',
    type: '统计系',
    image: '/images/courses_images/sta4001.jpg',
    description: '随机过程理论与应用'
  },
  {
    id: 20,
    title: 'CSC3001 - 机器学习',
    provider: 'SDS',
    type: '计算机系',
    image: '/images/courses_images/csc3001.jpg',
    description: '机器学习基础理论与应用'
  },
  {
    id: 21,
    title: 'DDA2001 - 数据分析导论',
    provider: 'SDS',
    type: '数据科学系',
    image: '/images/courses_images/dda2001.jpg',
    description: '数据分析基础方法与实践'
  }
];

export default function SDSCoursesPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            数据学院课程
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            探索数据科学与统计的前沿课程
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sdsCourses.map((course) => (
            <Link
              key={course.id}
              href={`/course/${course.id}`}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
              <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none sm:h-48">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                />
              </div>
              <div className="flex flex-1 flex-col space-y-2 p-4">
                <h3 className="text-sm font-medium text-gray-900">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {course.description}
                </p>
                <div className="flex items-center space-x-2">
                  <Image
                    src="/images/sds-logo.jpg"
                    alt={course.provider} 
                    width={20}
                    height={20}
                    className="h-5 w-5 rounded-full"
                  />
                  <span className="text-xs text-gray-500">{course.type}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 