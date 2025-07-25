import Image from 'next/image'
import Header from './components/Header'
import Footer from './components/Footer'
import CardPost from './components/CardPost'
import Aside from './components/Aside'
import TabNav from './components/TabNav'

const fakeLatestPosts = Array.from({ length: 6 }).map((_, i) => ({
	author: { name: 'Jane Doe', avatar: '/profile.jpg' },
	timeAgo: 'há 5 horas',
	postImage: '/post-banner.jpg',
	title: `Post mais recente #${i + 1}`,
	description:
		'Descrição fictícia para o post mais recente.Mussum Ipsum, cacilds vidis litro abertis.  Mé faiz elementum girarzis, nisi eros vermeio. Cevadis im ampola pa arma uma pindureta. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Suco de cevadiss deixa as pessoas mais interessantis.',
	views: '587',
	likes: '1.5 mil',
}))

const fakeMostViewedPosts = Array.from({ length: 6 }).map((_, i) => ({
	author: { name: 'John Doe', avatar: '/profile.jpg' },
	timeAgo: 'há 2 dias',
	postImage: '/post-banner.jpg',
	title: `Post mais visualizado #${i + 1}`,
	description:
		'Descrição fictícia para o post mais visualizado. Mussum Ipsum, cacilds vidis litro abertis.  Mé faiz elementum girarzis, nisi eros vermeio. Cevadis im ampola pa arma uma pindureta. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Suco de cevadiss deixa as pessoas mais interessantis.',
	views: '2.3 mil',
	likes: '3 mil',
}))

export default function Home() {
	return (
		<>
			<div className="flex h-full w-full flex-col">
				<div className="flex flex-col items-center px-8 pt-8 pb-20 sm:pt-6">
					<Header />

					<section className="relative mt-8 h-[188px] max-h-[577px] w-full max-w-5xl overflow-hidden rounded-4xl sm:h-[420px] sm:rounded-[50px] md:mt-10 md:h-[466px] xl:h-[577px]">
						<Image
							src="/banner.jpg"
							alt="Banner"
							fill
							className="object-cover"
							priority
						/>
						<div className="absolute inset-0 bg-black/50" />
						<div className="relative z-10 flex h-full w-full flex-col justify-end gap-2.5 px-5 py-5 sm:gap-4 sm:px-14 sm:py-20 md:px-12 md:py-16">
							<h1 className="text-base font-bold text-white sm:text-4xl">
								Pixel Perfect - A jornada pelo layout útopico
							</h1>
							<div className="flex flex-row items-center gap-4 text-xs text-white sm:text-base">
								<span>Jane Doe</span>
								<span className="font-bold text-[#0565FF]">|</span>
								<span>há 5 horas</span>
							</div>
						</div>
					</section>
					<section className="mt-28 flex max-w-5xl gap-7">
						<TabNav
							latestPosts={
								<div className="flex w-full flex-col gap-7">
									{fakeLatestPosts.map((post, idx) => (
										<CardPost key={idx} {...post} />
									))}
								</div>
							}
							mostViewedPosts={
								<div className="flex w-full flex-col gap-7">
									{fakeMostViewedPosts.map((post, idx) => (
										<CardPost key={idx} {...post} />
									))}
								</div>
							}
						/>
						<Aside />
					</section>
				</div>
				<Footer />
			</div>
		</>
	)
}
