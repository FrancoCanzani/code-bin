'use client';

import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { clouds } from 'thememirror';
import { useState } from 'react';
import { supportedLanguages } from '../lib/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Share from './share';
import { Switch } from './ui/switch';
import { useAuth } from '@clerk/nextjs';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { Bin } from '@/lib/types';

async function addBin(
  userId: string | null | undefined,
  binId: string,
  content: string,
  isPrivate: boolean
) {
  const response = await fetch('/api/add-bin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId,
      binId,
      content,
      isPrivate,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Something went wrong');
  }

  const data = await response.json();
  return data.bins;
}

export default function Editor({
  slug,
  bin,
}: {
  slug: string;
  bin: Bin | undefined;
}) {
  const [value, setValue] = useState(
    bin ? bin.content : 'Start writing some code...'
  );
  const [isPrivate, setIsPrivate] = useState(false);
  const [language, setLanguage] = useState('javascript');
  const { userId } = useAuth();
  const router = useRouter();

  const onChange = (val: string) => {
    setValue(val);
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!value.trim()) {
      toast.error('Bin cannot be empty!');
      return;
    }

    try {
      const newBins = await addBin(userId, slug, value, isPrivate);
      router.push(`/${slug}?refreshId=${new Date().getTime()}`);
      toast.success('Bin saved successfully!');
    } catch (error) {
      toast.error('Failed to save bin');
    }
  };

  return (
    <form onSubmit={handleSave} className='space-y-4'>
      <div className='px-2 flex items-center justify-between'>
        <Select onValueChange={setLanguage}>
          <SelectTrigger className='w-[180px] text-sm'>
            <SelectValue placeholder={language} />
          </SelectTrigger>
          <SelectContent>
            {supportedLanguages.map((lang: string) => (
              <SelectItem key={lang} value={lang}>
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant={'outline'} type='submit'>
          Save
        </Button>
      </div>
      <CodeMirror
        value={value}
        height='500px'
        editable={bin ? userId == bin.user_id : true}
        onChange={onChange}
        extensions={[
          clouds,
          EditorView.theme({
            '&.cm-focused': {
              outline: 'none',
            },
          }),
        ]}
        basicSetup={{
          lineNumbers: true,
        }}
        className='rounded-lg border p-4 custom-codemirror'
      />
      <Share slug={slug} />
      <div className='flex flex-row items-center justify-between rounded-lg border p-4'>
        <div className='space-y-0.5'>
          <label className='text-base font-medium capitalize'>
            Mark as private
          </label>
          <p>
            Only you and people with a link will be able to see this bin. It
            will not be listed.
          </p>
        </div>
        <Switch
          checked={isPrivate}
          onCheckedChange={() => setIsPrivate(!isPrivate)}
          aria-readonly
        />
      </div>
    </form>
  );
}
