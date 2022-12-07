import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button, ColorsButton } from './button';

const Story: ComponentMeta<typeof Button> = {
  component: Button,
  title: 'Button',
};
export default Story;

const styles = {
  display:'flex',
  width:'360px',
  justifyContent: 'space-between'
}

export const Colors = () => {
  return (
    <div className="content">
      <h3>Default Buttons Colors</h3>
      <div style={styles}>
        <Button title='White' color={ColorsButton.white}/>
        <br/>
        <Button title='Accent' color={ColorsButton.accent}/>
        <br/>
        <Button title='Primary' color={ColorsButton.primary}/>
        <br/>
        <Button title='Secondary' color={ColorsButton.secondary}/>
      </div>
    </div>

  )
};
