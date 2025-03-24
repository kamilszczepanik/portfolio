import { Project } from "../types";

// Map slug to project title for easy lookup
export const slugToTitleMap: Record<string, string> = {
  "independent-ranking": "INRA - Independent Ranking",
  "e-commerce-platform": "E-commerce Platform",
  "excel-clone": "Excel Clone",
  "apple-calculator": "Apple Calculator",
  "products-users-table": "Products & Users Table",
  "tic-tac-toe": "Tic Tac Toe",
  "uno-bots-multiplayer": "Uno Bots & Multiplayer",
  "nested-draggable-menu": "Nested & Draggable Menu",
  "meteorological-station": "Meteorological Station",
};

// This contains all project data
export const projectsData: Record<string, Project> = {
  "INRA - Independent Ranking": {
    id: 1,
    title: "INRA - Independent Ranking",
    imagesPaths: [
      "/images/inra/rankings.jpg",
      "/images/inra/product-details.jpg",
      "/images/inra/add-product.jpg",
      "/images/inra/products-search.jpg",
      "/images/inra/reviews-added.jpg",
      "/images/inra/reviews-comments.jpg",
      "/images/inra/add-review.jpg",
      "/images/inra/user-settings.jpg",
    ],
    fileName: "inra.mdx",
    slug: "independent-ranking",
  },
  "E-commerce Platform": {
    id: 2,
    title: "E-commerce Platform",
    imagesPaths: [
      "/images/e-commerce-platform/thumbnail.jpg",
      "/images/e-commerce-platform/front-page.jpeg",
      "/images/e-commerce-platform/products.jpeg",
      "/images/e-commerce-platform/product-details.jpeg",
      "/images/e-commerce-platform/shopping-cart.jpeg",
      "/images/e-commerce-platform/order-in-progress.jpeg",
      "/images/e-commerce-platform/order-payment.jpeg",
    ],
    fileName: "e-commerce-platform.mdx",
    slug: "e-commerce-platform",
  },
  "Excel Clone": {
    id: 7,
    title: "Excel Clone",
    imagesPaths: ["/images/excel/example-calculations.jpg"],
    fileName: "excel.mdx",
    slug: "excel-clone",
  },
  "Apple Calculator": {
    id: 6,
    title: "Apple Calculator",
    videoPath: "/videos/apple-calculator-demo.mov",
    imagesPaths: ["/images/apple-calculator/thumbnail.jpg"],
    fileName: "apple-calculator.mdx",
    slug: "apple-calculator",
  },
  "Products & Users Table": {
    id: 5,
    title: "Products & Users Table",
    videoPath: "/videos/products-users-table-demo.mov",
    imagesPaths: [
      "/images/products-users-table/users.jpg",
      "/images/products-users-table/products.jpg",
    ],
    fileName: "products-and-users-table.mdx",
    slug: "products-users-table",
  },
  "Tic Tac Toe": {
    id: 4,
    title: "Tic Tac Toe",
    videoPath: "/videos/tic-tac-toe-demo.mov",
    imagesPaths: [
      "/images/tic-tac-toe/start-game.jpg",
      "/images/tic-tac-toe/3x3-game-finish.jpg",
      "/images/tic-tac-toe/big-game.jpg",
    ],
    fileName: "tic-tac-toe.mdx",
    slug: "tic-tac-toe",
  },
  "Uno Bots & Multiplayer": {
    id: 3,
    title: "Uno Bots & Multiplayer",
    videoPath: "/videos/uno-bots-and-multiplayer-demo.mov",
    imagesPaths: [
      "/images/uno-bots-and-multiplayer/game-in-progress.jpg",
      "/images/uno-bots-and-multiplayer/game-setup.jpg",
      "/images/uno-bots-and-multiplayer/select-color.jpg",
      "/images/uno-bots-and-multiplayer/game-over.jpg",
      "/images/uno-bots-and-multiplayer/multiplayer-login.jpg",
      "/images/uno-bots-and-multiplayer/multiplayer-dashboard.jpg",
      "/images/uno-bots-and-multiplayer/multiplayer-game-in-progress.jpg",
      "/images/uno-bots-and-multiplayer/tests-passed.jpg",
    ],
    fileName: "uno-bots-and-multiplayer.mdx",
    slug: "uno-bots-multiplayer",
  },
  "Nested & Draggable Menu": {
    id: 2,
    title: "Nested & Draggable Menu",
    videoPath: "/videos/nested-draggable-menu-demo.mov",
    imagesPaths: [
      "/images/nested-draggable-menu/full-menu.jpg",
      "/images/nested-draggable-menu/empty-menu.jpg",
    ],
    fileName: "nested-and-draggable-menu.mdx",
    slug: "nested-draggable-menu",
  },
  "Meteorological Station": {
    id: 1,
    title: "Meteorological Station",
    imagesPaths: [
      "/images/meteorological-station/dashboard-add-forecast.png",
      "/images/meteorological-station/add-forecast-form.png",
      "/images/meteorological-station/dashboard-delete-forecast.png",
      "/images/meteorological-station/delete-forecast-confirmation.png",
      "/images/meteorological-station/weather-history.png",
    ],
    fileName: "meteorological-station.mdx",
    slug: "meteorological-station",
  },
};

/**
 * Get project data by slug
 * @param slug The project slug
 * @returns Project data or null if not found
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    // Look up the title for this slug
    const title = slugToTitleMap[slug];

    if (!title) {
      console.warn(`No project found with slug: ${slug}`);
      return null;
    }

    // Get project data using the title
    const project = projectsData[title];

    if (!project) {
      console.warn(`Project data not found for title: ${title}`);
      return null;
    }

    // Simulate async loading for smoother UI experience
    await new Promise((resolve) => setTimeout(resolve, 300));

    return project;
  } catch (error) {
    console.error(`Error getting project by slug ${slug}:`, error);
    return null;
  }
}
