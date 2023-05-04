export interface NotificationModel {
  user_id: number;
  text: string;
  meta: any;
  kind: 'task' | 'quiz'| 'system' | 'payment';
  created_at: string;
}

export enum NotificationActions {
  fill_application = "fill_application",
  application_require_change = "application_require_change",
  application_approved = "application_approved",
  course_need_changes = "course_need_changes",
  course_approved = "course_approved",
  new_student = "new_student",
  task_need_review = "task_need_review",
  quiz_need_review = "quiz_need_review",
  add_credit = "add_credit",
  withdrawal_completed = "withdrawal_completed",
  student_enrolled = "student_enrolled",
  class_started = "class_started",
  task_reviewed = "task_reviewed",
  quiz_reviewed = "quiz_reviewed",
  achievement_reached = "achievement_reached",
  course_completed = "course_completed",
  chat_unread_messages = "chat_unread_messages",
}

export interface NotificationMeta {
  action: NotificationActions;
  entity_id: number;
  entity_meta: any;
}

export interface Notification {
  kind: string;
  text: string;
  date: string;
  meta: NotificationMeta;
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

