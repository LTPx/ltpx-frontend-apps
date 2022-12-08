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
  } = props;

  let inputClassesPosition = '';

  if (addonInput) {
    inputClassesPosition =  addonInput?.position === 'left' ? css['input-addon-left'] : css['input-addon-right'];
  }

  const AddonSymbol = ({text, position}: { text?: string; position?: string}) => {
    const classPosition = position === Position.left ? css['addon-left'] : css['addon-right']
    return (
      <div className={`${css['addon']} ${classPosition}`}>
        {text}
      </div>
    )
  }

  return (
    <div className={css['container']}>
      <label className={css['label']}>{label}</label>
      <div className={`${css['input-container']}`}>
        { addonInput && addonInput.position === 'left' && (
          <AddonSymbol text={addonInput.text} position={Position.left}/>
        )}
        <input
          className={`${css['input-box']} ${inputClassesPosition}`}
          {...other}
          onChange={e => onChange && onChange(e)}
        />
        { addonInput && addonInput.position === 'right' && (
          <AddonSymbol text={addonInput.text} position={Position.right}/>
        )}
      </div>
    </div>
  );
}

export default Input;
