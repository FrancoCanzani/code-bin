import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs';

export default function Header() {
  return (
    <header className='flex items-center justify-between'>
      <h1 className='text-xl font-semibold'>Code Bin</h1>
      <div className=''>
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
