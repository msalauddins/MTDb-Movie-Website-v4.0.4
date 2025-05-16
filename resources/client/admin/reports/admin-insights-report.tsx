import React from 'react';
import {useOutletContext} from 'react-router-dom';
import {AdminReportOutletContext} from '@app/admin/reports/mtdb-admin-report-page';
import {InsightsReportRow} from '@app/admin/reports/insights/insights-report-row';
import {InsightsPlaysChart} from '@app/admin/reports/insights/insights-plays-chart';
import {InsightsDevicesChart} from '@app/admin/reports/insights/insights-devices-chart';
import {InsightsSeriesChart} from '@app/admin/reports/insights/insights-series-chart';
import {InsightsMoviesChart} from '@app/admin/reports/insights/insights-movies-chart';
import {InsightsVideosChart} from '@app/admin/reports/insights/insights-videos-chart';
import {InsightsUsersChart} from '@app/admin/reports/insights/insights-users-chart';
import {InsightsLocationsChart} from '@app/admin/reports/insights/insights-locations-chart';
import {InsightsPlatformsChart} from '@app/admin/reports/insights/insights-platforms-chart';
import {InsightsChartsContext} from '@app/admin/reports/insights/insights-charts-context';

export function AdminInsightsReport() {
  const {dateRange} = useOutletContext<AdminReportOutletContext>();
  const model = 'video_play=0';

  return (
    <InsightsChartsContext.Provider value={{dateRange, model}}>
      <InsightsReportRow>
        <InsightsPlaysChart />
        <InsightsDevicesChart />
      </InsightsReportRow>
      <InsightsReportRow>
        <InsightsSeriesChart />
        <InsightsMoviesChart />
      </InsightsReportRow>
      <InsightsReportRow>
        <InsightsVideosChart />
        <InsightsUsersChart />
      </InsightsReportRow>
      <InsightsReportRow>
        <InsightsLocationsChart />
        <InsightsPlatformsChart />
      </InsightsReportRow>
    </InsightsChartsContext.Provider>
  );
}
