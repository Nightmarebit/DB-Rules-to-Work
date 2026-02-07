'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { getProgressWithPercentage } from '@/lib/progress';
import { ProgressBar } from '@/components/common/ProgressBar';

export function HomeProgress() {
  const t = useTranslations('home');
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setPercentage(getProgressWithPercentage().percentage);
  }, []);

  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold text-db-light">
        {t('progressTitle')}
      </h2>
      <ProgressBar value={percentage} showValue />
    </section>
  );
}
