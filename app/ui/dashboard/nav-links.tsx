'use client';

import {
  Cog8ToothIcon,
  RssIcon,
  CircleStackIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import EmiIcon from '@/app/ui/incons';

const links = [
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: RssIcon
  },
  { 
    name: 'Emissioni', 
    href: '/dashboard/emissioni', 
    icon: EmiIcon 
  },
  {
    name: 'Determinanti',
    href: '/dashboard/determinanti',
    icon: CircleStackIcon,
  },
  { 
    name: 'Settings', 
    href: '/dashboard/settings', 
    icon: Cog8ToothIcon 
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
