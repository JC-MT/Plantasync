import { createCookie } from "react-router";

export const gardenDataExists = createCookie("garden-data-exists", {
  path: "/",
  sameSite: "lax",
  httpOnly: true,
  secure: true,
  secrets: ['mysecret'],
  maxAge: 604_800 // one week
});
