import {
  type RouteConfig,
  route,
  index,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("add", "routes/plants/add.tsx"),
  route("account", "./routes/account.tsx"),
  ...prefix("plants", [
    index("routes/plants/index.tsx"),
    route(":id", "routes/plants/plant.tsx"),
  ]),
  ...prefix("explore", [
    index("routes/explore/index.tsx"),
    route(":id", "routes/explore/plant.tsx"),
  ]),
  ...prefix("api", [
    route("scan", "routes/api/scanner.ts"),
    route("/login", "routes/api/auth/login.ts"),
    route("/register", "routes/api/auth/register.ts"),
    route("/logout", "routes/api/auth/logout.ts"),
  ]),
] satisfies RouteConfig;
