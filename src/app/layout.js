import './globals.css'
import { Lato } from 'next/font/google'

const lato = Lato({
  weight: ['400'],
  subsets: ['latin']
})

export const metadata = {
  title: 'Geri',
  description: 'Gerenciamento de pedidos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lato.className}>{children}</body>
    </html>
  )
}
