interface BannerProps {
  name?: string;
  pictureUrl?: string;
}

export function Banner({ name, pictureUrl }: BannerProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-primary to-primary-light/80 p-6 text-slate-900 shadow-lg">
      {pictureUrl ? (
        <img
          src={pictureUrl}
          alt={name ?? 'Guest'}
          className="h-16 w-16 rounded-full border-2 border-white object-cover shadow-md"
        />
      ) : (
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white bg-white text-2xl font-semibold shadow-md">
          {(name ?? 'Guest').slice(0, 1).toUpperCase()}
        </div>
      )}
      <div>
        <p className="text-sm uppercase tracking-wide text-slate-700">
          Welcome back
        </p>
        <h1 className="text-2xl font-semibold">
          {name ? `Welcome, ${name}!` : 'Welcome to Green Leaf Bistro!'}
        </h1>
        <p className="text-sm text-slate-700">
          Explore the menu and place your order right here in LINE.
        </p>
      </div>
    </div>
  );
}

