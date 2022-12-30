import Avatar, { AvatarSize } from '../avatar/avatar';
import ProgressBar from '../progress-bar/progress-bar';
import styles from './learners-table.module.scss';

/* eslint-disable-next-line */
export interface UserLearner {
  image: string;
  name: string;
  date: string;
  percentage: number;
}

export interface LearnersTableProps {
  users: Array<UserLearner>;
}

export function LearnersTable(props: LearnersTableProps) {
  const { users } = props;
  return (
    <div className={styles['container']}>
      <table>
        <thead>
          <tr>
            <th>Learner Name</th>
            <th>Date Assigned</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td className={styles['user-name']}>
                <Avatar image={user.image} size={AvatarSize.small}></Avatar>
                {user.name}
              </td>
              <td>{user.date}</td>
              <td>
                <ProgressBar percentage={user.percentage}></ProgressBar>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LearnersTable;
