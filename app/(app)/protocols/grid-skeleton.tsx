import { Skeleton } from '@/components/ui/skeleton';

export default function GridSkeleton() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
      <Skeleton className="h-124 rounded-lg" />
      <Skeleton className="h-124 rounded-lg" />
      <Skeleton className="h-124 rounded-lg" />
    </div>
  );
}
