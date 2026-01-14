"use client";
import { Drawer } from "vaul";
import { useState, type ReactNode } from "react";
import { Spiral as Hamburger } from "hamburger-react";

interface VaulDrawerProps {
  customTrigger?: ReactNode;
  children:
    | ReactNode
    | ((props: {
        isOpen: boolean;
        setIsOpen: (open: boolean) => void;
      }) => ReactNode);
  direction: "left" | "right" | "top" | "bottom";
  isModal: boolean;
  contentClassName?: string;
  overlayClassName?: string;
  useCustomOverlay: boolean;
  title?: string;
}

export default function VaulDrawer({
  customTrigger,
  children,
  direction = "top",
  isModal = true,
  contentClassName = "",
  overlayClassName = "",
  useCustomOverlay = false,
  title = "Drawer",
}: VaulDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const defaultContentClass =
    "bg-white flex flex-col rounded-b-lg h-fit fixed left-0 right-0 outline-none z-20";
  const defaultOverlayClass = "fixed inset-0 bg-black/40 backdrop-blur-lg z-20";
  const trigger = customTrigger || (
    <figure
      className="md:hidden"
      aria-label={`${isOpen ? "Close" : "Open"} navigation menu`}
    >
      <Hamburger
        size={28}
        duration={0.2}
        toggled={isOpen}
        onToggle={setIsOpen}
      />
    </figure>
  );

  return (
    <Drawer.Root
      direction={direction}
      open={isOpen}
      onOpenChange={setIsOpen}
      modal={isModal}
    >
      <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className={overlayClassName || defaultOverlayClass} />
        <Drawer.Content className={contentClassName || defaultContentClass}>
          <Drawer.Title className='sr-only'>{title}</Drawer.Title>
          {typeof children === "function"
            ? children({ isOpen, setIsOpen })
            : children}
        </Drawer.Content>
        {useCustomOverlay && (
          <div
            className={`${isOpen ? "fixed inset-0 bg-black/40 backdrop-blur-lg z-10 top-14" : "hidden"}`}
            onClick={() => setIsOpen(false)}
          ></div>
        )}
      </Drawer.Portal>
    </Drawer.Root>
  );
}
