'use client';
import { useSearchParams } from 'next/navigation';
import { CreateAccountForm } from './components/CreateAccountForm';
import { LoginAndDownload } from './components/LoginAndDownload';

export default function Home() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">🎉 Congratulations!</h1>
        <p className="mb-6 text-gray-600">
          You&apos;ve been invited to join Mercor as a contractor.
        </p>

        {token ? (
          <CreateAccountForm token={token} />
        ) : (
          <LoginAndDownload />
        )}
      </div>
    </main>
  );
}
