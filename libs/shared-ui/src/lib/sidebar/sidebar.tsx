import { NavLink } from 'react-router-dom';
import styles from './sidebar.module.scss';

/* eslint-disable-next-line */
export interface Link {
  icon?: string;
  title: string;
  url: string;
}

export interface SidebarProps {
  links: Array<Link>
}

export function Sidebar(props: SidebarProps) {
  const { links } = props;

  return (
    <div className="sidebar-doyoh bg-white">
      {links && links.map((link, key) => {
        return(
          <div className="w-20" key={key}>
            <NavLink
              className="flex items-center flex-col bg-white hover:bg-gray-200 py-4 relative"
              to={link.url}
            >
              {/* <Icon
                name={link.icon.name}
                size={link.icon.size || '30px'}
                color={link.icon.color || '#4a5568'}
              /> */}
              <h1 className="text-xs text-gray-700 font-medium" >{link.title}</h1>
            </NavLink>
          </div>
        )
      })}
    </div>
  );
}

export default Sidebar;
