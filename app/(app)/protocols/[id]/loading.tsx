import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <section className="max-w-a4 relative mx-auto w-full">
      <div className="mb-8">
        {/* Protocol title skeleton */}
        <Skeleton className="mb-2 h-10 w-3/4" />
        {/* Date and author info skeleton */}
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="mt-1 h-4 w-2/3" />
      </div>
      {/* Editor content skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-4/5" />
      </div>
    </section>
  );
}
