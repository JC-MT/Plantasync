export function meta() {
  return [
    { title: "About Page" },
    { name: "description", content: "This is the about page" }
  ];
}

export default function Index() {
  return <header>Hello World from About</header>;
}
