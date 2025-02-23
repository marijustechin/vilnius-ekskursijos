import styles from './sidebar.module.css';
import { sidebarMenu } from './sidebarMenu';
import { Link } from 'react-router';

export const Sidebar = () => {
  return (
    <aside className={styles.aside}>
      <div className={styles.sidebarMenu}>
        <h3 className={styles.sidebarTitle}>Suvestinė</h3>
        <ul className={styles.sidebarList}>
          {sidebarMenu.map((item) => (
            <li key={item.href}>
              <Link className={styles.sidebarListItem} to={item.href}>
                {item.icon}
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
