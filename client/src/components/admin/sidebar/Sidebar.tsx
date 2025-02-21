import styles from "./sidebar.module.css";
import LineStyleIcon from "@mui/icons-material/LineStyle";

export const Sidebar = () => {
  return (
    <aside className={styles.aside}>
      <div className={styles.sidebarMenu}>
        <h3 className={styles.sidebarTitle}>Suvestinė</h3>
        <ul className={styles.sidebarList}>
          <li className={styles.sidebarListItem}>
            <LineStyleIcon />
            Pradžia
          </li>
          <li className={styles.sidebarListItem}>
            <LineStyleIcon />
            Pradžia
          </li>
          <li className={styles.sidebarListItem}>
            <LineStyleIcon />
            Pradžia
          </li>
        </ul>
      </div>
    </aside>
  );
};
