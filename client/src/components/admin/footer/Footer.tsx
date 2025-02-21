import { Link } from "react-router";
import styles from "./footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link to={"/"}>Home page</Link>
    </footer>
  );
};
