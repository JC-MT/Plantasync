export function InfoCard({ children, hasSlider }: { children: React.ReactNode; hasSlider?: boolean }) {
  return (
    <div className={`grid rounded-lg bg-white shadow-md overflow-hidden w-full ${hasSlider ? "py-4 pl-4" : "p-4"}`}>
      {children}
    </div>
  );
}
