export interface User {
  id: string
  email: string
  name?: string
  password: string
  createdAt: Date
  updatedAt: Date
}

export interface LoginResponse {
  success: boolean
  message: string
  token?: string
  user?: {
    id: string
    email: string
    name?: string
  }
}

// Prisma 类型扩展
declare global {
  namespace PrismaJson {
    type PurchasedCourses = Array<{
      id: string
      userId: string
      courseId: string
      purchasedAt: Date
    }>
    type TokenBalance = {
      balance: number
    }
  }
} 