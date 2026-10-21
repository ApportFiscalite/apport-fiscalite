"use client";

import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { cn } from "@/lib/cn";

function Drawer(props: DrawerPrimitive.Root.Props) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

function DrawerClose(props: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerTitle(props: DrawerPrimitive.Title.Props) {
  return <DrawerPrimitive.Title data-slot="drawer-title" {...props} />;
}

type DrawerContentProps = Omit<DrawerPrimitive.Popup.Props, "className"> & { className?: string };

function DrawerContent({ className, children, ...props }: DrawerContentProps) {
  return (
    <DrawerPrimitive.Portal data-slot="drawer-portal">
      <DrawerPrimitive.Backdrop
        data-slot="drawer-overlay"
        className="fixed inset-0 z-60 min-h-dvh bg-foret/40 supports-backdrop-filter:backdrop-blur-xs"
      />
      <DrawerPrimitive.Viewport data-slot="drawer-viewport" className="pointer-events-none fixed inset-0 z-60">
        <DrawerPrimitive.Popup
          data-slot="drawer-popup"
          className={cn(
            "pointer-events-auto fixed inset-x-0 bottom-0 z-60 flex max-h-[calc(100dvh-3rem)] min-h-0 flex-col bg-foret text-gris outline-none lg:max-h-[calc(100dvh-6rem)]",
            className,
          )}
          {...props}
        >
          <DrawerPrimitive.Content
            data-slot="drawer-content"
            className="flex min-h-0 flex-1 flex-col overflow-hidden"
          >
            {children}
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPrimitive.Portal>
  );
}

export { Drawer, DrawerClose, DrawerContent, DrawerTitle };
