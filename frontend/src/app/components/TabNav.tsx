'use client'
import React, { useState } from 'react'

interface TabNavProps {
	latestPosts: React.ReactNode
	mostViewedPosts: React.ReactNode
}

export default function TabNav({ latestPosts, mostViewedPosts }: TabNavProps) {
	const [activeTab, setActiveTab] = useState<'latest' | 'mostViewed'>('latest')

	return (
		<div className="flex w-full flex-col items-center">
			<div className="mb-8 flex justify-between gap-4 md:gap-8">
				<button
					className={`relative cursor-pointer px-4 py-4 text-sm font-medium text-black transition md:text-lg ${
						activeTab === 'latest'
							? 'after:absolute after:right-0 after:-bottom-1 after:left-0 after:h-0.5 after:bg-[#0565FF] after:content-[""]'
							: ''
					}`}
					onClick={() => setActiveTab('latest')}
				>
					Últimos posts
				</button>
				<button
					className={`relative cursor-pointer px-4 py-4 text-sm font-medium text-black transition md:text-lg ${
						activeTab === 'mostViewed'
							? 'after:absolute after:right-0 after:-bottom-1 after:left-0 after:h-0.5 after:bg-[#0565FF] after:content-[""]'
							: ''
					}`}
					onClick={() => setActiveTab('mostViewed')}
				>
					Mais visualizados
				</button>
			</div>
			<div className="w-full">
				{activeTab === 'latest' ? latestPosts : mostViewedPosts}
			</div>
		</div>
	)
}
