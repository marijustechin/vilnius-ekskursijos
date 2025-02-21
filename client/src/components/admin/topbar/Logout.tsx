import { useState } from "react";
import styles from "./logout.module.css";

export const Logout = () => {
  const [open, setOpen] = useState(false);

  const mouseOver = () => {
    setOpen(true);
    console.log(open);
  };

  const mouseOut = () => {
    setOpen(false);
    console.log(open);
  };

  return (
    <div className={styles.logoutContainer}>
      <img
        onMouseOver={mouseOver}
        onMouseOut={mouseOut}
        src="/avatar.jpg"
        alt="avataras"
        className={styles.topAvatar}
      />
      <div className={`${styles.logoutMenu} ${open && styles.hidden}`}>
        <div>Atsijungti</div>
      </div>
    </div>
  );
};
