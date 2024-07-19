export default function AlertMessage({ message }: { message: string }) {
  return (
    <div className='bg-orange-50 capitalize w-fit m-auto rounded-sm text-sm p-2 font-medium border-orange-200 border'>
      {message}
    </div>
  );
}
