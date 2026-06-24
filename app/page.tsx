import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-12 text-center">
        <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:p-10">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Magic
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            Welcome to Magic - Share and explore images
          </p>
        </div>
      </div>
    </main>
  );
}
