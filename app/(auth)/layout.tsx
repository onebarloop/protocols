export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-dvh items-center justify-center">
      <div className="w-full max-w-md rounded-lg border p-4">{children}</div>
    </div>
  );
}
