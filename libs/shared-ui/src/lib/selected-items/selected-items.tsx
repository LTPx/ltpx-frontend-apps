import { useState } from 'react';
import Icon from '../icon/icon';
import styles from './selected-items.module.scss';

export interface ItemOption {
  text: string;
  id?: string;
  selected?: boolean;
}
/* eslint-disable-next-line */
export interface SelectedItemsProps {
  items: ItemOption[];
  onlyOneSelection?: boolean;
}

export function SelectedItems(props: SelectedItemsProps) {
  const { items, onlyOneSelection } = props;
  const [ itemsOption, setItemsOption ] = useState(items);

  const selectItem = (indexOption: number) => {
    if (onlyOneSelection) {
      let forms = [...itemsOption];
      let result = forms.filter((form, i)=> {
        return Object.assign(form, { selected: indexOption == i})
      })
      setItemsOption(result);
    }else {
      let forms = [...itemsOption];
      forms[indexOption].selected = !(!!forms[indexOption].selected);
      setItemsOption(forms);
    };
  }

  return (
    <div className={styles['container']}>
      <div className={styles['items-container']}>
        {items.map((item, index)=>(
          <div className={`${styles['item']} ${item.selected ? styles['checked'] : ''}`}
            key={index}
            onClick={()=>{selectItem(index)}}
          >
            <Icon icon='check' size={15}/>
            <h4>{item.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectedItems;
