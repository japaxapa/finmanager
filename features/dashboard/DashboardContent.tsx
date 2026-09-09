'use client';

import { AccountMetricsHistory, useUserAccountMetricsHistory } from '@/shared/hooks/useDashboard';
import { useMemo } from 'react';
import DashboardGraphs from './DashboardGraphs';
import DashboardMetrics from './DashboardMetrics';
import { useMonthlyCategoriesExpenses } from '@/shared/hooks/useCategories';

export default function DashboardContent() {
  const { data: accMetricData } = useUserAccountMetricsHistory({ monthsLimit: 6 });
  const accMetric: AccountMetricsHistory | undefined = useMemo(() => {
    if (accMetricData && accMetricData.length) return accMetricData[0];
    else return undefined;
  }, [accMetricData]);

  const { data: pieGraphData } = useMonthlyCategoriesExpenses();

  return (
    <>
      <DashboardMetrics accMetric={accMetric} />
      <DashboardGraphs accHistory={accMetricData} expensesByCategory={pieGraphData} />
    </>
  );
}
