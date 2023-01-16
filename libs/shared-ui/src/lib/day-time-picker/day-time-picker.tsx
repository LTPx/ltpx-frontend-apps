import Icon from '../icon/icon';
import TimePicker from '../time-picker/time-picker';
import styles from './day-time-picker.module.scss';

/* eslint-disable-next-line */
export interface DayTimePickerProps {
  selected?: boolean;
  name: string;
}

export function DayTimePicker(props: DayTimePickerProps) {
  const { selected, name } = props;

  const handleChangeTime = (data: any) => {
    console.log(data)
  }

  return (
    <div className={styles['container']}>
      <div className={`${styles['day']} ${selected ? styles['selected'] : ''}`}>
        <div
          className={styles['day-name']}
          onClick={(e) => {}}
        >
          <Icon
            icon={`${selected ? 'checkbox' : 'un-checkbox'}`}
            size={15}
          />
          <h4>{name}</h4>
        </div>
        {selected && (
          <div className={styles['time']}>
            <h4>A partir de las</h4>
            <TimePicker onChange={(d)=> {handleChangeTime(d)}}/>
          </div>
        )}
      </div>
    </div>
  );
}

export default DayTimePicker;
