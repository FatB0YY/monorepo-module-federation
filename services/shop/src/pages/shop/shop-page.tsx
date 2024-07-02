import { shopRoutes } from "@packages/shared";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div>
      <h1>Shop!</h1>
      <Link to={shopRoutes.second}>Second page</Link>
    </div>
  );
}
