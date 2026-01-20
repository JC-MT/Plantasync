export default function PageContainer({
  children,
  className = "",
  props,
}: {
  children: React.ReactNode;
  className?: string;
  props?: React.HTMLAttributes<HTMLElement>;
}) {
  return (
    <section
      className={`max-w-7xl mx-auto px-4 lg:px-16 py-5 text-dark-green ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
