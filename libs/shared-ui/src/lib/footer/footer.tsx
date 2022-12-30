import { NavLink } from 'react-router-dom';
import Brand from '../brand/brand';
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
            <Brand negativeSpace={true} />
          </div>
          <div className={styles['information-one']}>
            <p>Calle de Covarrubias y 142301 Ravenswood, Madrid - Spain.</p>
            <h4>123 456 7890</h4>
            <h4>support@ltpx.com</h4>
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
            <h4 className={styles['title']}>Our Company</h4>
            {companyLinks.map((link, index) => (
              <NavLink className={styles['link']} to={link.url} key={index}>
                {link.text}
              </NavLink>
            ))}
          </div>
          <div className={styles['links']}>
            <h4 className={styles['title']}>Support</h4>
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
          <h5>Copyright © 2022 Creative Layers All Right Reserved</h5>
          <h5>Terms & Conditions</h5>
          <h5>Privacy policy</h5>
          <h5>Sitemap</h5>
        </div>
      </div>
    </div>
  );
}

export default Footer;
