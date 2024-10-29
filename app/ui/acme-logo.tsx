import { CloudIcon }  from '@heroicons/react/24/outline';

import { matura } from '@/app/ui/matura-font';

export default function AcmeLogo() {
  return (
    <div
      className="flex flex-row items-center leading-none"
      
    >
      <CloudIcon className="h-12 w-12 rotate-[25deg] text-sky-700" />
      <p className={`${matura.className} antialiased text-6xl text-sky-700`}>
        <strong>E<sup>2</sup>Gov</strong>
      </p>
    </div>
  );
}
