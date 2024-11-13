import './globals.css'
import LoginPage from './login/page'
import Navbar from './_components/Navbar'

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js'
}

export default function RootLayout({ children }) {
  return (
    <html lang='es'>
      <body>
        <Navbar />
        <div className='mt-0'>
          <LoginPage />
          {children}
        </div>
      </body>
    </html>
  )
}
