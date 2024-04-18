import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './_assets/reset.css'
import './_assets/globals.css'

const montserrat = Montserrat({
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Weather',
  description: 'Weather app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}
