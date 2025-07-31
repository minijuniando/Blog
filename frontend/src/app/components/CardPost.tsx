import Image from 'next/image'
import {
	MdAccessTime,
	MdArrowForward,
	MdRemoveRedEye,
	MdThumbUpOffAlt,
} from 'react-icons/md'
import React from 'react'
import Link from 'next/link'

interface CardPostProps {
	author: {
		name: string
		avatar: string
	}
	timeAgo: string
	postImage: string
	title: string
	description: string
	views: string
	likes: string
}

export default function CardPost({
	author,
	timeAgo,
	postImage,
	title,
	description,
	views,
	likes,
}: CardPostProps) {
	return (
		<Link
			href="/post/teste"
			className="flex h-fit w-full max-w-[766px] cursor-pointer flex-col gap-5 rounded-[20px] border-2 border-[#CDCDCD] bg-white px-3.5 py-7 shadow transition-shadow duration-200 hover:shadow-[4px_4px_4px_0_rgba(0,0,0,0.25)] sm:rounded-[30px] sm:px-6"
		>
			<div className="flex w-full items-center justify-between">
				<div className="flex items-center gap-1.5">
					<Image
						src={author.avatar}
						alt={author.name}
						width={40}
						height={40}
						className="h-8 w-8 rounded-full border-2 border-[#CDCDCD] object-cover"
					/>
					<span className="text-base text-black">{author.name}</span>
				</div>
				<div className="flex items-center gap-1.5 text-[#6b6b6b]">
					<MdAccessTime size={18} />
					<span className="text-xs sm:text-base">{timeAgo}</span>
				</div>
			</div>

			<div className="flex w-full flex-col gap-4 sm:flex-row sm:gap-7">
				<div className="flex-shrink-0">
					<Image
						src={postImage}
						alt={title}
						width={272}
						height={160}
						className="h-auto w-full rounded-xl object-cover sm:max-w-[272px]"
					/>
				</div>
				<div className="flex flex-1 flex-col justify-between">
					<h2 className="mb-2.5 text-2xl font-bold text-black">{title}</h2>
					<p className="mb-2.5 line-clamp-3 text-base text-[#6b6b6b]">
						{description}
					</p>
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-5 text-[#6b6b6b] sm:gap-9">
							<div className="flex items-center gap-1.5 text-xs">
								<MdRemoveRedEye size={16} />
								<span>{views}</span>
							</div>
							<div className="flex items-center gap-1.5 text-xs">
								<MdThumbUpOffAlt size={16} />
								<span>{likes}</span>
							</div>
						</div>
						<div className="flex items-center gap-1.5 text-base font-medium text-[#0565FF]">
							<span>ver mais</span>
							<MdArrowForward size={18} />
						</div>
					</div>
				</div>
			</div>
		</Link>
	)
}
