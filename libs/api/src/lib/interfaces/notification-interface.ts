export interface NotificationModel {
  id: number;
  user_id: number;
  text: string;
  meta: any;
  kind: string;
  created_at: string;
}
export interface Notification {
  type: string;
  text: string;
  date: string;
  meta: any;
}
