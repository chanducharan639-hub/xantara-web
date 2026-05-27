import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black px-6 text-center">
      <h1 className="text-[15vw] md:text-[10vw] font-serif leading-none mb-4">404</h1>
      <p className="text-sm md:text-base uppercase tracking-widest text-gray-500 mb-12">Page Not Found</p>
      <Link href="/" className="border-b border-black pb-1 text-sm uppercase tracking-widest hover:text-gray-500 hover:border-gray-500 transition-colors">
        Return to Reality
      </Link>
    </div>
  );
}
