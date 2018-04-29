import App from "../views/App/App";
import UserProfile from "../views/UserProfile/UserProfile";
import Callback from "../views/Callback/Callback";

const appRoutes = [
  {
    path: "/app",
    name: "Paintify",
    component: App
  },
  {
    path: "/user",
    name: "User Profile",
    component: UserProfile
  },
  { redirect: true, path: "/", to: "/app", name: "Paintify" }
];

export default appRoutes;
