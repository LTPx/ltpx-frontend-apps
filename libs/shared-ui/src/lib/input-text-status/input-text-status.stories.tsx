import type { ComponentMeta } from '@storybook/react';
import { InputTextStatus, StatusInputText } from './input-text-status';

const Story: ComponentMeta<typeof InputTextStatus> = {
  component: InputTextStatus,
  title: 'InputTextStatus',
};

export default Story;

export const Default = () => {
  return (
    <div>
      <InputTextStatus
        status={StatusInputText.error}
        text={'Campo obligatorio'}
      />
      <br />
      <InputTextStatus
        status={StatusInputText.success}
        text={'Los campos coinciden'}
      />
    </div>
  );
};
