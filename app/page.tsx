import { nanoid } from 'nanoid';
import { redirect } from 'next/navigation';

export default function Home() {
  redirect(`/${nanoid(7)}`);
}
