"use client"
import { Bebas_Neue, Rajdhani } from 'next/font/google';
import Link from 'next/link';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
});

const rajdhani = Rajdhani({
  weight: '600',
  subsets: ['latin'],
});

export default function LogoText({ className = "" }) {
  return (
    <Link href="/">
      <div className={`text-2xl flex items-baseline gap-[1px] ${className}`}>
        <span className={`${bebasNeue.className} text-gray-900 tracking-wider text-3xl`}>
          TRANS
        </span>
        <span className={`${rajdhani.className} text-blue-600 font-semibold text-2xl`}>
          loft
        </span>
      </div>
    </Link>
  );
}