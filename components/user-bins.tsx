import { sql } from '@vercel/postgres';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';

const MAX_CONTENT_LENGTH = 100;

const truncateContent = (content: string, maxLength: number) => {
  return content.length > maxLength
    ? content.slice(0, maxLength) + '...'
    : content;
};

export default async function UserBins() {
  const { userId } = auth();

  const binsResult = await sql`
    SELECT * FROM bins WHERE user_id = ${userId}
  `;

  const bins = binsResult.rows;

  return (
    <div className='mt-2'>
      <h2>Your Bins</h2>
      <div className='not-prose relative bg-slate-50 rounded-sm overflow-hidden dark:bg-slate-800/25'>
        <div
          style={{ backgroundPosition: '10px 10px' }}
          className='absolute inset-0 bg-grid-slate-50 dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]'
        ></div>
        <div className='relative rounded-sm overflow-auto'>
          <div className='shadow-sm overflow-x-auto my-3'>
            <table className='border-collapse table-fixed min-w-full text-sm'>
              <thead>
                <tr>
                  <th className='border-b dark:border-slate-600 font-medium p-2 pl-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left'>
                    Bin ID
                  </th>
                  <th className='border-b dark:border-slate-600 font-medium p-2 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left'>
                    Content
                  </th>
                  <th className='border-b dark:border-slate-600 font-medium p-2 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left'>
                    Private
                  </th>
                  <th className='border-b dark:border-slate-600 font-medium p-2 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left'>
                    Created At
                  </th>
                  <th className='border-b dark:border-slate-600 font-medium p-2 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left'>
                    Link
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white dark:bg-slate-800'>
                {bins.map((bin) => (
                  <tr key={bin.bin_id}>
                    <td className='border-b border-slate-100 dark:border-slate-700 p-2 pl-4 text-slate-500 dark:text-slate-400'>
                      {bin.bin_id}
                    </td>
                    <td className='border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400 min-w-[200px]'>
                      <span className='truncate'>
                        {truncateContent(bin.content, MAX_CONTENT_LENGTH)}
                      </span>
                    </td>
                    <td className='border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400'>
                      {bin.private ? 'Yes' : 'No'}
                    </td>
                    <td className='border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400'>
                      {new Date(bin.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })}
                    </td>
                    <td className='border-b border-slate-100 dark:border-slate-700 p-2 text-slate-500 dark:text-slate-400'>
                      <Link
                        className='hover:underline'
                        href={`http://localhost:3000/${bin.bin_id}`}
                      >{`http://localhost:3000/${bin.bin_id}`}</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='absolute inset-0 pointer-events-none border border-black/5 rounded-sm dark:border-white/5'></div>
      </div>
    </div>
  );
}
