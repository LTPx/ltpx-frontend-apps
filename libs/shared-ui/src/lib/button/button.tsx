import { NavLink } from 'react-router-dom';
import css from './button.module.scss';

export enum TypeButton {
  submit = 'submit',
  reset = 'reset',
  button = 'button',
}

export enum ColorsButton {
  white = 'white',
  accent = 'accent',
  primary = 'primary',
  secondary = 'secondary',
}

/* eslint-disable-next-line */
export interface ButtonProps {
  className?: string;
  onClick?: (event?: any) => void;
  color?: ColorsButton;
  type?: TypeButton;
  title: string;
  disabled?: boolean;
  outline?: boolean;
  full?: boolean;
  link?: string;
  ref?: any;
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
    ref,
    ...other
  } = props;

  const selectedColor = color ? color : ColorsButton.primary;
  const colorsClasses = {
    white: `${css['btn-white']}`,
    accent: `${css['btn-accent']}`,
    primary: `${css['btn-primary']}`,
    secondary: `${css['btn-secondary']}`,
  };
  const outlineSelectorClass = outline ? `btn-${selectedColor}-outline` : '';
  const btnClassOutline = outline ? `${css[outlineSelectorClass]}` : '';
  const btnClassFull = full ? css['btn-full'] : '';
  const btnClass = outline
    ? `${css['btn']} ${btnClassOutline} ${btnClassFull}`
    : `${css['btn']} ${colorsClasses[selectedColor]} ${btnClassFull}`;

  const Button = () => {
    return (
      <button
        className={`${btnClass} ${className}`}
        type={type}
        onClick={(event)=>{
          onClick && onClick(event)
        }}
        disabled={disabled}
        onMouseDown={(event)=>{event.preventDefault()}}
        {...other}
      >
        {title}
      </button>
    );
  };

  return (
    <div className={`${className}`}>
      {link ? (
        <NavLink to={link}>
          <Button />
        </NavLink>
      ) : (
        <Button />
      )}
    </div>
  );
}

export default Button;
