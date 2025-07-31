'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Aside from '../components/Aside'
import CardPost from '../components/CardPost'
import { useRouter } from 'next/navigation'
import {
	MdOutlineArrowBack,
	MdOutlineChevronLeft,
	MdOutlineChevronRight,
	MdOutlineEditNote,
} from 'react-icons/md'
import Link from 'next/link'
import { useState } from 'react'
import BackToTop from '../components/BackToTop'

const fakePosts = Array.from({ length: 20 }).map((_, i) => ({
	author: { name: 'Jane Doe', avatar: '/profile.jpg' },
	timeAgo: 'há 1 dia',
	postImage: '/post-banner.jpg',
	title: `Post exemplo Mussum Ipsum #${i + 1}`,
	description:
		'Descrição fictícia do post para testes. Mussum Ipsum, cacilds vidis litro abertis. A ordem dos tratores não altera o pão duris. Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum. Bota 1 metro de cachacis aí pra viagem! Não sou faixa preta cumpadi, sou preto inteiris, inteiris.',
	views: '100',
	likes: '50',
}))

const POSTS_PER_PAGE = 6

export default function PostsPage() {
	const router = useRouter()
	const [page, setPage] = useState(1)

	const totalPages = Math.ceil(fakePosts.length / POSTS_PER_PAGE)
	const start = (page - 1) * POSTS_PER_PAGE
	const end = start + POSTS_PER_PAGE
	const postsToShow = fakePosts.slice(start, end)

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
					<Link
						href="/posts/create"
						className="flex items-center gap-1.5 rounded-xl border-2 border-[#214C92] bg-[#0565FF]/15 px-5 py-3 text-sm font-medium text-[#214C92] transition hover:bg-[#214C92] hover:text-white md:px-8 md:py-4 md:text-base"
					>
						<MdOutlineEditNote size={22} />
						<span>Escrever</span>
					</Link>
				</div>

				<main className="mx-auto flex w-full max-w-5xl flex-1 justify-center gap-8 px-0 pb-16 md:px-8">
					<div className="flex w-full flex-col gap-8 lg:w-[70%]">
						{postsToShow.map((post, idx) => (
							<CardPost key={idx} {...post} />
						))}
						<div className="mt-8 flex items-center justify-center gap-6 sm:gap-8">
							<button
								onClick={() => setPage((p) => Math.max(1, p - 1))}
								disabled={page === 1}
								className={`flex h-14 w-14 items-center justify-center rounded-full border-2 border-black bg-transparent p-3 text-black transition disabled:opacity-50 ${
									page === 1
										? 'cursor-not-allowed opacity-50'
										: 'cursor-pointer hover:bg-black hover:text-[#D5D5D5]'
								} `}
								aria-label="Página anterior"
							>
								<MdOutlineChevronLeft size={28} />
							</button>
							<span className="text-base font-medium text-black">
								Página {page} de {totalPages}
							</span>
							<button
								onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
								disabled={page === totalPages}
								className={`flex h-14 w-14 items-center justify-center rounded-full border-2 border-black bg-transparent p-3 text-black transition disabled:opacity-50 ${
									page === totalPages
										? 'cursor-not-allowed opacity-50'
										: 'cursor-pointer hover:bg-black hover:text-[#D5D5D5]'
								} `}
								aria-label="Próxima página"
							>
								<MdOutlineChevronRight size={28} />
							</button>
						</div>
					</div>
					<div className="hidden w-[30%] lg:flex">
						<Aside />
					</div>
				</main>
			</div>
			<BackToTop />
			<Footer />
		</div>
	)
}
