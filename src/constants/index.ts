import { Project } from "../types";

type ProjectPreview = {
  id: number;
  title: string;
  thumbnailPath: string;
  slug: string;
};

// Only export minimal data needed for displaying project cards
export const FEATURED_PROJECTS: ProjectPreview[] = [
  {
    id: 1,
    title: "INRA - Independent Ranking",
    thumbnailPath: "/images/inra/rankings.jpg",
    slug: "independent-ranking",
  },
  {
    id: 2,
    title: "E-commerce Platform",
    thumbnailPath: "/images/e-commerce-platform/thumbnail.jpg",
    slug: "e-commerce-platform",
  },
];

export const OTHER_PROJECTS: ProjectPreview[] = [
  {
    id: 7,
    title: "Excel Clone",
    thumbnailPath: "/images/excel/example-calculations.jpg",
    slug: "excel-clone",
  },
  {
    id: 6,
    title: "Apple Calculator",
    thumbnailPath: "/images/apple-calculator/thumbnail.jpg",
    slug: "apple-calculator",
  },
  {
    id: 5,
    title: "Products & Users Table",
    thumbnailPath: "/images/products-users-table/users.jpg",
    slug: "products-users-table",
  },
  {
    id: 4,
    title: "Tic Tac Toe",
    thumbnailPath: "/images/tic-tac-toe/start-game.jpg",
    slug: "tic-tac-toe",
  },
  {
    id: 3,
    title: "Uno Bots & Multiplayer",
    thumbnailPath: "/images/uno-bots-and-multiplayer/game-in-progress.jpg",
    slug: "uno-bots-multiplayer",
  },
  {
    id: 2,
    title: "Nested & Draggable Menu",
    thumbnailPath: "/images/nested-draggable-menu/full-menu.jpg",
    slug: "nested-draggable-menu",
  },
  {
    id: 1,
    title: "Meteorological Station",
    thumbnailPath: "/images/meteorological-station/dashboard-add-forecast.png",
    slug: "meteorological-station",
  },
];
