import { Link } from "react-router";
import logo from "/android-chrome-192x192.png";

export const Logo = () => {
  return (
    <Link to={"/"}>
      <img className="h-14" src={logo} alt="logo" />
    </Link>
  );
};
