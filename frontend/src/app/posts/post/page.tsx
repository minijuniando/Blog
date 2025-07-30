'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
	MdOutlineModeEdit,
	MdOutlineRemoveRedEye,
	MdOutlineAccessTime,
	MdOutlineArrowBack,
	MdOutlineThumbUp,
	MdOutlineThumbDown,
} from 'react-icons/md'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import BackToTop from '@/app/components/BackToTop'

export default function PostViewPage() {
	const router = useRouter()

	return (
		<div className="flex h-full w-full flex-col">
			<div className="flex flex-col items-center px-8 pt-8 pb-20 sm:pt-6">
				<Header />

				<div className="mt-10 mb-10 flex w-full max-w-5xl items-center justify-between px-0 md:px-8">
					<button
						onClick={() => router.back()}
						className="flex cursor-pointer items-center gap-1.5 text-sm font-medium text-black hover:text-[#0565FF] md:text-base"
					>
						<MdOutlineArrowBack size={22} />
						<span>Voltar</span>
					</button>
				</div>
				<main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-3.5 px-0 pb-16 md:gap-8 md:px-8">
					<div className="flex w-full flex-col items-start justify-between gap-3 md:flex-row md:items-center md:gap-0">
						<div className="flex items-center gap-3">
							<Image
								src="/profile.jpg"
								alt="Foto do autor"
								width={40}
								height={40}
								className="h-8 w-8 rounded-full border-2 border-[#cdcdcd] object-cover md:h-14 md:w-14"
							/>
							<span className="font-medium text-gray-800 md:text-xl">
								Jane Doe
							</span>
						</div>

						<div className="flex items-center gap-6 md:gap-7">
							<div className="flex items-center gap-1.5 text-sm font-medium text-[#6b6b6b]">
								<MdOutlineModeEdit width={24} />
								<span>há 2 horas</span>
							</div>
							<div className="flex items-center gap-1.5 text-sm font-medium text-[#6b6b6b]">
								<MdOutlineRemoveRedEye width={24} />
								<span>1.807</span>
							</div>
							<div className="flex items-center gap-1.5 text-sm font-medium text-[#6b6b6b]">
								<MdOutlineAccessTime width={24} />
								<span>3 min</span>
							</div>
						</div>
					</div>

					<Image
						src="/post-banner.jpg"
						alt="Banner do post"
						width={1200}
						height={500}
						className="mb-8 max-h-[200px] w-full rounded-[20px] border-[2px] border-[#cdcdcd] object-cover md:mb-9 md:max-h-[392px]"
					/>

					<h1 className="mb-6 w-full text-2xl font-bold text-black md:text-3xl">
						Mussum Ipsum, cacilds vidis litro abertis?
					</h1>

					<div>
						<p className="mb-8">
							Mussum Ipsum, cacilds vidis litro abertis. Tá deprimidis, eu
							conheço uma cachacis que pode alegrar sua vidis. Em pé sem cair,
							deitado sem dormir, sentado sem cochilar e fazendo pose.
							Segunda-feiris nun dá, eu vô me pirulitá! Detraxit consequat et
							quo num tendi nada. Casamentiss faiz malandris se pirulitá. Atirei
							o pau no gatis, per gatis num morreus. Bota 1 metro de cachacis aí
							pra viagem! Admodum accumsan disputationi eu sit. Vide electram
							sadipscing et per. Suco de cevadiss deixa as pessoas mais
							interessantis. Pra lá, depois divoltis porris, paradis. Bota 1
							metro de cachacis aí pra viagem! In elementis mé pra quem é
							amistosis quis leo.
						</p>
						<p className="mb-8">
							Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis.
							Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo
							pose. Não sou faixa preta cumpadi, sou preto inteiris, inteiris.
							Detraxit consequat et quo num tendi nada. A ordem dos tratores não
							altera o pão duris. In elementis mé pra quem é amistosis quis leo.
							Atirei o pau no gatis, per gatis num morreus. Bota 1 metro de
							cachacis aí pra viagem! Admodum accumsan disputationi eu sit. Vide
							electram sadipscing et per. Suco de cevadiss deixa as pessoas mais
							interessantis. Pra lá, depois divoltis porris, paradis. Bota 1
							metro de cachacis aí pra viagem! In elementis mé pra quem é
							amistosis quis leo.
						</p>
						<h3 className="mb-6 text-xl font-bold">
							Mussum Ipsum, cacilds vidis litro abertis
						</h3>

						<p className="mb-8">
							Interagi no mé, cursus quis, vehicula ac nisi. Detraxit consequat
							et quo num tendi nada. Todo mundo vê os porris que eu tomo, mas
							ninguém vê os tombis que eu levo! Leite de capivaris, leite de
							mula manquis sem cabeça. Segunda-feiris nun dá, eu vô me pirulitá!
							Detraxit consequat et quo num tendi nada. Casamentiss faiz
							malandris se pirulitá. Atirei o pau no gatis, per gatis num
							morreus. Bota 1 metro de cachacis aí pra viagem! Admodum accumsan
							disputationi eu sit. Vide electram sadipscing et per. Suco de
							cevadiss deixa as pessoas mais interessantis. Pra lá, depois
							divoltis porris, paradis. Bota 1 metro de cachacis aí pra viagem!
							In elementis mé pra quem é amistosis quis leo.
						</p>
						<p className="mb-8">
							In elementis mé pra quem é amistosis quis leo. Admodum accumsan
							disputationi eu sit. Vide electram sadipscing et per. Copo furadis
							é disculpa de bebadis, arcu quam euismod magna. Quem manda na
							minha terra sou euzis! Detraxit consequat et quo num tendi nada.
							Posuere libero varius. Nullam a nisl ut ante blandit hendrerit.
							Aenean sit amet nisi. Tá deprimidis, eu conheço uma cachacis que
							pode alegrar sua vidis. Eu nunca mais boto a boca num copo de
							cachaça, agora eu só uso canudis!
						</p>
						<blockquote className="mb-8 border-l-4 border-[#1A3461] pl-4 text-gray-700 italic">
							<p>
								Mussum Ipsum, cacilds vidis litro abertis. Admodum accumsan
								disputationi eu sit. Vide electram sadipscing et per. Nulla id
								gravida magna, ut semper sapien. Suco de cevadiss, é um leite
								divinis, qui tem lupuliz, matis, aguis e fermentis. Praesent vel
								viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget.
							</p>
							<footer className="mt-2 text-sm font-medium text-gray-500">
								– Mussum
							</footer>
						</blockquote>
						<div className="text-gray-800">
							<h2 className="mb-2 text-lg font-semibold underline">
								Lista imaginária
							</h2>
							<ul className="list-inside list-disc space-y-1">
								<li>Item 1 - Dessa lista imaginária</li>
								<li>Item 2 - Dessa lista imaginária</li>
								<li>Item 3 - Dessa lista imaginária</li>
								<li>Item 4 - Dessa lista imaginária</li>
								<li>Item 5 - Dessa lista imaginária</li>
							</ul>
						</div>
					</div>

					<div className="mt-10 flex w-full flex-col items-center gap-[14px] rounded-[20px] border-2 border-[#cdcdcd] px-6 py-6 text-center shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)] transition-shadow duration-200">
						<p className="text-xs text-[#6b6b6b] md:text-sm">
							O que achou desse artigo?
						</p>
						<div className="flex items-center gap-6">
							<button
								className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-[#1A3461] bg-[#0565FF]/15 text-[#1A3461] transition-colors duration-200 hover:border-[#0060FA] hover:text-[#0060FA] md:h-[46px] md:w-[46px]"
								aria-label="Curtir"
							>
								<MdOutlineThumbUp size={20} />
							</button>

							<button
								className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-[#1A3461] bg-[#0565FF]/15 text-[#1A3461] transition-colors duration-200 hover:border-[#0060FA] hover:text-[#0060FA] md:h-[46px] md:w-[46px]"
								aria-label="Não curtir"
							>
								<MdOutlineThumbDown size={20} />
							</button>
						</div>
					</div>
				</main>
			</div>
			<BackToTop />
			<Footer />
		</div>
	)
}
