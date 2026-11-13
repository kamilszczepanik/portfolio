import { CaseStudyMetric } from "@/types";
import { cn } from "@/lib/utils";

type MetricRowProps = {
  metrics: CaseStudyMetric[];
  className?: string;
};

type MetricValueProps = {
  metric: CaseStudyMetric;
};

const MetricValue = ({ metric }: MetricValueProps) =>
  metric.before ? (
    <>
      <span className="sr-only">from </span>
      {metric.before}
      <span aria-hidden="true"> → </span>
      <span className="sr-only"> to </span>
      {metric.after}
    </>
  ) : (
    metric.after
  );

export const MetricRow = ({ metrics, className }: MetricRowProps) => (
  <dl className={cn("grid grid-cols-1 gap-3 sm:grid-cols-2", className)}>
    {metrics.map((metric) => (
      <div
        key={metric.label}
        className="flex flex-col gap-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
      >
        <dt className="text-sm leading-snug text-neutral-300">
          {metric.label}
        </dt>
        <dd className="text-lg font-semibold leading-tight text-white sm:text-xl">
          <MetricValue metric={metric} />
        </dd>
      </div>
    ))}
  </dl>
);
