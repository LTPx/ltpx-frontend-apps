export interface NotificationModel {
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

export interface NotificationWebHook {
  text: string,
  meta: {
    sender_id: number,
    sender_name: string,
    data: any
  };
  type: 'task' | 'quiz'| 'system' | 'payment';
  created_at: string;
}
