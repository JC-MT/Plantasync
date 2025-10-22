export default function Slider({ title, children }: React.PropsWithChildren<{ title: string }>) {
  return (
    <>
      <h3 className="font-semibold text-primary m-0">{title}</h3>
      <div className="flex gap-4 overflow-x-scroll w-full snap-always snap-x scrollbar-hide scroll-smooth pr-5">
        {children}
      </div>
    </>
  );
}
