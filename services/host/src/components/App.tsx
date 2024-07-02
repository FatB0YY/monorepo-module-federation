import { Outlet } from "react-router-dom";
import * as styles from "./App.module.scss";
import { Link } from "react-router-dom";
import { adminRoutes, Header, shopRoutes } from "@packages/shared";

export const App = () => {
  return (
    <div className={styles.test}>
      <Header />
      <h1>PAGE</h1>
      <Link to={adminRoutes.about}>ABOUT</Link>
      <Link to={shopRoutes.main}>SHOP</Link>
      <Link to={shopRoutes.second}>SHOP second</Link>
      <Outlet />
    </div>
  );
};
