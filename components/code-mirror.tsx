'use client';

import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { clouds } from 'thememirror';
import { Bin } from '@/lib/types';
import { useAuth } from '@clerk/nextjs';
import { languages, LanguageExtension } from '@codemirror/language-data';
import { toast } from 'sonner';

interface LanguageData {
  name: string;
  load: () => Promise<LanguageExtension>;
}

export default function CodeMirrorEditor({
  value,
  setValue,
  bin,
  language,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  bin: Bin | undefined;
  language: string;
}) {
  const { userId } = useAuth();
  const [langExtension, setLangExtension] = useState<LanguageExtension | null>(
    null
  );

  useEffect(() => {
    if (!language) {
      console.warn('Language is not defined');
      return;
    }

    const loadLanguage = async () => {
      console.log('Available languages:', languages);

      const lang = (languages as LanguageData[]).find(
        (lang) => lang?.name?.toLowerCase() === language.toLowerCase()
      );

      if (lang) {
        try {
          const extension = await lang.load();
          setLangExtension(extension);
        } catch (error) {
          toast.error('Failed to load language extension.');
          setLangExtension(null);
        }
      } else {
        console.warn(`Language ${language} not found`);
        setLangExtension(null);
      }
    };

    loadLanguage();
  }, [language]);

  const onChange = (val: string) => {
    setValue(val);
  };

  return (
    <CodeMirror
      value={value}
      height='500px'
      editable={bin ? userId === bin.user_id : true}
      onChange={onChange}
      extensions={[
        clouds,
        EditorView.theme({
          '&.cm-focused': {
            outline: 'none',
          },
        }),
        langExtension,
      ].filter(Boolean)}
      basicSetup={{
        lineNumbers: true,
      }}
      className='rounded-lg border p-4 custom-codemirror'
    />
  );
}
