'use client';

export function CardSkeleton() {
  return (
    <div
      className="animate-pulse rounded-xl border border-db-gray-700 bg-db-gray-800/50 p-6 shadow-lg"
      aria-hidden
    >
      <div className="h-6 w-3/4 rounded bg-db-gray-700" />
      <div className="mt-3 h-4 w-full rounded bg-db-gray-700" />
      <div className="mt-2 h-4 w-5/6 rounded bg-db-gray-700" />
      <div className="mt-4 flex gap-2">
        <div className="h-12 w-24 rounded-lg bg-db-gray-700" />
        <div className="h-12 w-24 rounded-lg bg-db-gray-700" />
      </div>
    </div>
  );
}
