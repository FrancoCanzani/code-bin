import { Suspense } from 'react';
import AlertMessage from '@/components/alert-message';
import Editor from '@/components/editor';
import Header from '@/components/header';
import UserBins from '@/components/user-bins';
import { sql } from '@vercel/postgres';
import { auth } from '@clerk/nextjs/server';
import { Bin } from '@/lib/types';

export default async function Page({ params }: { params: { slug: string } }) {
  const { userId } = auth();

  const binResult = await sql`
    SELECT * FROM bins WHERE bin_id = ${params.slug} AND user_id = ${userId};
  `;

  const bin: Bin | undefined =
    binResult.rows.length > 0
      ? {
          bin_id: binResult.rows[0].bin_id,
          user_id: binResult.rows[0].user_id,
          content: binResult.rows[0].content,
          private: binResult.rows[0].private,
          created_at: binResult.rows[0].created_at,
        }
      : undefined;

  return (
    <div className='space-y-8'>
      <Header />
      {!userId && (
        <AlertMessage message='You are not authenticated. You will be able to share this bin but not edit or delete it later.' />
      )}
      <Suspense fallback={<p>Loading...</p>}>
        <Editor slug={params.slug} bin={bin} />
      </Suspense>
      <UserBins />
    </div>
  );
}
