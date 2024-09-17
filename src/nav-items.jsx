import { HomeIcon, RedditIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import RedditPosts from "./pages/RedditPosts.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Reddit Posts",
    to: "/reddit-posts",
    icon: <RedditIcon className="h-4 w-4" />,
    page: <RedditPosts />,
  },
];
