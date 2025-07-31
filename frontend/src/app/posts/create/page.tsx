'use client'

import { useRouter } from 'next/navigation'
import {
	MdOutlineArrowBack,
	MdOutlineEditNote,
	MdOutlineClose,
	MdOutlineImage,
} from 'react-icons/md'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import BackToTop from '@/app/components/BackToTop'
import { useState } from 'react'

export default function CreatePostPage() {
	const router = useRouter()
	const [tags, setTags] = useState<string[]>([])
	const [tagInput, setTagInput] = useState('')
	const formattedTag = capitalizeTag(tagInput)

	const handleAddTag = () => {
		if (formattedTag && !tags.includes(formattedTag)) {
			setTags([...tags, formattedTag])
			setTagInput('')
		}
	}

	const suggestedTags = [
		'Tech',
		'Design',
		'Inspiração',
		'Next.js',
		'UI',
		'UX',
		'JavaScript',
		'React',
		'CSS',
		'HTML',
		'Frontend',
		'Backend',
		'Node.js',
		'Python',
		'Dicas',
		'Tutoriais',
		'Typescript',
		'GraphQL',
		'API',
		'Web Development',
	]

	const handleRemoveTag = (tagToRemove: string) => {
		setTags(tags.filter((tag) => tag !== tagToRemove))
	}

	function capitalizeTag(tag: string): string {
		return tag
			.trim()
			.toLowerCase()
			.replace(/\b\w/g, (char) => char.toUpperCase())
	}

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
					<form className="flex flex-col gap-[30px]">
						<div className="flex w-full flex-col gap-[30px] md:flex-row">
							<div className="flex w-full flex-col gap-1.5 md:w-1/2">
								<label className="font-semibold text-black">
									Título da publicação
								</label>
								<input
									type="text"
									placeholder="Digite o título do post"
									className="rounded-md border-2 border-[#D5D5D5] bg-white p-4"
								/>
							</div>

							<div className="flex w-full flex-col gap-1.5 md:w-1/2">
								<label className="font-semibold text-black">
									Banner da publicação
								</label>
								<input
									type="file"
									name="banner"
									accept="image/*"
									className="w-full cursor-pointer rounded-md border-2 border-[#d5d5d5] file:mr-4 file:cursor-pointer file:rounded-l-md file:border-r-2 file:border-[#CDCDCD] file:bg-[#E9E8E8] file:px-4 file:py-4 file:text-[#6b6b6b]"
								/>
							</div>
						</div>

						<div className="flex flex-col gap-1.5">
							<label className="font-semibold text-black">Conteúdo</label>
							<textarea
								rows={10}
								placeholder="Digite o conteúdo do post"
								className="rounded-md border-2 border-[#D5D5D5] bg-white p-4"
							/>
						</div>

						<div className="flex flex-col gap-6">
							<div className="flex flex-col gap-1.5">
								<label className="font-semibold text-black">Tags</label>
								<input
									type="text"
									placeholder="Digite uma tag e pressione Enter"
									value={tagInput}
									onChange={(e) => setTagInput(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											e.preventDefault()
											handleAddTag()
										}
									}}
									className="rounded-md border-2 border-[#D5D5D5] bg-white p-4"
								/>

								{tagInput && (
									<ul className="mt-2 flex flex-wrap gap-2">
										{suggestedTags
											.filter(
												(tag) =>
													tag.toLowerCase().includes(tagInput.toLowerCase()) &&
													!tags.includes(tag)
											)
											.map((tag) => (
												<li
													key={tag}
													onClick={() => {
														setTags([...tags, tag])
														setTagInput('')
													}}
													className="cursor-pointer rounded-full bg-black px-4 py-2 text-sm text-white transition-colors hover:bg-[#214C92]"
												>
													{tag}
												</li>
											))}
									</ul>
								)}
							</div>

							{tags.length > 0 && (
								<div className="mt-2 flex flex-wrap gap-4 rounded-md border-2 border-[#D5D5D5] bg-white p-4">
									{tags.map((tag, index) => (
										<div
											key={index}
											className="flex items-center gap-1 rounded-full border-2 border-[#CDCDCD] bg-[#E9E8E8] px-4 py-2 text-sm font-semibold text-black"
										>
											{tag}
											<button
												type="button"
												onClick={() => handleRemoveTag(tag)}
												className="cursor-pointer text-gray-500 hover:text-red-600"
											>
												<MdOutlineClose size={16} />
											</button>
										</div>
									))}
								</div>
							)}
						</div>

						<button
							type="submit"
							className="flex w-fit items-center gap-1.5 self-end rounded-md border-2 border-[#214C92] bg-[#214C92]/15 px-8 py-4 text-[#214C92] transition-colors hover:bg-[#214C92] hover:text-white"
						>
							<MdOutlineEditNote size={20} />
							<span>Publicar</span>
						</button>
					</form>
				</main>
			</div>
			<BackToTop />
			<Footer />
		</div>
	)
}
