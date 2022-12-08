import { NavLink } from 'react-router-dom';
import Icon from '../icon/icon';
import css from './sidebar.module.scss';

/* eslint-disable-next-line */
export interface Link {
  title: string;
  url: string;
  icon?: {
    icon: string;
    size: number;
  }
}

export interface SidebarProps {
  links: Array<Link>
}

export function Sidebar(props: SidebarProps) {
  const { links } = props;

  return (
    <div className={css['container']}>
      {links && links.map((link, key) => {
        return(
          <div className={css['links-container']} key={key}>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${css['active-link']} ${css['link']}` : css['link']
              }
              to={link.url}
            >
              { link.icon && (
                <Icon
                  icon={link.icon.icon}
                  size={link.icon.size}
                  color="#302e52"
                />
              )}
              <h4 className="text-xs text-gray-700 font-medium" >{link.title}</h4>
            </NavLink>
          </div>
        )
      })}
    </div>
  );
}

export default Sidebar;
