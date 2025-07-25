import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export default function Header() {
	return (
		<header className="w-full max-w-5xl h-fit rounded-full border-2 border-[#CDCDCD] bg-white">
			<div className="flex items-center justify-between px-5 py-4 md:px-8 md:py-4">
				<Link
					href="/"
					className="text-2xl font-bold text-gray-900 dark:text-white"
				>
					<Image
						src="/logo.svg"
						alt="Logo"
						width={174}
						height={40}
						className="h-5 w-20 md:h-10 md:w-44 "
					/>
				</Link>
				<button className="rounded-full border-2 border-[#CDCDCD] bg-[#0565FF] px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-700 md:px-10 md:py-4 md:text-base">
					Login
				</button>
			</div>
		</header>
	)
}
