'use client';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = true,
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={className} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label={label}>
      {(label || showValue) && (
        <div className="mb-1 flex justify-between text-sm">
          {label && <span className="text-db-gray-400">{label}</span>}
          {showValue && (
            <span className="font-medium text-db-light">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className="h-3 overflow-hidden rounded-full bg-db-gray-700">
        <div
          className="h-full rounded-full bg-db-green transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
