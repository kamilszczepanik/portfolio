"use client";

import { ShippedAtWork } from "./shipped-at-work";
import { WorkCards } from "./work-cards";
import { WorkStage } from "./work-stage";

export const WorkSection = () => (
  <section id="work" aria-label="Selected work" className="relative isolate">
    <WorkStage />
    <WorkCards />
    <ShippedAtWork />
  </section>
);
