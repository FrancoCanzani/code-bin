export default function AlertMessage({ message }: { message: string }) {
  return (
    <div className="bg-orange-50 rounded-sm text-xs p-1 font-medium border-orange-200 border">
      {message}
    </div>
  );
}
