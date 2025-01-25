import Dm20151123, * as $Dm20151123 from '@alicloud/dm20151123'
import * as $OpenApi from '@alicloud/openapi-client'

const client = new Dm20151123({
  accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
  accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET,
  endpoint: 'dm.aliyuncs.com',
})

// 生成6位随机验证码
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// 发送验证码邮件
export const sendVerificationEmail = async (email: string, code: string) => {
  try {
    console.log('Starting email send process...')
    console.log('Target email:', email)
    
    if (!process.env.ALIYUN_ACCESS_KEY_ID || !process.env.ALIYUN_ACCESS_KEY_SECRET) {
      throw new Error('Aliyun credentials are not configured')
    }

    const sendSingleMailRequest = new $Dm20151123.SingleSendMailRequest({
      accountName: process.env.EMAIL_FROM,
      addressType: 1,
      replyToAddress: false,
      toAddress: email,
      subject: 'CUHK(SZ) 学习平台 - 邮箱验证码',
      htmlBody: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">CUHK(SZ) 学习平台</h2>
          <p>您好！</p>
          <p>您的验证码是：</p>
          <div style="background-color: #F3F4F6; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
            ${code}
          </div>
          <p>验证码有效期为10分钟，请尽快完成验证。</p>
          <p>如果这不是您的操作，请忽略此邮件。</p>
          <p style="color: #6B7280; font-size: 12px; margin-top: 30px;">
            此邮件由系统自动发送，请勿回复。
          </p>
        </div>
      `,
    })

    const result = await client.singleSendMail(sendSingleMailRequest)
    
    console.log('Email sent successfully!')
    console.log('Aliyun DirectMail Response:', JSON.stringify(result, null, 2))
    return true
  } catch (error) {
    console.error('Failed to send email!')
    console.error('Detailed error in sendVerificationEmail:', error)
    if (error instanceof Error) {
      console.error('Error name:', error.name)
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    throw error
  }
}