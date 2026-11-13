import { CaseStudyMetric } from "@/types";
import { cn } from "@/lib/utils";

type MetricRowProps = {
  metrics: CaseStudyMetric[];
  className?: string;
};

const formatMetricValue = ({ before, after }: CaseStudyMetric) =>
  before ? `${before} → ${after}` : after;

export const MetricRow = ({ metrics, className }: MetricRowProps) => (
  <dl className={cn("grid grid-cols-1 gap-3 sm:grid-cols-2", className)}>
    {metrics.map((metric) => (
      <div
        key={metric.label}
        className="flex flex-col-reverse gap-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
      >
        <dt className="text-sm leading-snug text-neutral-300">
          {metric.label}
        </dt>
        <dd className="text-lg font-semibold leading-tight text-white sm:text-xl">
          {formatMetricValue(metric)}
        </dd>
      </div>
    ))}
  </dl>
);
