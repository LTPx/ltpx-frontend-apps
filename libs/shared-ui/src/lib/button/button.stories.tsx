import type {ComponentMeta } from '@storybook/react';
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

export const Outline = () => {
  return (
    <div className="content">
      <h3>Outline Buttons</h3>
      <div style={styles}>
        <Button title='White' color={ColorsButton.white} outline={true}/>
        <br/>
        <Button title='Accent' color={ColorsButton.accent} outline={true}/>
        <br/>
        <Button title='Primary' color={ColorsButton.primary} outline={true}/>
        <br/>
        <Button title='Secondary' color={ColorsButton.secondary} outline={true}/>
      </div>
    </div>
  )
};
