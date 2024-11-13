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
        <LoginPage />
        {children}
      </body>
    </html>
  )
}
