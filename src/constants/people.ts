import { Person } from "@/types";
import { RECENT_PEOPLE } from "./people-recent";
import { EARLIER_PEOPLE } from "./people-earlier";

export const PEOPLE: Person[] = [...RECENT_PEOPLE, ...EARLIER_PEOPLE];
