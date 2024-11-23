import type { MetaFunction } from '@remix-run/cloudflare';

export const meta: MetaFunction = () => {
  return [];
};

export default function Index() {
  return (
    <div>
      <header></header>
      <nav></nav>
    </div>
  );
}
