import './globals.css'
import LoginPage from './login/page'
export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body>
        <LoginPage />
        {children}
      </body>
    </html>
  )
}
