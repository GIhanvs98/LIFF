import { useState } from 'react';

interface PlainLoginProps {
  onSubmit: (profile: { displayName: string; pictureUrl?: string }) => void;
}

export function PlainLogin({ onSubmit }: PlainLoginProps) {
  const [displayName, setDisplayName] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [errors, setErrors] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!displayName.trim()) {
      setErrors('Please enter your name to continue.');
      return;
    }

    setErrors(null);
    onSubmit({
      displayName: displayName.trim(),
      pictureUrl: pictureUrl.trim() || undefined
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
      <div className="w-full max-w-md space-y-6 rounded-3xl bg-slate-900 p-8 shadow-xl ring-1 ring-slate-800">
        <div>
          <h1 className="text-2xl font-semibold text-white">Log in</h1>
          <p className="mt-2 text-sm text-slate-400">
            Enter your name to explore the restaurant menu. This screen appears
            when LIFF login is not available (e.g., local development).
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="displayName"
              className="block text-sm font-medium text-slate-300"
            >
              Display name
            </label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-white shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Jane Doe"
            />
          </div>

          <div>
            <label
              htmlFor="pictureUrl"
              className="block text-sm font-medium text-slate-300"
            >
              Profile picture URL (optional)
            </label>
            <input
              id="pictureUrl"
              name="pictureUrl"
              type="url"
              value={pictureUrl}
              onChange={(event) => setPictureUrl(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-white shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://example.com/avatar.png"
            />
          </div>

          {errors && (
            <p className="text-sm text-red-400" role="alert">
              {errors}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

