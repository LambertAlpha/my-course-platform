'use client'

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
  },
  // 可以添加更多课程...
]

export default function CoursesPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">New Courses</h1>
            <p className="mt-2 text-sm text-gray-500">
              Explore our latest course offerings focused on in-demand skills.
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