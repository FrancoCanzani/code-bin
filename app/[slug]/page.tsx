import Editor from '@/components/editor';
import Header from '@/components/header';
import UserBins from '@/components/user-bins';
import { sql } from '@vercel/postgres';
import { auth } from '@clerk/nextjs/server';
import { Bin } from '@/lib/types';

export default async function Page({ params }: { params: { slug: string } }) {
  const binResult = await sql`
    SELECT * FROM bins WHERE id = ${params.slug};
  `;

  const bin: Bin | undefined =
    binResult.rows.length > 0
      ? {
          id: binResult.rows[0].id,
          user_id: binResult.rows[0].user_id,
          content: binResult.rows[0].content,
          language: binResult.rows[0].language,
          private: binResult.rows[0].private,
          created_at: binResult.rows[0].created_at,
        }
      : undefined;

  return (
    <div className='space-y-8'>
      <Header />
      <Editor slug={params.slug} bin={bin} />
      <UserBins />
    </div>
  );
}
