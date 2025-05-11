import {
  type RouteConfig,
  route,
  index,
  prefix,
  layout
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("./routes/auth/layout.tsx", [
    route("login", "./routes/auth/login.tsx"),
    route("register", "./routes/auth/register.tsx")
  ]),
  ...prefix("plants", [
    index("routes/plants/index.tsx"),
    route(":id", "routes/plants/plant.tsx"),
    route(":id/edit", "routes/plants/edit.tsx"),
    route("add", "routes/plants/add.tsx")
  ]),
  ...prefix("explore", [
    index("routes/explore/index.tsx"),
    route(":id", "routes/explore/plant.tsx")
  ])
] satisfies RouteConfig;
