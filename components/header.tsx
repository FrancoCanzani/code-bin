import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs';
import Link from 'next/link';

export default function Header() {
  return (
    <header className='flex mb-4 items-center justify-between'>
      <Link href={'/'} className='text-xl font-semibold'>
        Code Bin
      </Link>
      <div className='flex items-center justify-center space-x-2 font-semibold'>
        <Link href={'/bins'}>Bins</Link>
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
