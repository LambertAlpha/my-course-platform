'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Course } from '../../types/course'

const smeCourses: Course[] = [
  {
    id: 1,
    title: 'FIN2010',
    provider: 'SME',
    image: '/images/courses_images/fin2010.jpg'
  },
  {
    id: 2,
    title: 'FIN2020',
    provider: 'SME',
    image: '/images/courses_images/fin2020.jpg'
  },
  {
    id: 3,
    title: 'FIN3080',
    provider: 'SME',
    image: '/images/courses_images/fin3080.jpg'
  },
  {
    id: 4,
    title: 'FIN4060',
    provider: 'SME',
    image: '/images/courses_images/fin4060.jpg'
  },
  {
    id: 5,
    title: 'ECO2010',
    provider: 'SME',
    image: '/images/courses_images/eco2010.jpg'
  },
  {
    id: 6,
    title: 'ECO2011',
    provider: 'SME',
    image: '/images/courses_images/eco2011.jpg'
  },
  {
    id: 7,
    title: 'ECO2121',
    provider: 'SME',
    image: '/images/courses_images/eco2121.jpg'
  },
  {
    id: 8,
    title: 'ECO3121',
    provider: 'SME',
    image: '/images/courses_images/eco3121.jpg'
  },
  {
    id: 9,
    title: 'MIS2051',
    provider: 'SME',
    image: '/images/courses_images/mis2051.jpg'
  },
  {
    id: 10,
    title: 'MGT2020',
    provider: 'SME',
    image: '/images/courses_images/mgt2020.jpg'
  }
];

export default function SMECoursesPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            经济管理学院课程</h1>
          <p className="mt-2 text-sm text-gray-500">
            探索经济、金融、管理领域的优质课程
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {smeCourses.map((course) => (
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
                <h3 className="text-base font-medium text-gray-900">
                  {course.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 