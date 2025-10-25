import { Skeleton } from '@/components/ui/skeleton';

export default function GridSkeleton() {
  return (
    <div className="w-full grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4 sm:grid">
      <Skeleton className="h-124 rounded-lg" />
      <Skeleton className="h-124 rounded-lg" />
      <Skeleton className="h-124 rounded-lg" />
    </div>
  );
}
