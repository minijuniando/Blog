import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
})

export const metadata: Metadata = {
	title: 'Juniando',
	description:
		'Compartilhamos dicas práticas, oportunidades reais e tudo o que você precisa pra conquistar sua primeira vaga e dar o pontapé na sua carreira com confiança.',
	icons: {
		icon: '/favicon.ico',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-br" className={inter.className}>
			<body className={'font-inter antialiased'}>{children}</body>
		</html>
	)
}
