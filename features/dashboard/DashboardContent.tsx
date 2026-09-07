'use client';

import { AccountMetricsHistory, useUserAccountMetricsHistory } from '@/shared/hooks/useDashboard';
import { useMemo } from 'react';
import DashboardGraphs from './DashboardGraphs';
import DashboardMetrics from './DashboardMetrics';

export default function DashboardContent() {
  const { data } = useUserAccountMetricsHistory({ monthsLimit: 6 });
  const accMetric: AccountMetricsHistory | undefined = useMemo(() => {
    if (data && data.length) return data[0];
    else return undefined;
  }, [data]);

  return (
    <>
      <DashboardMetrics accMetric={accMetric} />
      <DashboardGraphs />
    </>
  );
}
