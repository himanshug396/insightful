export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Welcome to Insightful MVP</h1>
        <p className="mt-2 text-gray-600">Click below to download the desktop app</p>
        <a
          href="/download/Insightful-Client.dmg"
          className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded"
        >
          Download Desktop App
        </a>
      </div>
    </main>
  );
}
