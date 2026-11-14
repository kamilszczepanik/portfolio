"use client";

import { WorkCards } from "./work-cards";
import { WorkStage } from "./work-stage";

export const WorkSection = () => (
  <section
    id="work"
    aria-label="Selected work"
    className="relative isolate bg-[radial-gradient(ellipse_at_80%_30%,rgba(59,130,246,0.12),transparent_60%)]"
  >
    <WorkStage />
    <WorkCards />
  </section>
);
