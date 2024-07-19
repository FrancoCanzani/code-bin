'use client';

import Link from 'next/link';
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';

export default function Home() {
  const [id, setId] = useState('');

  useEffect(() => {
    const newId = nanoid(7);
    const generateNewBinId = () => setId(newId);

    generateNewBinId();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link className="underline text-blue-600" href={`/${id}`}>
        New Bin
      </Link>
    </main>
  );
}
