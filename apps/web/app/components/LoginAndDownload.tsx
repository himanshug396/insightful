import { useState } from 'react';
import { BACKEND_URL, DESKTOP_APP_URL } from '../constants';

export function LoginAndDownload() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error('Login failed');

      setSuccess(true);
      console.log(success);
      window.location.href = `/${DESKTOP_APP_URL}`;
      window.location.href = `/`;
    } catch {
      setError('Something went wrong');
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <p className="text-gray-700">Already activated? Download the app.</p>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Download Desktop App
      </button>
    </form>
  );
}
