import styles from "./topbar.module.css";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import { Logout } from "./Logout";

export const Topbar = () => {
  return (
    <div className={styles.topbar}>
      <div className={styles.topbarWrapper}>
        <div className={styles.topLeft}>
          <div className={styles.logo}>Admin</div>
        </div>
        <div className={styles.topRight}>
          <div className={styles.topbarIconContainer}>
            <NotificationsNoneRoundedIcon />
            <span className={styles.topbarIconBag}>12</span>
          </div>
          <div className={styles.topbarIconContainer}>
            <SettingsIcon />
          </div>
          <Logout />
        </div>
      </div>
    </div>
  );
};
