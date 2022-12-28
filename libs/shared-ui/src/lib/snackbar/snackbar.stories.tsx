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
    duration: 1000,
    position: SnackbarPosition.bottom,
    open: true,
    typeSnackbar: SnackbarType.warning,
    title: 'Alert Message',
    date: 'Today 10:30PM',
  };

  return (
    <Snackbar
      position={props.position}
      duration={props.duration}
      open={props.open}
      title={props.title}
      date={props.date}
      typeSnackbar={props.typeSnackbar}
    />
  );
};

export const Message = () => {
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

export const Error = () => {
  /* eslint-disable-next-line */
  const props: SnackbarProps = {
    position: SnackbarPosition.bottom,
    open: true,
    title: 'Error Message',
    date: 'Today 10:30PM',
    typeSnackbar: SnackbarType.error,
  };

  return (
    <Snackbar
      position={props.position}
      open={props.open}
      title={props.title}
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
    title: 'Successfully Message',
    date: 'Today 10:30PM',
    typeSnackbar: SnackbarType.success,
  };

  return (
    <div className="bg-gray-200 h-screen relative">
      <Snackbar
        position={props.position}
        open={props.open}
        title={props.title}
        date={props.date}
        typeSnackbar={props.typeSnackbar}
      />
    </div>
  );
};

// export const CenterBottom = () => {
//   /* eslint-disable-next-line */
//   const props: SnackbarProps = {
//     text: 'Item updated',
//     position: SnackbarPosition.centerBottom,
//     open: true,
//   };

//   return (
//     <div className="bg-gray-200 h-screen relative">
//       <Snackbar
//         text={props.text}
//         position={props.position}
//         open={props.open}
//       />
//     </div>
//   )
// };
