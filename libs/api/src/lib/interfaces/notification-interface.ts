export interface NotificationModel {
  id: number;
  user_id: number;
  text: string;
  meta: any;
  kind: 'task' | 'quiz'| 'system' | 'payment';
  created_at: string;
}
export interface Notification {
  kind: string;
  text: string;
  date: string;
  meta: any;
}
