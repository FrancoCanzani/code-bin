import { Suspense } from 'react';
import AlertMessage from '@/components/alert-message';
import Editor from '@/components/editor';
import Header from '@/components/header';
import { auth } from '@clerk/nextjs/server';
import UserBins from '@/components/user-bins';

export default function Page({ params }: { params: { slug: string } }) {
  const { userId } = auth();

  return (
    <div className='space-y-8'>
      <Header />
      {!userId && (
        <AlertMessage message='You are not authenticated. You will be able to share this bin but not edit or delete it later.' />
      )}
      <Suspense fallback={<p>Loading...</p>}>
        <Editor slug={params.slug} />
      </Suspense>
      <UserBins />
    </div>
  );
}
3;
