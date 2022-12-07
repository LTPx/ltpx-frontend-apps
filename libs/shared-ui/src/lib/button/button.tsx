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
}

export function Button(props: ButtonProps) {
  const {
    className,
    onClick,
    color,
    type,
    title,
    disabled,
    ...other
  } = props;

  const selectedColor = color ? color : ColorsButton.white;
  const colorsClasses = {
    white: `${css['btn']} ${css['btn-white']}`,
    accent: `${css['btn']} ${css['btn-accent']}`,
    primary: `${css['btn']} ${css['btn-primary']}`,
    secondary: `${css['btn']} ${css['btn-secondary']}`
  };
  const btnClass = colorsClasses[selectedColor];

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
