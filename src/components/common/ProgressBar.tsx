'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  /** Current value (e.g. items completed) */
  current?: number;
  /** Total count (e.g. total items) */
  total?: number;
  /** Label above the bar */
  label?: string;
  /** Legacy: value 0–100 when used with max */
  value?: number;
  /** Legacy: max (default 100) */
  max?: number;
  /** Show percentage text (default true) */
  showValue?: boolean;
  className?: string;
}

const FILL_COLOR = '#3ECF8E';

export function ProgressBar({
  current,
  total,
  label,
  value,
  max = 100,
  showValue = true,
  className = '',
}: ProgressBarProps) {
  const percentage =
    total != null && current != null && total > 0
      ? Math.min(100, Math.max(0, (current / total) * 100))
      : value != null && max != null && max > 0
        ? Math.min(100, Math.max(0, (value / max) * 100))
        : 0;

  const displayValue = Math.round(percentage);
  const ariaValue = total != null && current != null ? current : value ?? 0;
  const ariaMax = total != null && total > 0 ? total : max;

  return (
    <div
      className={className}
      role="progressbar"
      aria-valuenow={ariaValue}
      aria-valuemin={0}
      aria-valuemax={ariaMax}
      aria-label={label}
    >
      {(label || showValue) && (
        <div className="mb-1 flex justify-between text-sm">
          {label && <span className="text-db-gray-400">{label}</span>}
          {showValue && (
            <span className="font-medium text-db-light">{displayValue}%</span>
          )}
        </div>
      )}
      <div className="h-3 overflow-hidden rounded-full bg-db-gray-700">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: FILL_COLOR }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
