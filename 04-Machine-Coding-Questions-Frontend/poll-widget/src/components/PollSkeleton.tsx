export function PollSkeleton() {
  return (
    <div className="bg-gray-100 p-6 rounded-xl max-w-md w-full animate-pulse">
      {/* Question skeleton */}
      <div className="h-8 bg-gray-300 rounded-lg w-3/4 mb-4" />

      <div className="space-y-4">
        {/* Option skeletons */}
        {[1, 2, 3].map((index) => (
          <div key={index} className="relative">
            <div className="flex items-center space-x-3">
              {/* Checkbox skeleton */}
              <div className="w-5 h-5 bg-gray-300 rounded" />

              {/* Text and votes skeleton */}
              <div className="flex-1 flex items-center justify-between">
                {/* Option text skeleton */}
                <div className="h-5 bg-gray-300 rounded w-1/3" />
                {/* Votes skeleton */}
                <div className="h-5 bg-gray-300 rounded w-24" />
              </div>
            </div>

            {/* Progress bar skeleton */}
            <div className="mt-2 h-full w-full bg-gray-200 rounded">
              <div
                className="h-full bg-gray-300 rounded"
                style={{
                  width: `${Math.random() * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
