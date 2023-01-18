import Icon from '../icon/icon';
import InputTextStatus, { StatusInputText } from '../input-text-status/input-text-status';
import css from './input.module.scss';

/* eslint-disable-next-line */
export enum Position {
  left = 'left',
  right = 'right',
}

export interface AddonSymbolInput {
  text?: string;
  icon?: string;
  position?: Position;
}
export interface InputProps {
  type?: string
  id?: string
  name?: string
  value?: any
  label?: string
  placeholder?: string
  disabled?: boolean
  className?: string,
  onChange?: any,
  onBlur?: any,
  onKeyDown?: any,
  addonInput?: AddonSymbolInput;
  description?: string;
  min?: any;
  max?: any;
  errorMessage?: string | null;
}

export function Input(props: InputProps) {
  const {
    className,
    onChange,
    onKeyDown,
    label,
    addonInput,
    description,
    min,
    max,
    errorMessage,
    ...other
  } = props;

  let inputClassesPosition = '';

  if (addonInput) {
    inputClassesPosition =  addonInput?.position === 'left' ? css['input-addon-left'] : css['input-addon-right'];
  }

  const AddonSymbol = ({text, position, icon}: { text?: string; position?: string, icon?: string}) => {
    const classPosition = position === Position.left ? css['addon-left'] : css['addon-right']
    return (
      <div className={`${css['addon']} ${classPosition}`}>
        { icon && (
          <Icon icon={icon} size={15}/>
        )}
        {text}
      </div>
    )
  }

  return (
    <div className={`${css['container']} ${className}`}>
      {label && (
        <label className={css['label']}>{label}</label>
      )}
      { description && (
        <p className={css['description']}>{description}</p>
      )}
      <div className={`${css['input-container']}`}>
        { addonInput && addonInput.position === 'left' && (
          <AddonSymbol text={addonInput.text} position={Position.left}/>
        )}
        <input
          className={`${css['input-box']} ${inputClassesPosition}`}
          {...other}
          min={min}
          onChange={e => onChange && onChange(e)}
          onKeyDown={e => onKeyDown && onKeyDown(e)}
        />
        { addonInput && addonInput.position === 'right' && (
          <AddonSymbol text={addonInput.text} position={Position.right} icon={addonInput.icon}/>
        )}
      </div>
      { errorMessage && (
        <InputTextStatus
          status={StatusInputText.error}
          text={errorMessage}
        />
      )}
    </div>
  );
}

export default Input;
