'use client';

import { Button } from './ui/button';
import { toast } from 'sonner';
import { Copy, Share as ShareIcon } from 'lucide-react';

export default function Share({ slug }: { slug: string }) {
  const shareData = {
    title: `Code Bin ${slug}`,
    text: 'Hey! Check this code!',
    url: `code-bin-theta.vercel.app/${slug}`,
  };

  return (
    <div className='flex flex-row items-center justify-between rounded-lg border p-4'>
      <div className='space-y-0.5'>
        <label className='text-base font-medium capitalize'>Share</label>
        <p>{`code-bin-theta.vercel.app/${slug}`} </p>
      </div>
      <div>
        <Button
          variant='outline'
          className='rounded-r-none border-l-none'
          size='sm'
          type='button'
          title='Copy'
          aria-label='Copy link'
          onClick={() => {
            //fix later to make it dynamic with .env
            try {
              navigator.clipboard.writeText(
                `code-bin-theta.vercel.app/${slug}`
              );
              toast.success('Copied to Clipboard.');
            } catch {
              toast.error('Error: The link was not copied to Clipboard.');
            }
          }}
        >
          <Copy size='14' />
        </Button>
        <Button
          variant='outline'
          className='rounded-l-none rounded-r-sm border-l-none'
          size='sm'
          type='button'
          title='Share'
          aria-label='Share link'
          onClick={async () => {
            try {
              if (navigator.share) {
                await navigator.share(shareData);
              }
            } catch {
              toast.error('Error sharing the link.');
            }
          }}
        >
          <ShareIcon size='14' />
        </Button>
      </div>
    </div>
  );
}
