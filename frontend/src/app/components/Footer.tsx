import { MdFavorite } from 'react-icons/md'
import Image from 'next/image'
import React from 'react'

export default function Footer() {
	return (
		<footer className="relative flex w-full items-center justify-center overflow-hidden bg-black py-14">
			<Image
				src="/detail-footer.svg"
				alt="Detalhe decorativo"
				width={190}
				height={167}
				className="pointer-events-none absolute left-[-20px] z-10 h-[110px] w-[127px] rotate-[12.04deg] select-none md:h-[167px] md:w-[190px]"
				priority
			/>
			<div className="relative z-10 flex flex-col items-center">
				<Image
					src="/logo-white.svg"
					alt="Logo Juniando"
					width={45}
					height={37}
					className="mb-[27px]"
				/>
				<div className="mb-2 flex gap-1">
					<span className="text-sm text-white">Feito com</span>
					<MdFavorite className="mt-1 h-4 w-4 text-[#0565FF]" />
					<span className="text-sm text-white">por Juniando</span>
				</div>
				<span className="text-xs text-[#6B6B6B]">
					Copyright © 2025 - Juniando
				</span>
			</div>
		</footer>
	)
}
