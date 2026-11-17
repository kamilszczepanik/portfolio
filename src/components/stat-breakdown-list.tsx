import { StatBreakdown } from "@/types";

type StatBreakdownListProps = {
  breakdown: StatBreakdown;
};

export const StatBreakdownList = ({ breakdown }: StatBreakdownListProps) => (
  <div className="text-left">
    <p className="text-sm font-semibold text-white">{breakdown.intro}</p>
    <dl className="mt-2 divide-y divide-white/10">
      {breakdown.rows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-[4.75rem_minmax(0,1fr)] gap-x-3 py-2.5"
        >
          <dt className="text-right text-sm font-bold text-primary-light tabular-nums">
            {row.value}
          </dt>
          <dd className="text-sm leading-snug text-neutral-300">{row.label}</dd>
        </div>
      ))}
    </dl>
    <p className="mt-2 border-t border-white/10 pt-3 text-xs leading-relaxed text-white/60">
      {breakdown.note}
    </p>
  </div>
);
