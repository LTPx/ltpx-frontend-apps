import { NavLink } from 'react-router-dom';
import Icon from '../icon/icon';
import css from './nav.module.scss';

/* eslint-disable-next-line */
export interface Link {
  title: string;
  url: string;
  icon?: {
    icon: string;
    size: number;
  }
}

export interface NavbarProps {
  links: Array<Link>
}

export function Nav(props: NavbarProps) {
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

export default Nav;
