import { sql } from '@vercel/postgres';
import Link from 'next/link';
import Header from '@/components/header';

const MAX_CONTENT_LENGTH = 100;

const truncateContent = (content: string, maxLength: number) => {
  return content.length > maxLength
    ? content.slice(0, maxLength) + '...'
    : content;
};

export default async function Page() {
  const binsResult = await sql`
    SELECT * FROM bins WHERE private = false;
  `;

  const bins = binsResult.rows;

  if (bins.length == 0) {
    return;
  }

  return (
    <section>
      <Header />
      <h2 className='text-lg font-medium mb-2 capitalize'>Public Bins</h2>
      <div className='not-prose relative bg-gray-50 rounded-sm overflow-hidden dark:bg-gray-800/25'>
        <div
          style={{ backgroundPosition: '10px 10px' }}
          className='absolute inset-0 bg-grid-gray-50 dark:bg-grid-gray-700/25'
        ></div>
        <div className='relative rounded-sm overflow-auto'>
          <div className='shadow-sm overflow-x-auto my-3'>
            <table className='border-collapse table-fixed min-w-full text-sm'>
              <thead>
                <tr>
                  <th className='border-b dark:border-gray-600 font-medium p-2 pt-0 pb-3 text-gray-600 dark:text-gray-200 text-left'>
                    Content
                  </th>
                  <th className='border-b dark:border-gray-600 font-medium p-2 pt-0 pb-3 text-gray-600 dark:text-gray-200 text-left'>
                    Language
                  </th>
                  <th className='border-b dark:border-gray-600 font-medium p-2 pr-8 pt-0 pb-3 text-gray-600 dark:text-gray-200 text-left'>
                    Private
                  </th>
                  <th className='border-b dark:border-gray-600 font-medium p-2 pr-8 pt-0 pb-3 text-gray-600 dark:text-gray-200 text-left'>
                    Created
                  </th>
                  <th className='border-b dark:border-gray-600 font-medium p-2 pr-8 pt-0 pb-3 text-gray-600 dark:text-gray-200 text-left'>
                    Link
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white dark:bg-gray-800'>
                {bins.map((bin) => (
                  <tr key={bin.bin_id}>
                    <td className='border-b border-gray-100 dark:border-gray-700 p-2 text-gray-700 dark:text-gray-600 min-w-[200px]'>
                      <span className='truncate'>
                        {truncateContent(bin.content, MAX_CONTENT_LENGTH)}
                      </span>
                    </td>
                    <td className='border-b border-gray-100 dark:border-gray-700 p-2 text-gray-700 dark:text-gray-600'>
                      {bin.language}
                    </td>
                    <td className='border-b border-gray-100 dark:border-gray-700 p-2 text-gray-700 dark:text-gray-600'>
                      {bin.private ? 'Yes' : 'No'}
                    </td>
                    <td className='border-b border-gray-100 dark:border-gray-700 p-2 text-gray-700 dark:text-gray-600'>
                      {new Date(bin.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })}
                    </td>
                    <td className='border-b border-gray-100 dark:border-gray-700 p-2 text-gray-700 dark:text-gray-600'>
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
    </section>
  );
}
