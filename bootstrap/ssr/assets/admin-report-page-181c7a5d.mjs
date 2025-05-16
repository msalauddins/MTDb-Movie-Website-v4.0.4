import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { u as useAdminReport, R as ReportDateSelector, A as AdminHeaderReport, V as VisitorsReportCharts } from "./admin-routes-06d8abf9.mjs";
import { l as StaticPageTitle, T as Trans } from "../server-entry.mjs";
import { D as DateRangePresets } from "./user-profile-link-0bca566c.mjs";
import "react-router-dom";
import "clsx";
import "framer-motion";
import "@react-stately/utils";
import "@tanstack/react-query";
import "./section-helper-708a2a0a.mjs";
import "./OpenInNew-3b47a656.mjs";
import "@react-aria/utils";
import "react-hook-form";
import "@internationalized/date";
import "zustand";
import "zustand/middleware";
import "zustand/middleware/immer";
import "deepmerge";
import "react-colorful";
import "@react-stately/color";
import "immer";
import "nanoid";
import "deep-object-diff";
import "dot-object";
import "@react-aria/focus";
import "nano-memoize";
import "@tanstack/react-virtual";
import "react-dom/server";
import "process";
import "http";
import "axios";
import "react-router-dom/server.mjs";
import "slugify";
import "@floating-ui/react-dom";
import "react-merge-refs";
import "react-dom";
import "@internationalized/number";
import "@react-aria/ssr";
import "axios-retry";
import "tus-js-client";
import "react-use-cookie";
import "mime-match";
import "react-use-clipboard";
import "fscreen";
import "zustand/traditional";
import "@react-aria/interactions";
function AdminReportPage() {
  const [dateRange, setDateRange] = useState(() => {
    return DateRangePresets[2].getRangeValue();
  });
  const { isLoading, data } = useAdminReport({ dateRange });
  const title = /* @__PURE__ */ jsx(Trans, { message: "Visitors report" });
  return /* @__PURE__ */ jsxs("div", { className: "min-h-full gap-12 overflow-x-hidden p-12 md:gap-18 md:p-18", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-24 items-center justify-between gap-24 md:flex", children: [
      /* @__PURE__ */ jsx(StaticPageTitle, { children: title }),
      /* @__PURE__ */ jsx("h1", { className: "mb-24 text-3xl font-light md:mb-0", children: title }),
      /* @__PURE__ */ jsx(ReportDateSelector, { value: dateRange, onChange: setDateRange })
    ] }),
    /* @__PURE__ */ jsx(AdminHeaderReport, { report: data == null ? void 0 : data.headerReport }),
    /* @__PURE__ */ jsx(
      VisitorsReportCharts,
      {
        report: data == null ? void 0 : data.visitorsReport,
        isLoading
      }
    )
  ] });
}
export {
  AdminReportPage as default
};
//# sourceMappingURL=admin-report-page-181c7a5d.mjs.map
