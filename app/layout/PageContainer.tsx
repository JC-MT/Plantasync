export default function PageContainer({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-16 pb-5 sm:pt-5 text-dark-green">
      {children}
    </section>
  );
}
