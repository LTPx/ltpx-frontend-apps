import type {ComponentMeta } from '@storybook/react';
import { GroupSelectOptionCard } from './group-select-option-card';

const Story: ComponentMeta<typeof GroupSelectOptionCard> = {
  component: GroupSelectOptionCard,
  title: 'GroupSelectOptionCard',
};

export default Story;

const options = [
  {title: 'Tarjeta de Crédito' ,text:"recibir pagos a mi tarjeta de crédito", icon:'truck'},
  {title: 'Tarjeta de Débito' ,text:"recibir pagos a mi tarjeta de débito", icon:'printer'},
  {title: 'Tarjeta de Banco' ,text:"recibir pagos a mi tarjeta de banco", icon:'picture'},
  {title: 'Tarjeta de Crédito' ,text:"recibir pagos a mi tarjeta de crédito", icon:'redo'},
]

export const Options = () => {
  return (
    <div>
      <GroupSelectOptionCard options={options} onChange={(ii) => {console.log(ii)}}/>
    </div>
  )
};