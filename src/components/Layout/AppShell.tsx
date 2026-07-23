import type { ReactNode } from "react";

interface AppShellProps {
  builder: ReactNode;
  review?: ReactNode;
}

export function AppShell({ builder, review }: AppShellProps) {
  return (
    <div className="min-h-svh bg-background">
      <div className="mx-auto w-full max-w-330 py-5 md:px-6 md:py-8 lg:px-8 lg:py-10">
        <div className="flex flex-col md:gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(300px,380px)] lg:items-start lg:gap-8 xl:grid-cols-[minmax(0,1fr)_400px]">
          <div className="min-w-0 order-1">{builder}</div>
          <aside className="min-w-0 order-2 lg:sticky lg:top-6 lg:self-start">
            {review}
          </aside>
        </div>
      </div>
    </div>
  );
}
