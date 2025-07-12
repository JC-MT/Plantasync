"use client";
import { useState } from "react";
import { Drawer } from "vaul";
import { Spiral as Hamburger } from "hamburger-react";

interface VaulDrawerProps {
  isModal: boolean;
  direction: "left" | "right" | "top" | "bottom";
}

export default function VaulDrawer({ isModal, direction }: VaulDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Drawer.Root
        direction={direction}
        open={isOpen}
        onOpenChange={setIsOpen}
        modal={isModal}
      >
        <Drawer.Trigger className="md:hidden">
          <Hamburger toggled={isOpen} size={28} duration={0.2} />
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Content className="bg-white flex flex-col rounded-b-xl fixed top-0 left-0 right-0 outline-none z-20 translate-y-14">
            <div className="p-4  bg-white flex-1">
              <div className="max-w-md mx-auto">
                <Drawer.Title className="font-medium mb-4 text-gray-900">
                  Drawer for React.
                </Drawer.Title>
                <p className="text-gray-600 mb-2">
                  This component can be used as a Dialog replacement on mobile
                  and tablet devices. You can read about why and how it was
                  built .
                </p>
                <p className="text-gray-600 mb-2">
                  This one specifically is the most simplest setup you can have,
                  just a simple drawer with a trigger.
                </p>
              </div>
            </div>
            <div
              aria-hidden
              className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 my-8"
            />
          </Drawer.Content>
          <div
            className={`${isOpen ? "fixed inset-0 bg-black/40 backdrop-blur-lg z-10 top-14" : "hidden"}`}
            onClick={() => setIsOpen(false)}
          ></div>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}
