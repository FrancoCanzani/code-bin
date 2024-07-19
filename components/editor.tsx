'use client';

import CodeMirror from '@uiw/react-codemirror';
import { useState } from 'react';
import { supportedLanguages } from '../lib/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Editor() {
  const [value, setValue] = useState(
    'Start writing some code... \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n'
  );
  console.log(value);
  const [language, setLanguage] = useState('JSX');

  const onChange = (val: string) => {
    setValue(val);
  };

  return (
    <div className="space-y-4">
      <div className="px-2">
        <Select onValueChange={setLanguage}>
          <SelectTrigger className="w-[180px] text-sm">
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
      </div>

      <CodeMirror
        value={value}
        lazyLoadMode={false}
        options={{
          mode: { language },
        }}
        onChange={onChange}
      />
    </div>
  );
}
