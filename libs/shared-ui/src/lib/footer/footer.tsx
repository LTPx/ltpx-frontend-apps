import { NavLink } from 'react-router-dom';
import Icon from '../icon/icon';
import styles from './footer.module.scss';

export interface FooterLink {
  text: string;
  url: string;
}
export interface FooterProps {
  companyLinks: Array<FooterLink>;
  supportLinks: Array<FooterLink>;
}

export function Footer(props: FooterProps) {
  const { companyLinks, supportLinks } = props;
  return (
    <div className={styles['container']}>
      <div className={styles['footer-content']}>
        <div className={styles['company-information']}>
          <div className={styles['icon-content']}>
            <label>LTPX</label>
          </div>
          <div className={styles['information-one']}>
            <label>
              Calle de Covarrubias y 142301 Ravenswood, Madrid - Spain.
            </label>
            <label>123 456 7890</label>
            <label>support@ltpx.com</label>
          </div>
          <div className={styles['social-networks']}>
            <Icon
              className={styles['social']}
              icon="link"
              size={20}
              color="white"
            />
            <Icon
              className={styles['social']}
              icon="home"
              size={20}
              color="white"
            />
            <Icon
              className={styles['social']}
              icon="heart"
              size={20}
              color="white"
            />
          </div>
        </div>
        <div className={styles['site-links']}>
          <div className={styles['links']}>
            <label className={styles['title']}>Our Company</label>
            {companyLinks.map((link, index) => (
              <NavLink className={styles['link']} to={link.url} key={index}>
                {link.text}
              </NavLink>
            ))}
          </div>
          <div className={styles['links']}>
            <label className={styles['title']}>Support</label>
            {supportLinks.map((link, index) => (
              <NavLink className={styles['link']} to={link.url} key={index}>
                {link.text}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      <div className={styles['footer-end']}>
        <div className={styles['information-end-container']}>
          <label>Copyright © 2022 Creative Layers All Right Reserved</label>
          <label>Terms & Conditions</label>
          <label>Privacy policy</label>
          <label>Sitemap</label>
        </div>
      </div>
    </div>
  );
}

export default Footer;
