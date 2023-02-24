import type { ComponentMeta } from '@storybook/react';
import { SelectOptionCard } from './select-option-card';

const Story: ComponentMeta<typeof SelectOptionCard> = {
  component: SelectOptionCard,
  title: 'SelectOptionCard',
};

export default Story;

export const Default = () => {
  return (
    <div>
      <SelectOptionCard
        title={'Transferencia Bancaria'}
        text={'Recibir pagos a mi cuenta de banco'}
        icon={'store'}
        selected={false}
      />
      <br />
      <SelectOptionCard
        title={'Transferencia Bancaria'}
        text={'Recibir pagos a mi cuenta de banco'}
        icon={'store'}
        selected={true}
      />
    </div>
  );
};
