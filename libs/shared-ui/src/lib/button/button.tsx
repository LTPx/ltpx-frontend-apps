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
  const btnClass = outline ? `${css['btn']} ${btnClassOutline}` : `${css['btn']} ${colorsClasses[selectedColor]}`;

  return (
    <button className={btnClass}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...other}
    >
      {title}
    </button>
  );
}

export default Button;
