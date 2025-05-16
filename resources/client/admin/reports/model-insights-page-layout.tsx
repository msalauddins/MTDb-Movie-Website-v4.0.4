import React, {
  cloneElement,
  Fragment,
  ReactElement,
  ReactNode,
  useState,
} from 'react';
import {DateRangeValue} from '@common/ui/forms/input-field/date/date-range-picker/date-range-value';
import {DateRangePresets} from '@common/ui/forms/input-field/date/date-range-picker/dialog/date-range-presets';
import {ReportDateSelector} from '@common/admin/analytics/report-date-selector';
import {Trans} from '@common/i18n/trans';
import {InsightsChartsContext} from '@app/admin/reports/insights/insights-charts-context';
import {IconButton} from '@common/ui/buttons/icon-button';
import {ArrowBackIcon} from '@common/icons/material/ArrowBack';
import {Link} from 'react-router-dom';
import {StaticPageTitle} from '@common/seo/static-page-title';

interface Props {
  children: ReactNode;
  reportModel: string;
  name: string;
  backLink?: string;
  title?: ReactElement;
}
export function ModelInsightsPageLayout({
  children,
  reportModel,
  title,
  name,
  backLink,
}: Props) {
  const [dateRange, setDateRange] = useState<DateRangeValue>(() => {
    // This week
    return DateRangePresets[2].getRangeValue();
  });
  return (
    <Fragment>
      <StaticPageTitle>
        <Trans message=":name insights" values={{name}} />
      </StaticPageTitle>
      <div className="h-full flex flex-col">
        <div className="flex-auto bg-cover relative">
          <div className="min-h-full p-12 md:p-24 overflow-x-hidden max-w-[1600px] mx-auto flex flex-col">
            <div className="flex-auto">
              <div className="md:flex items-center gap-12 h-48 mt-14 mb-38">
                <IconButton
                  elementType={Link}
                  to={backLink || '../../'}
                  relative="path"
                  className="text-muted"
                >
                  <ArrowBackIcon />
                </IconButton>
                {title}
                <div className="ml-auto flex-shrink-0 flex items-center justify-between gap-10 md:gap-24">
                  <ReportDateSelector
                    value={dateRange}
                    onChange={setDateRange}
                  />
                </div>
              </div>
              <InsightsChartsContext.Provider
                value={{dateRange, model: reportModel}}
              >
                {children}
              </InsightsChartsContext.Provider>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

interface ModelInsightsPageTitleProps {
  image: ReactElement<{size: string; className: string}>;
  name: ReactElement;
  description?: ReactElement;
}
export function ModelInsightsPageTitle({
  image,
  name,
  description,
}: ModelInsightsPageTitleProps) {
  return (
    <div className="flex items-center gap-10">
      {cloneElement(image, {size: 'w-48 h-48', className: 'rounded'})}
      <div>
        <h1 className="text-base whitespace-nowrap overflow-hidden overflow-ellipsis">
          “{name}“ <Trans message="insights" />
        </h1>
        {description && <div className="text-muted text-sm">{description}</div>}
      </div>
    </div>
  );
}
