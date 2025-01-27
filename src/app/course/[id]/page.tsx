'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import PricingModal from '../../components/PricingModal'
import Image from 'next/image'

interface Section {
  id: number;
  title: string;
  duration: string;
  type: 'video';
  status: 'locked' | 'available' | 'completed';
}

interface CourseDetail {
  id: number;
  title: string;
  image: string;
  instructor: string;
  description: string;
  sections: Section[];
}

// 生成考试视频部分
function generateExamSections(startYear: number = 22): Section[] {
  const currentYear = 24;
  const sections: Section[] = [];
  let id = 1;

  for (let year = currentYear; year >= startYear; year--) {
    // Spring Final
    sections.push({
      id: id++,
      title: `${year}Spring Final`,
      duration: '120分钟',
      type: 'video',
      status: year === currentYear ? 'available' : 'locked'
    });

    // Spring Mid
    sections.push({
      id: id++,
      title: `${year}Spring Mid`,
      duration: '120分钟',
      type: 'video',
      status: year === currentYear ? 'available' : 'locked'
    });

    // Fall Final
    sections.push({
      id: id++,
      title: `${year}Fall Final`,
      duration: '120分钟',
      type: 'video',
      status: year === currentYear ? 'available' : 'locked'
    });

    // Fall Mid
    sections.push({
      id: id++,
      title: `${year}Fall Mid`,
      duration: '120分钟',
      type: 'video',
      status: year === currentYear ? 'available' : 'locked'
    });
  }

  return sections;
}

