import { Links, Meta, Outlet, Scripts } from '@remix-run/react';
import './styles/tailwind.css';

export default function App() {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <title>Vite + Remix + TS</title>
        <Meta />
        <Links />
      </head>
      <body>
        <h1 className="bg-red-500 text-xl">Hello world!</h1>
        <Outlet />

        <Scripts />
      </body>
    </html>
  );
}
