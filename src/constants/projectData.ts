import { Project } from "../types";
import { Metadata } from "next";

const projectCache = new Map<string, Project | null>();

export const slugToTitleMap: Record<string, string> = {
  "independent-ranking": "INRA - Independent Ranking",
  "e-commerce-platform": "E-commerce Platform",
  "dashboard-design-implementation": "Dashboard Design Implementation",
  "excel-clone": "Excel Clone",
  "apple-calculator": "Apple Calculator",
  "products-users-table": "Products & Users Table",
  "tic-tac-toe": "Tic Tac Toe",
  "uno-bots-multiplayer": "Uno Bots & Multiplayer",
  "nested-draggable-menu": "Nested & Draggable Menu",
  "meteorological-station": "Meteorological Station",
};

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
  "Dashboard Design Implementation": {
    id: 8,
    title: "Dashboard Design Implementation",
    imagesPaths: [
      "/images/dashboard-design-implementation/thumbnail.jpg",
      "/images/dashboard-design-implementation/dashboard-tables.jpg",
      "/images/dashboard-design-implementation/page-not-found.jpg",
    ],
    fileName: "dashboard-design-implementation.mdx",
    slug: "dashboard-design-implementation",
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

export type ProjectMetadata = {
  title: string;
  description: string;
  keywords: string[];
  metadata: Metadata;
};

export const projectsMetadata: Record<string, ProjectMetadata> = {
  "independent-ranking": {
    title: "INRA - Independent Ranking | Full-Stack Web Application",
    description:
      "A comprehensive ranking platform built with Remix.js and TypeScript, featuring filtering capabilities.",
    keywords: [
      "ranking platform",
      "educational analytics",
      "data visualization",
      "Remix.js",
      "TypeScript",
      "React",
      "real-time data",
      "interactive dashboard",
      "adding products",
      "adding reviews",
      "user settings",
      "products search",
      "product details",
      "reviews comments",
    ],
    metadata: {
      title: "INRA - Independent Ranking | Full-Stack Web Application",
      description:
        "Find and share the best products and reviews with the community.",
      openGraph: {
        title: "INRA - Independent Ranking Platform",
        description:
          "Find and share the best products and reviews with the community.",
      },
    },
  },
  "e-commerce-platform": {
    title: "Modern E-commerce Platform | Full-Stack Solution",
    description:
      "A scalable e-commerce platform built with Next.js, featuring real-time inventory management, secure payment processing, and an intuitive admin dashboard for product management.",
    keywords: [
      "e-commerce",
      "online store",
      "payment processing",
      "inventory management",
      "Next.js",
      "TypeScript",
      "admin dashboard",
    ],
    metadata: {
      title: "Modern E-commerce Platform | Full-Stack Solution",
      description:
        "A scalable e-commerce platform with real-time inventory management, secure payments, and an intuitive admin dashboard.",
      openGraph: {
        title: "Modern E-commerce Platform",
        description:
          "Complete e-commerce solution with advanced features and seamless user experience.",
      },
    },
  },
  "excel-clone": {
    title: "Excel Clone | Web-Based Spreadsheet Application",
    description: "A simple Excel clone built with React and TypeScript.",
    keywords: [
      "spreadsheet",
      "Excel clone",
      "web application",
      "React",
      "TypeScript",
      "formula evaluation",
      "data processing",
    ],
    metadata: {
      title: "Excel Clone | Web-Based Spreadsheet Application",
      description:
        "A simple web-based spreadsheet application with support for complex calculations and real-time formula evaluation.",
      openGraph: {
        title: "Excel Clone - Web Spreadsheet",
        description:
          "Simple spreadsheet application with Excel-like functionality in your browser.",
      },
    },
  },
  "apple-calculator": {
    title: "Apple Calculator Clone | React Implementation",
    description:
      "A pixel-perfect recreation of the Apple Calculator, built with React and TypeScript, featuring smooth animations and precise calculations.",
    keywords: [
      "calculator",
      "Apple clone",
      "React",
      "TypeScript",
      "UI/UX",
      "web application",
    ],
    metadata: {
      title: "Apple Calculator Clone | React Implementation",
      description:
        "Pixel-perfect recreation of the Apple Calculator with smooth animations and precise calculations.",
      openGraph: {
        title: "Apple Calculator Clone",
        description:
          "Experience the elegance of Apple's calculator design in a web application.",
      },
    },
  },
  "products-users-table": {
    title: "Products & Users Table | Advanced Data Management",
    description:
      "A sophisticated data management interface with real-time filtering, sorting, and editing capabilities, built with React and TypeScript.",
    keywords: [
      "data management",
      "table interface",
      "React",
      "TypeScript",
      "filtering",
      "sorting",
      "CRUD operations",
    ],
    metadata: {
      title: "Products & Users Table | Advanced Data Management",
      description:
        "Sophisticated data management interface with real-time filtering, sorting, and editing capabilities.",
      openGraph: {
        title: "Products & Users Table Manager",
        description:
          "Efficient data management solution with advanced filtering and editing features.",
      },
    },
  },
  "tic-tac-toe": {
    title: "Tic Tac Toe | Interactive Web Game",
    description:
      "A modern implementation of the classic Tic Tac Toe game with multiplayer capabilities.",
    keywords: [
      "game development",
      "Tic Tac Toe",
      "multiplayer",
      "React",
      "TypeScript",
      "web game",
    ],
    metadata: {
      title: "Tic Tac Toe | Interactive Web Game",
      description:
        "Modern implementation of Tic Tac Toe with multiplayer capabilities.",
      openGraph: {
        title: "Tic Tac Toe Game",
        description:
          "Play the classic game with friends in this modern web implementation.",
      },
    },
  },
  "uno-bots-multiplayer": {
    title: "UNO Bots & Multiplayer | Online Card Game",
    description:
      "A full-featured UNO card game implementation with AI bots and real-time multiplayer functionality, built using WebSocket technology.",
    keywords: [
      "UNO",
      "card game",
      "multiplayer",
      "AI bots",
      "WebSocket",
      "React",
      "TypeScript",
      "game development",
    ],
    metadata: {
      title: "UNO Bots & Multiplayer | Online Card Game",
      description:
        "Full-featured UNO card game with AI bots and real-time multiplayer functionality.",
      openGraph: {
        title: "UNO Online - Play with Bots or Friends",
        description:
          "Experience the classic UNO card game with intelligent bots or real players online.",
      },
    },
  },
  "nested-draggable-menu": {
    title: "Nested & Draggable Menu | Interactive UI Component",
    description:
      "A highly interactive menu component with drag-and-drop functionality and nested menu support, perfect for complex navigation systems.",
    keywords: [
      "UI component",
      "drag and drop",
      "nested menu",
      "React",
      "TypeScript",
      "interactive UI",
      "navigation",
    ],
    metadata: {
      title: "Nested & Draggable Menu | Interactive UI Component",
      description:
        "Advanced menu component with drag-and-drop functionality and nested menu support.",
      openGraph: {
        title: "Nested & Draggable Menu Component",
        description:
          "Create complex navigation systems with this interactive menu component.",
      },
    },
  },
  "meteorological-station": {
    title: "Meteorological Station | Weather Data Platform",
    description:
      "A comprehensive weather data platform featuring real-time monitoring, data visualization, and forecast management for meteorological stations.",
    keywords: [
      "weather data",
      "meteorological station",
      "data visualization",
      "forecasting",
      "React",
      "TypeScript",
      "real-time monitoring",
    ],
    metadata: {
      title: "Meteorological Station | Weather Data Platform",
      description:
        "Comprehensive weather data platform with real-time monitoring and forecast management.",
      openGraph: {
        title: "Meteorological Station Dashboard",
        description:
          "Professional weather monitoring and forecasting platform for meteorological stations.",
      },
    },
  },
};

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    if (projectCache.has(slug)) {
      const cachedProject = projectCache.get(slug);
      return cachedProject !== undefined ? cachedProject : null;
    }

    const title = slugToTitleMap[slug];

    if (!title) {
      projectCache.set(slug, null);
      return null;
    }

    const project = projectsData[title];

    if (!project) {
      projectCache.set(slug, null);
      return null;
    }

    projectCache.set(slug, project);
    return project;
  } catch (error) {
    console.error("Error getting project from cache:", error);
    return null;
  }
}

export async function prefetchProjects(slugs: string[]): Promise<void> {
  try {
    await Promise.all(slugs.map((slug) => getProjectBySlug(slug)));
  } catch (error) {
    console.error("Error prefetching projects:", error);
  }
}

export function clearProjectCache(): void {
  projectCache.clear();
}
