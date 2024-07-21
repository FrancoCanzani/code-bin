export default function AlertMessage({ message }: { message: string }) {
  return (
    <div className='bg-orange-50 flex flex-row items-center justify-between rounded-lg border p-4 text-sm font-medium border-orange-200'>
      {message}
    </div>
  );
}
