import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Image src="/geri.png" alt="Logo Geri" width={310} height={310} />
        <p>Bem-vindo ao</p>
        <h1>Geri</h1>
      </div>
    </main>
  )
}
