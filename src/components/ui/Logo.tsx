import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  variant?: 'black' | 'white';
}

export default function Logo({ className = '', width = 120, height = 40, variant = 'black' }: LogoProps) {
  // If the variant is white, you might want to invert the image via CSS or use a different logo file
  const filterStyle = variant === 'white' ? 'invert(1)' : 'none';

  return (
    <Link href="/" className={`inline-block ${className}`}>
      <div className="relative flex items-center justify-center" style={{ width, height }}>
        <Image
          src="/logo.png"
          alt="XANTARA Logo"
          fill
          sizes="120px"
          className="object-contain"
          style={{ filter: filterStyle }}
          priority
        />
      </div>
    </Link>
  );
}
