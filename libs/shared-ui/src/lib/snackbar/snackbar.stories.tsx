import type { ComponentMeta } from '@storybook/react';
import SnackbarPosition, {
  Snackbar,
  SnackbarProps,
  SnackbarType,
} from './snackbar';

const Story: ComponentMeta<typeof Snackbar> = {
  component: Snackbar,
  title: 'Snackbar',
};

export default Story;

export const Warning = () => {
  const props: SnackbarProps = {
    position: SnackbarPosition.bottom,
    open: true,
    typeSnackbar: SnackbarType.warning,
    title: 'Alert Message',
    icon: 'info-circle',
    date: 'Today 10:30PM',
  };

  return (
    <Snackbar
      position={props.position}
      open={props.open}
      title={props.title}
      date={props.date}
      icon={props.icon}
      typeSnackbar={props.typeSnackbar}
    />
  );
};

export const MessageText = () => {
  const props: SnackbarProps = {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    position: SnackbarPosition.top,
    open: true,
    tag: 'News',
    title: 'News Title',
    date: 'Today 10:30PM',
    typeSnackbar: SnackbarType.message,
  };

  return (
    <Snackbar
      text={props.text}
      position={props.position}
      open={props.open}
      tag={props.tag}
      title={props.title}
      date={props.date}
      typeSnackbar={props.typeSnackbar}
    />
  );
};

export const Message = () => {
  const props: SnackbarProps = {
    position: SnackbarPosition.top,
    open: true,
    tag: 'News',
    title: 'News Title',
    date: 'Today 10:30PM',
    typeSnackbar: SnackbarType.message,
  };

  return (
    <Snackbar
      text={props.text}
      position={props.position}
      open={props.open}
      tag={props.tag}
      title={props.title}
      date={props.date}
      typeSnackbar={props.typeSnackbar}
    />
  );
};

export const Error = () => {
  /* eslint-disable-next-line */
  const props: SnackbarProps = {
    position: SnackbarPosition.centerBottom,
    open: true,
    icon: 'close-circle-outline',
    title: 'Error Message',
    date: 'Today 10:30PM',
    typeSnackbar: SnackbarType.error,
  };

  return (
    <Snackbar
      position={props.position}
      open={props.open}
      title={props.title}
      icon={props.icon}
      date={props.date}
      typeSnackbar={props.typeSnackbar}
    />
  );
};

export const Success = () => {
  /* eslint-disable-next-line */
  const props: SnackbarProps = {
    position: SnackbarPosition.centerTop,
    open: true,
    icon: 'check-circle',
    title: 'Successfully Message',
    date: 'Today 10:30PM',
    typeSnackbar: SnackbarType.success,
  };

  return (
      <Snackbar
        position={props.position}
        open={props.open}
        title={props.title}
        date={props.date}
        icon={props.icon}
        typeSnackbar={props.typeSnackbar}
      />
  );
};

