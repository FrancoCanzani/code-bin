'use client';

import { Button } from './ui/button';
import { toast } from 'sonner';
import { Copy, Share as ShareIcon } from 'lucide-react';

export default function Share({ slug }: { slug: string }) {
  const shareData = {
    title: `Code Bin ${slug}`,
    text: 'Hey! Check this code!',
    url: `http://localhost:3000/${slug}`,
  };

  return (
    <div>
      <h4>Share</h4>
      <div className="flex items-center justify-center text-sm">
        <p className="h-9 shadow-inner font-medium rounded-sm rounded-r-none px-3 inline-flex items-center justify-center border border-input bg-background hover:bg-accent hover:text-accent-foreground">{`http://localhost:3000/${slug}`}</p>
        <Button
          variant="outline"
          className="rounded-none border-l-none"
          size="sm"
          title="Copy"
          aria-label="Copy link"
          onClick={() => {
            //fix later to make ir dynamic with .env
            try {
              navigator.clipboard.writeText(`http://localhost:3000/${slug}`);
              toast.success('Copied to Clipboard.');
            } catch {
              toast.error('Error: The link was not copied to Clipboard.');
            }
          }}
        >
          <Copy size="14" />
        </Button>
        <Button
          variant="outline"
          className="rounded-l-none rounded-r-sm border-l-none"
          size="sm"
          title="Share"
          aria-label="Share link"
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
          <ShareIcon size="14" />
        </Button>
      </div>
    </div>
  );
}
