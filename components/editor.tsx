'use client';

import { useState } from 'react';
import { supportedLanguages } from '../lib/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import Share from './share';
import { Switch } from './ui/switch';
import { useAuth } from '@clerk/nextjs';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { Bin } from '@/lib/types';
import CodeMirrorEditor from './code-mirror';
import AlertMessage from './alert-message';

async function addBin(
  userId: string | null | undefined,
  binId: string,
  content: string,
  isPrivate: boolean,
  language: string
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
      language,
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
  const [isPrivate, setIsPrivate] = useState(bin ? bin.private : false);
  const [language, setLanguage] = useState(bin ? bin.language : 'javascript');
  const { userId } = useAuth();
  const router = useRouter();

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!value.trim()) {
      toast.error('Bin cannot be empty!');
      return;
    }

    try {
      const newBins = await addBin(userId, slug, value, isPrivate, language);
      router.push(`/${slug}?refreshId=${new Date().getTime()}`);
      toast.success('Bin saved successfully!');
    } catch (error) {
      console.log(error);

      toast.error('Failed to save bin');
    }
  };

  // Determine if the user is allowed to edit
  const canEdit = bin ? userId && bin.user_id === userId : true;
  // Allow saving (creating) if there is no bin or if the bin can be edited
  const canSave = bin ? canEdit : true;

  return (
    <form onSubmit={handleSave} className='space-y-4'>
      {canSave && (
        <>
          {canEdit && (
            <div className='flex items-center justify-between'>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className='w-[140px] text-sm capitalize'>
                  <span>{language || 'javascript'}</span>
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
          )}
          {canEdit && (
            <div className='flex flex-row items-center justify-between rounded-lg border p-2.5 px-3.5'>
              <div className='space-y-0.5'>
                <label className='text-base font-medium capitalize'>
                  Mark as private
                </label>
                <p>
                  Only you and people with a link will be able to see this bin.
                  It will not be listed.
                </p>
              </div>
              <Switch
                checked={isPrivate}
                onCheckedChange={() => setIsPrivate(!isPrivate)}
                aria-readonly
              />
            </div>
          )}
        </>
      )}
      <CodeMirrorEditor
        bin={bin}
        setValue={setValue}
        value={value}
        language={language}
      />
      {!userId && !bin && (
        <AlertMessage message='You are not authenticated. You will be able to share this bin but not edit or delete it.' />
      )}
      <Share slug={slug} />
    </form>
  );
}
