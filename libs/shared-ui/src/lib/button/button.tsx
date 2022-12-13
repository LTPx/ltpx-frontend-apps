import { NavLink } from 'react-router-dom';
import css from './button.module.scss';

export enum TypeButton {
  submit = "submit",
  reset = "reset",
  button = "button",
}

export enum ColorsButton {
  white = "white",
  accent = "accent",
  primary = "primary",
  secondary = "secondary",
}

/* eslint-disable-next-line */
export interface ButtonProps {
  className?: string;
  onClick?: {(): void};
  color?: ColorsButton;
  type?: TypeButton;
  title: string;
  disabled?: boolean;
  outline?: boolean;
  full?: boolean;
  link?: string;
}

export function Button(props: ButtonProps) {
  const {
    className,
    onClick,
    color,
    type,
    title,
    disabled,
    outline,
    full,
    link,
    ...other
  } = props;

  const selectedColor = color ? color : ColorsButton.white;
  const colorsClasses = {
    white: `${css['btn-white']}`,
    accent: `${css['btn-accent']}`,
    primary: `${css['btn-primary']}`,
    secondary: `${css['btn-secondary']}`
  };
  const outlineSelectorClass = outline ? `btn-${color}-outline` : '';
  const btnClassOutline = outline ? `${css[outlineSelectorClass]}` : '';
  const btnClassFull = full ? css['btn-full'] : '';
  const btnClass = outline ? `${css['btn']} ${btnClassOutline} ${btnClassFull}` : `${css['btn']} ${colorsClasses[selectedColor]} ${btnClassFull}`;

  const Button = () => {
    return (
      <button className={`${className} ${btnClass}`}
        type={type}
        onClick={onClick}
        disabled={disabled}
        {...other}
      >
        {title}
      </button>
    )
  }

  return (
    <div className="wrapper">
      { link ? (
        <NavLink to={link}>
          <Button></Button>
        </NavLink>
      ) : <Button></Button>}
    </div>
  );
}

export default Button;
