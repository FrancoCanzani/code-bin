import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs';
import Link from 'next/link';
import { nanoid } from 'nanoid';

export default function Header() {
  return (
    <header className='flex w-full mb-4 items-center justify-between'>
      <Link href={`/${nanoid(7)}`} className='text-xl font-semibold'>
        Code Bin
      </Link>
      <div className='flex items-center justify-center space-x-4 font-medium'>
        <Link href={`/${nanoid(7)}`} className='hover:underline'>
          New Bin
        </Link>
        <Link href={'/bins'} className='hover:underline'>
          Bins
        </Link>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <SignOutButton />
        </SignedIn>
      </div>
    </header>
  );
}
