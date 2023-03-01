export * from './lib/api';

// i18n
export * from '../src/lib/locales/es';
export * from '../src/lib/locales/en';

//interfaces
export * from './lib/interfaces/course-interface';
export * from './lib/interfaces/user-interface';
export * from './lib/interfaces/quiz-interface';
export * from './lib/interfaces/teacher-interface';
export * from './lib/interfaces/achievement-interface';
export * from './lib/interfaces/api-response-ui-interface';
export * from './lib/interfaces/cart-interface';
export * from './lib/interfaces/enrollment-interface';
export * from './lib/interfaces/user-course-payment-interface';
export * from './lib/interfaces/wallet-interface';
export * from './lib/interfaces/session-interface';

//fake api
export * from '../src/lib/fake/courses';
export * from '../src/lib/fake/classes';
export * from '../src/lib/fake/chat-messages';

//api
export * from '../src/lib/api/auth';

export * from './lib/api/teacher/courses-api';
export * from './lib/api/teacher/teacher-api';
export * from './lib/api/teacher/quiz-api';
export * from './lib/api/teacher/achievements-api';
export * from './lib/api/teacher/wallet-api';
export * from './lib/api/teacher/teacher-classes-api';
export * from './lib/api/teacher/teacher-sessions-api';
export * from './lib/api/teacher/teacher-meeting-api';
export * from './lib/api/teacher/teacher-students-api';

export * from './lib/api/admin/applications-api';
export * from './lib/api/admin/users-api';
export * from './lib/api/admin/admin-courses-api';

export * from './lib/api/site/site-courses-api';
export * from './lib/api/site/carts-api';
export * from './lib/api/site/enrollments-api';

export * from './lib/api/user/payments-api';

export * from './lib/api/student/student-courses-api';
export * from './lib/api/student/student-payments-api';
export * from './lib/api/student/student-classes-api';
export * from './lib/api/student/student-quizzes-api';

export * from './lib/api/meeting/video-api';

//constants
export * from '../src/lib/constants/course-constants';
export * from '../src/lib/constants/app-constants';
export * from '../src/lib/constants/achievements-constants';
