import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'

export default function SignIn() {
	return (
		<main className="bg-blue-primary relative flex h-full w-full items-center justify-center">
			<div className="text-foreground-white bg-blue-primary flex min-h-screen w-full max-w-5xl flex-col items-center justify-center md:min-h-0 md:flex-1/2 md:flex-row md:gap-8">
				<div className="relative h-52 w-full md:h-[550px] md:w-1/2">
					<Image
						src="/devs.jpg"
						alt="Imagem devs trabalhando em uma mesa"
						className="object-cover md:rounded-3xl"
						fill
					/>
				</div>
				<div className="bg-blue-primary z-10 -mt-30 flex w-full flex-1 flex-col items-center gap-6 rounded-t-3xl px-8 py-6 pt-9 md:z-auto md:mt-0 md:w-1/2 md:justify-center md:rounded-none">
					<div className="relative max-h-14 min-h-8 max-w-60 min-w-36">
						<Image
							src="/logo-dark.svg"
							alt="Logo juniando"
							fill
							objectFit="cover"
						/>
					</div>
					<p>Crie seu cadastro para continuar</p>
					<form action="" className="w-full">
						<label htmlFor="nome">Nome</label>
						<Input
							type="text"
							name="name"
							className="bg-blue-secondary border-blue-third mt-3 mb-5 h-12 border-2 focus:border-none"
						/>

						<label htmlFor="email">Email</label>
						<Input
							type="email"
							name="email"
							className="bg-blue-secondary border-blue-third mt-3 mb-5 h-12 border-2 focus:border-none"
						/>

						<label htmlFor="password">Senha</label>
						<Input
							type="password"
							name="password"
							className="bg-blue-secondary border-blue-third mt-3 mb-5 h-12 border-2 focus:border-none"
						/>
						<Button type="submit" className="bg-blue-third h-12 w-full">
							Cadastrar
						</Button>
					</form>

					<div className="text-center">
						<p>Já tem uma conta?</p>
						<Link
							href="/signin"
							className="text-blue-third font-bold underline"
						>
							Faça seu login aqui
						</Link>
					</div>
				</div>
			</div>
		</main>
	)
}
