import { ReactElement } from 'react';
import Button, { ColorsButton } from '../button/button';
import styles from './notice-card.module.scss';

/* eslint-disable-next-line */
export interface NoticeCardProps {
  image?: string;
  title: string;
  description: string;
  children?: ReactElement; //este debe ser el boton
  className?: string; //aqui le podemos pasar el color de fondo del card
}

export function NoticeCard(props: NoticeCardProps) {
  const { image, title, description, children, className } = props;
  return (
    <div className={`${styles['content']} ${className}`}>
      {image && (<img src={image} />)}
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
    </div>
  );
}

export default NoticeCard;

{
  /* <div className={styles['card-teaching']}>
        <h2>Enseñar en Openmind</h2>
        <p>
          Revisa nuestra blog donde encontraras todo la información de como
          funciona Openmind
        </p>
        <Button
          title="Aprender Mas"
          color={ColorsButton.secondary}
          full={true}
          link="/teacher/blog"
        />
      </div> */
}
