"use client";

import { GridGlowBackdrop } from "./grid-glow-backdrop";
import { WorkCards } from "./work-cards";
import { WorkStage } from "./work-stage";

export const WorkSection = () => (
  <section id="work" aria-label="Selected work" className="relative isolate">
    <GridGlowBackdrop side="right" />
    <WorkStage />
    <WorkCards />
  </section>
);
