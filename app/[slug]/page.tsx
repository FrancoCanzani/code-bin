import { Suspense } from 'react';
import AlertMessage from '@/components/alert-message';
import Editor from '@/components/editor';
import Share from '@/components/share';
import Header from '@/components/header';
import { auth } from '@clerk/nextjs/server';

export default function Page({ params }: { params: { slug: string } }) {
  const { userId } = auth();

  return (
    <div className='space-y-2'>
      <Header />
      {!userId && (
        <AlertMessage message='You are not authenticated. You will be able to share this bin but only edit and delete it from this device.' />
      )}
      <Suspense fallback={<p>Loading...</p>}>
        <Editor />
      </Suspense>
      <Share slug={params.slug} />
    </div>
  );
}
