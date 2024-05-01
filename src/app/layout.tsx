import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { getThemingScript } from 'features/theming'
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
    <html lang='en' suppressHydrationWarning>
      <head></head>
      <body className={montserrat.className}>
        {children}
        <script dangerouslySetInnerHTML={{ __html: getThemingScript() }} />
      </body>
    </html>
  )
}
