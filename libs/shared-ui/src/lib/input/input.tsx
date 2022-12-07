import css from './input.module.scss';

/* eslint-disable-next-line */
enum Direction {
  left = 1,
  right = 0,
}

export interface AddonSymbolInput {
  text?: string;
  icon?: string;
  position?: Direction;
}

export interface InputProps {
  className?: string,
  onKeyPress?: string,
  onEnter?: any,
  onChange?: any,
  onBlur?: any,
  addonInput?: AddonSymbolInput;
  input?: string,
  description?: string,
  type?: string
  placeholder?: string
  id?: string
  name?: string
  value?: any
  label?: string
  disabled?: boolean
}

export function Input(props: InputProps) {
  const {
    className,
    onKeyPress,
    onEnter,
    onChange,
    description,
    label,
    addonInput,
    ...other
  } = props

  return (
    <div className={css['container']}>
      <input
        className={`${className} ${css['input-box']}`}
        {...other}
        onChange={e => onChange && onChange(e)}
      />
    </div>
  );
}

export default Input;
