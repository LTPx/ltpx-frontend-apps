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

export * from './lib/api/admin/applications-api';
export * from './lib/api/admin/users-api';
export * from './lib/api/admin/admin-courses-api';

export * from './lib/api/site/site-courses-api';
export * from './lib/api/site/carts-api';

//constants
export * from '../src/lib/constants/course-constants';
export * from '../src/lib/constants/app-constants';
export * from '../src/lib/constants/achievements-constants';
