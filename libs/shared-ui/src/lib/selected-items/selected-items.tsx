import { useState } from 'react';
import Icon from '../icon/icon';
import styles from './selected-items.module.scss';

export interface ItemOption {
  text: string;
  id?: number;
  selected?: boolean;
}
/* eslint-disable-next-line */
export interface SelectedItemsProps {
  items: ItemOption[];
  onlyOneSelection?: boolean;
  onChange?: (array: Array<any>) => void;
}

export function SelectedItems(props: SelectedItemsProps) {
  const { items, onlyOneSelection, onChange } = props;
  const [itemsOption, setItemsOption] = useState(items);
  const [optionForm, setOptionForm] = useState<any[]>([]);

  const selectItem = (indexOption: number) => {
    // if (onlyOneSelection) {
    //   const forms = [...itemsOption];
    //   const element = [forms[indexOption]];
    //   const copy = [...optionForm];
    //   const addElements = copy.concat(element);
    //   const result = forms.filter((form, i) => {
    //     return Object.assign(form, { selected: indexOption == i });
    //   });
    //   setItemsOption(result);
    //   onChange && onChange(addElements);
    //   console.log(addElements)
    // } else {
    //   const forms = [...itemsOption];
    //   forms[indexOption].selected = !forms[indexOption].selected;
    //   setItemsOption(forms);
    //   //here
    //   if (forms[indexOption].selected) {
    //     const elements = forms[indexOption];
    //     const copy = [...optionForm];
    //     const addElements = copy.concat(elements);
    //     setOptionForm(addElements);
    //     console.log(addElements);
    //     onChange && onChange(addElements);
    //   } else {
    //     const elms = optionForm.filter((item) => {
    //       return item.selected;
    //     });
    //     setOptionForm(elms);
    //     onChange && onChange(elms);
    //     console.log('optionForm: ', elms);
    //   }
    // }
  };

  return (
    <div className={styles['container']}>
      <div className={styles['items-container']}>
        {items.map((item, index) => (
          <div
            className={`${styles['item']} ${
              item.selected ? styles['checked'] : ''
            }`}
            key={index}
            onClick={() => {
              selectItem(index);
            }}
          >
            <h4>{item.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectedItems;
