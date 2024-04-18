import type { Metadata } from 'next'
import './reset.css'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
