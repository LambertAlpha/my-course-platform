import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, code: string) => {
  try {
    console.log('Starting email send process...')
    console.log('Target email:', email)
    console.log('Using API Key:', process.env.RESEND_API_KEY ? 'API key exists' : 'API key is missing')
    
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured')
    }
    
    const data = await resend.emails.send({
      from: 'Courses Platform <delivered@resend.dev>',
      to: email,
      subject: 'Verify your CUHK(SZ) Learning Platform account',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to CUHK(SZ) Learning Platform!</h2>
          <p>Your verification code is:</p>
          <div style="background-color: #f4f4f4; padding: 12px; font-size: 24px; font-weight: bold; text-align: center; letter-spacing: 4px; margin: 20px 0;">
            ${code}
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
        </div>
      `
    })
    
    console.log('Email sent successfully!')
    console.log('Resend API Response:', JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error('Failed to send email!')
    console.error('Detailed error in sendVerificationEmail:', error)
    if (error instanceof Error) {
      console.error('Error name:', error.name)
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    return false
  }
}