import React from 'react';
import {InsightsAsyncChart} from '@app/admin/reports/insights/insights-async-chart';
import {GeoChart} from '@common/admin/analytics/geo-chart/geo-chart';

export function InsightsLocationsChart() {
  return (
    <InsightsAsyncChart metric="locations">
      <GeoChart className="flex-auto w-1/2 lg:max-w-[740px]" />
    </InsightsAsyncChart>
  );
}
