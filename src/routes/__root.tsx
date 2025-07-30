import { createRootRoute, Outlet } from "@tanstack/react-router";
import Home from "../Home/Home";
import App from "../App";

export const Route = createRootRoute({
  component: Outlet,
});