import React from 'react'

const assuntos = [
	{ nome: 'React', quantidade: 12 },
	{ nome: 'Next.js', quantidade: 8 },
	{ nome: 'Tailwind', quantidade: 5 },
	{ nome: 'Carreira', quantidade: 3 },
]

export default function Aside() {
	return (
		<aside className="hidden w-[30%] h-fit mt-[90px] flex-col rounded-[30px] border-2 border-[#CDCDCD] bg-white px-9 py-14 lg:flex">
			<div className="flex w-full flex-col items-start gap-8">
				<span className="text-xl font-medium text-black">
					Assuntos relevantes
				</span>
				<ul className="flex w-full flex-col gap-4">
					{assuntos.map((assunto) => (
						<li
							key={assunto.nome}
							className="flex w-full items-center justify-between"
						>
							<span className="text-base text-black">{assunto.nome}</span>
							<span className="min-h-9 min-w-9 text-center rounded bg-[#0565FF]/15 px-2 py-2 text-base font-medium text-[#0565FF]">
								{assunto.quantidade}
							</span>
						</li>
					))}
				</ul>
			</div>
		</aside>
	)
}
