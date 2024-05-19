import { ReactElement } from 'react';
import { Sidebar as ReactSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { HiDocument, HiUser } from 'react-icons/hi';
import styles from './Sidebar.module.scss';

function Sidebar(): ReactElement {
  const height = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );

  return (
    <div className={styles.sidebar} style={{ height: `${height}px` }}>
      <ReactSidebar collapsed={true}>
        <Menu
          menuItemStyles={{
            button: {
              [`&.active`]: {
                backgroundColor: '#13395e',
                color: '#b6c8d9',
              },
            },
          }}
        >
          <MenuItem icon={<HiUser />} component={<Link to="/profile" />}>
            Профиль
          </MenuItem>
          <MenuItem icon={<HiDocument />} component={<Link to="/inventory" />}>
            Оборудование
          </MenuItem>
        </Menu>
      </ReactSidebar>
    </div>
  );
}

export default Sidebar;
