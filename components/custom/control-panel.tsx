'use client';

export default function ControlPanel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed right-2 bottom-2 md:right-6 md:bottom-6">
      <div className="flex gap-2">{children}</div>
    </div>
  );
}
