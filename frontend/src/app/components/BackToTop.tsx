'use client'

import { useEffect, useState } from 'react'
import { MdOutlineKeyboardArrowUp } from 'react-icons/md'

export default function BackToTop() {
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const onScroll = () => {
			setVisible(window.scrollY > 200)
		}
		window.addEventListener('scroll', onScroll)
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	const handleClick = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	if (!visible) return null

	return (
		<button
			onClick={handleClick}
			className={`fixed right-3 bottom-3 z-50 flex cursor-pointer items-center justify-center rounded-full border-2 border-[#d5d5d5] bg-black p-2 text-[#d5d5d5] shadow-lg transition hover:border-[#214C92] hover:bg-[#0565FF]/15 hover:text-[#214C92] sm:right-8 sm:bottom-8 sm:h-14 sm:w-14`}
			aria-label="Voltar ao topo"
		>
			<MdOutlineKeyboardArrowUp size={28} />
		</button>
	)
}