const courseDetails: Record<string, CourseDetail> = {
  // 金融系课程
  '1': {
    id: 1,
    title: 'FIN 2010 - 公司金融',
    image: '/images/courses_images/fin2010.jpg',
    instructor: 'Prof. Wang',
    description: '本课程将带你深入了解公司金融的核心概念和理论，从资本结构到企业价值评估。',
    sections: generateExamSections()
  },
  '2': {
    id: 2,
    title: 'FIN 2020 - 投资学',
    image: '/images/courses_images/fin2020.jpg',
    instructor: 'Prof. Li',
    description: '本课程将介绍投资理论与实践，包括证券分析、投资组合管理等内容。',
    sections: generateExamSections()
  },
  '3': {
    id: 3,
    title: 'FIN 3080 - 固定收益证券',
    image: '/images/courses_images/fin3080.jpg',
    instructor: 'Prof. Chen',
    description: '本课程将系统介绍固定收益证券的定价理论和交易策略，包括债券估值、久期管理等内容。',
    sections: generateExamSections()
  },
  '4': {
    id: 4,
    title: 'FIN 4060 - 金融衍生品',
    image: '/images/courses_images/fin4060.jpg',
    instructor: 'Prof. Liu',
    description: '本课程将深入探讨金融衍生品的定价和应用，包括期权、期货、互换等工具的分析。',
    sections: generateExamSections()
  },

  // 经济系课程
  '5': {
    id: 5,
    title: 'ECO 2010 - 微观经济学',
    image: '/images/courses_images/eco2010.jpg',
    instructor: 'Prof. Zhang',
    description: '本课程介绍微观经济学的基本原理，包括供需理论、消费者行为、生产理论等内容。',
    sections: generateExamSections()
  },
  '6': {
    id: 6,
    title: 'ECO 2011 - 宏观经济学',
    image: '/images/courses_images/eco2011.jpg',
    instructor: 'Prof. Wu',
    description: '本课程探讨宏观经济运行规律，包括国民收入、通货膨胀、失业、经济增长等主题。',
    sections: generateExamSections()
  },
  '7': {
    id: 7,
    title: 'ECO 2121 - 计量经济学',
    image: '/images/courses_images/eco2121.jpg',
    instructor: 'Prof. Yang',
    description: '本课程介绍计量经济学的基础理论和方法，包括回归分析、时间序列等统计工具。',
    sections: generateExamSections()
  },
  '8': {
    id: 8,
    title: 'ECO 3121 - 高级计量经济学',
    image: '/images/courses_images/eco3121.jpg',
    instructor: 'Prof. Zhao',
    description: '本课程深入研究高级计量经济学方法，包括面板数据、工具变量等进阶内容。',
    sections: generateExamSections()
  },

  // 管理系课程
  '9': {
    id: 9,
    title: 'MIS 2051 - 管理信息系统',
    image: '/images/courses_images/mis2051.jpg',
    instructor: 'Prof. Sun',
    description: '本课程探讨信息系统在现代企业管理中的应用，包括数据管理、决策支持等内容。',
    sections: generateExamSections()
  },
  '10': {
    id: 10,
    title: 'MGT 2020 - 组织行为学',
    image: '/images/courses_images/mgt2020.jpg',
    instructor: 'Prof. Lin',
    description: '本课程研究组织中的个人和群体行为，包括激励理论、领导力、团队管理等主题。',
    sections: generateExamSections()
  },

  // 统计系课程
  '16': {
    id: 16,
    title: 'STA2001 - 概率论',
    image: '/images/courses_images/sta2001.jpg',
    instructor: 'Prof. Huang',
    description: '本课程系统介绍概率论基础理论，包括随机变量、概率分布、大数定律等内容。',
    sections: generateExamSections()
  },
  '17': {
    id: 17,
    title: 'STA2002 - 数理统计',
    image: '/images/courses_images/sta2002.jpg',
    instructor: 'Prof. Gao',
    description: '本课程讲授统计推断的基本方法，包括参数估计、假设检验、方差分析等内容。',
    sections: generateExamSections()
  },
  '18': {
    id: 18,
    title: 'STA2002H - 数理统计（荣誉）',
    image: '/images/courses_images/sta2002h.jpg',
    instructor: 'Prof. Xu',
    description: '本课程深入探讨高级统计理论，为学生提供更具挑战性的统计学学习内容。',
    sections: generateExamSections()
  },
  '19': {
    id: 19,
    title: 'STA4001 - 随机过程',
    image: '/images/courses_images/sta4001.jpg',
    instructor: 'Prof. Feng',
    description: '本课程介绍随机过程的基本理论，包括马尔可夫链、泊松过程等重要模型。',
    sections: generateExamSections()
  },

  // 计算机系课程
  '20': {
    id: 20,
    title: 'CSC3001 - 机器学习',
    image: '/images/courses_images/csc3001.jpg',
    instructor: 'Prof. Zhu',
    description: '本课程将带你深入了解机器学习的核心概念和技术，从基础算法到高级应用。',
    sections: generateExamSections()
  },
  '21': {
    id: 21,
    title: 'DDA2001 - 数据分析导论',
    image: '/images/courses_images/dda2001.jpg',
    instructor: 'Prof. Qian',
    description: '本课程介绍数据分析的基本方法和工具，包括数据预处理、可视化、统计分析等内容。',
    sections: generateExamSections()
  },

  // 数学系课程
  '31': {
    id: 31,
    title: 'MAT1002 - 线性代数',
    image: '/images/courses_images/mat1002.jpg',
    instructor: 'Prof. Ding',
    description: '本课程系统讲授线性代数的基础理论，包括向量空间、线性变换、特征值等内容。',
    sections: generateExamSections()
  },
  '32': {
    id: 32,
    title: 'MAT1002B - 线性代数（荣誉）',
    image: '/images/courses_images/mat1002b.jpg',
    instructor: 'Prof. He',
    description: '本课程提供更深入的线性代数理论学习，包括高级抽象代数概念和应用。',
    sections: generateExamSections()
  },
  '33': {
    id: 33,
    title: 'MAT2041 - 数学分析I',
    image: '/images/courses_images/mat2041.jpg',
    instructor: 'Prof. Tang',
    description: '本课程介绍数学分析的基础概念，包括极限、连续、微分等重要内容。',
    sections: generateExamSections()
  },
  '34': {
    id: 34,
    title: 'MAT2040 - 数学分析II',
    image: '/images/courses_images/mat2040.jpg',
    instructor: 'Prof. Xie',
    description: '本课程深入探讨高等数学分析，包括多元函数、重积分、级数等进阶内容。',
    sections: generateExamSections()
  },
  '35': {
    id: 35,
    title: 'MAT3007 - 数值分析',
    image: '/images/courses_images/mat3007.jpg',
    instructor: 'Prof. Peng',
    description: '本课程讲授数值计算的基本方法，包括插值、数值积分、方程求解等实用技术。',
    sections: generateExamSections()
  }
};

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id as string;
  const course = courseDetails[courseId];
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">课程不存在</p>
      </div>
    );
  }

  const handleSectionClick = (sectionId: number) => {
    if (course.sections[sectionId - 1].status === 'locked') {
      setIsPricingOpen(true);
      return;
    }
    setSelectedSection(sectionId);
  };

  const getStatusIcon = (status: Section['status']) => {
    switch (status) {
      case 'locked':
        return (
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        );
      case 'completed':
        return (
          <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      default:
        return (
          <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          {/* 课程标题和描述 */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
            <p className="mt-2 text-gray-600">{course.description}</p>
            <p className="mt-2 text-sm text-gray-500">授课教师：{course.instructor}</p>
          </div>

          {/* 课程内容列表 */}
          <div className="divide-y divide-gray-200">
            {course.sections.map((section) => (
              <div
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className={`px-6 py-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer ${
                  section.status === 'locked' ? 'opacity-50' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{section.title}</h3>
                    <p className="text-sm text-gray-500">{section.duration}</p>
                  </div>
                </div>
                {getStatusIcon(section.status)}
              </div>
            ))}
          </div>
        </div>

        {/* 视频播放区域 */}
        {selectedSection && (
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {course.sections[selectedSection - 1].title}
            </h2>
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg">
              <div className="flex items-center justify-center">
                <p className="text-gray-500">视频加载中...</p>
              </div>
            </div>
          </div>
        )}

        {/* 付款弹窗 */}
        <PricingModal 
          isOpen={isPricingOpen} 
          onClose={() => setIsPricingOpen(false)}
          courseId={Number(courseId)}
        />
      </div>
    </div>
  );
}