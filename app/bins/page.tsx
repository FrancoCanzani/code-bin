import { sql } from '@vercel/postgres';
import Link from 'next/link';
import Header from '@/components/header';
import { formatDistanceToNowStrict } from 'date-fns';
import { MoveUpRight } from 'lucide-react';

export default async function Page() {
  const binsResult = await sql`
  SELECT bins.*, users.fullname 
  FROM bins
  LEFT JOIN users ON bins.user_id = users.user_id
  WHERE bins.private = false
  ORDER BY bins.created_at DESC;
`;

  const bins = binsResult.rows;

  if (bins.length === 0) {
    return (
      <section className='w-full'>
        <Header />
        <p className='w-full m-auto text-center font-semibold capitalize text-gray-600 text-sm py-8'>
          No public bins available.
        </p>
      </section>
    );
  }

  return (
    <section>
      <Header />
      <h2 className='font-medium mb-4 capitalize'>Public Bins</h2>
      <div className='space-y-4'>
        {bins.map((bin) => (
          <div
            key={bin.id}
            className='flex shadow w-full flex-col items-start space-y-3 justify-between rounded-lg border p-3 text-sm'
          >
            <div className='flex items-center w-full justify-between space-x-3'>
              <div className='flex items-center w-2/3 sm:w-5/6 justify-start space-x-3'>
                <span className='rounded-sm font-medium border px-1.5 py-1 text-xs bg-blue-100 shadow text-blue-700'>
                  Public
                </span>
                <span
                  title={bin.content}
                  className='text-ellipsis w-full truncate'
                >
                  {bin.content}
                </span>
              </div>
              <Link
                className='rounded-sm font-medium inline-flex items-center justify-center border px-1.5 py-1 text-xs bg-gray-100 shadow hover:bg-gray-200 text-gray-700'
                href={`code-bin-theta.vercel.app/${bin.id}`}
              >
                Open Bin <MoveUpRight size={12} className='ml-1' />
              </Link>
            </div>
            <div className='flex items-center w-full justify-start space-x-3'>
              {bin.fullname ? (
                <p>
                  Submited by{' '}
                  <span className='font-medium'>{bin.fullname}</span>
                </p>
              ) : (
                <p className='font-medium'>Anonymous</p>
              )}
              <span>
                {formatDistanceToNowStrict(new Date(bin.created_at))} ago
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
