import React from 'react';
import {useOutletContext} from 'react-router-dom';
import {VisitorsReportCharts} from '@common/admin/analytics/visitors-report-charts';
import {useAdminReport} from '@common/admin/analytics/use-admin-report';
import {AdminReportOutletContext} from '@app/admin/reports/mtdb-admin-report-page';

export function AdminVisitorsReport() {
  const {dateRange} = useOutletContext<AdminReportOutletContext>();
  const {data, isLoading, isPlaceholderData} = useAdminReport({
    types: ['visitors'],
    dateRange: dateRange,
  });
  return (
    <VisitorsReportCharts
      isLoading={isLoading || isPlaceholderData}
      report={data?.visitorsReport}
    />
  );
}
