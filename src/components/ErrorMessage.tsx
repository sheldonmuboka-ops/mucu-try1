import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="card bg-red-500/10 border-red-500/50 flex items-center gap-3">
      <AlertCircle className="text-red-500 flex-shrink-0" size={24} />
      <p className="text-white">{message}</p>
    </div>
  );
}
