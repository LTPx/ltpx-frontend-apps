import type { ComponentMeta } from '@storybook/react';
import { Modal } from './modal';

const Story: ComponentMeta<typeof Modal> = {
  component: Modal,
  title: 'Modal',
};
export default Story;

export const Default = () => {
  return (
    <div className="body">
      <h1>Text Background</h1>
      <h1>Text Background</h1>
      <h1>Text Background</h1>
      <h1>Text Background</h1>
      <h1>Text Background</h1>
      <h1>Text Background</h1>
      <h1>Text Background</h1>
      <h1>Text Background</h1>
      <h1>Text Background</h1>
      <h1>Text Background</h1>
      <h1>Text Background</h1>
      <h1>Text Background</h1>
      <h1>Text Background</h1>
      <h1>Text Background</h1>
      <h1>Text Background</h1>
      <h1>Text Background</h1>
      <h1>Text Background</h1>
      <h1>Text Background</h1>
      <h1>Text Background</h1>
      <h1>Text Background</h1>
      <h1>Text Background</h1>
      <h1>Text Background</h1>
      <h1>Text Background</h1>
      <Modal open={true}>
        <h1>I am a text</h1>
        <h1>I am a text</h1>
        <h1>I am a text</h1>
        <h1>I am a text</h1>
      </Modal>
    </div>
  )
};
