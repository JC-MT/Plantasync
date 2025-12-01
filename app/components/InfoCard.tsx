export function InfoCard({ children, hasSlider }: { children: React.ReactNode; hasSlider?: boolean }) {
  return (
    <div className={`grid rounded-lg bg-white shadow-md overflow-hidden w-full ${hasSlider ? "py-5 pl-5" : "p-5"}`}>
      {children}
    </div>
  );
}
