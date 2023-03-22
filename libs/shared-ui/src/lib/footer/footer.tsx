import { useTranslation } from 'react-i18next';
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
}

export function Footer(props: FooterProps) {
  const { companyLinks } = props;
  const { t } = useTranslation();
  return (
    <div className={styles['container']}>
      <div className={styles['footer-content']}>
        <div className={styles['company-information']}>
          <div className={styles['icon-content']}>
            <Brand negativeSpace={true} />
          </div>
          <div className={styles['information-one']}>
            {/* <p>Calle de Covarrubias y 142301 Ravenswood, Madrid - Spain.</p> */}
            <div className={styles['icon-contact']}>
              <Icon icon={'whatsapp'} size={17} />
              <h4>
                <a target="_blank" href="https://wa.me/message/Y5P6BHULTPA2B1">
                  +34 633 752203
                </a>
              </h4>
            </div>
            <div className={styles['icon-contact']}>
              <Icon icon={'mail'} size={17} />
              <h4>
              <a target="_blank" href="mailto:soporte@growopenminds.com">
                soporte@growopenminds.com
                </a>
                </h4>
            </div>
          </div>
          <div className={styles['social-networks']}>
            <a target="_blank" href="https://www.facebook.com/growopenminds">
              <Icon
                className={styles['social']}
                icon="facebook"
                size={20}
                color="white"
              />
            </a>
            <a target="_blank" href="https://www.instagram.com/growmoi/">
              <Icon
                className={styles['social']}
                icon="instagram"
                size={20}
                color="white"
              />
            </a>
            <a target="_blank" href="https://twitter.com/GrowMoi">
              <Icon
                className={styles['social']}
                icon="twitter"
                size={20}
                color="white"
              />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/company/growopenminds/"
            >
              <Icon
                className={styles['social']}
                icon="linkedin"
                size={20}
                color="white"
              />
            </a>
          </div>
        </div>
        <div className={styles['site-links']}>
          <div className={styles['links']}>
            <h4 className={styles['title']}>{t('footer.company')}</h4>
            {companyLinks.map((link, index) => (
              <NavLink className={styles['link']} to={link.url} key={index}>
                {link.text}
              </NavLink>
            ))}
          </div>
          {/* <div className={styles['links']}>
            <h4 className={styles['title']}>Support</h4>
            {supportLinks.map((link, index) => (
              <NavLink className={styles['link']} to={link.url} key={index}>
                {link.text}
              </NavLink>
            ))}
          </div> */}
        </div>
      </div>
      <div className={styles['footer-end']}>
        <div className={styles['information-end-container']}>
          <h5>{t('footer.copyright')}</h5>
        </div>
      </div>
    </div>
  );
}

export default Footer;
