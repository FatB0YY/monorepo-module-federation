import { Outlet } from "react-router-dom";
import * as styles from "./App.module.scss";

export const App = () => {
  return (
    <div className={styles.test}>
      ADMIN MODULE (ABOUT)
      <Outlet />
    </div>
  );
};
