// Local storage keys
export const STORAGE_KEYS = {
  JWT_TOKEN_STUDENT: 'JWT_TOKEN_STUDENT',
  JWT_TOKEN_INSTRUCTOR: 'JWT_TOKEN_INSTRUCTOR',
  ADDRESS: 'ADDRESS',
  TOKEN: 'TOKEN',
  ACCESSTOKEN: 'accessToken'
};

// React-query keys
export const QUERY_KEYS = {
  EXAMPLE: 'EXAMPLE',
  TOKEN: 'TOKEN',
  STATISTIC: 'statistic',
  TRENDING: 'trending',
  TODOS: 'todos'
};

// Backend Routes
export const BACKEND_KEYS = {
  SERVER_URL: 'http://localhost:4200',
  TODOCREATE: 'todos/create',
  TODOUPDATE: 'todos/update',
  TODODELETE: 'todos/delete',
  TODOS: 'todos',
  USER: 'user',
  USER_AUTH: 'user/check-auth',
  USER_SIGN_UP: 'user/sign-up',
  USER_CONFIRM_EMAIL: 'user/email-confirm',
  USER_SIGN_IN: 'user/sign-in',
  USER_SIGN_OUT: 'user/sign-out',
  USER_REQ_RESET_PASS: 'user/request-reset-password',
  USER_RESET_PASS: 'user/reset-password',
  USER_CHANGE_PASS: 'user/change-password'
};

export const ROUTER_KEYS = {
  ROOT: '/',
  HOME: '/home',
  AUTHORIZED: '/authorized',
  TODOS: '/todos',
  TODO: '/todos/:id',
  TODOADD: '/todo-add',
  TODOEDIT: '/todos/edit/:id',
  NotFound: '*',
  USER_SIGN_UP: '/register',
  USER_CONFIRM_EMAIL: '/confirm-email/:id',
  USER_SIGN_IN: '/login',
  USER_PROFILE: '/profile',
  USER_PASSWORD_REQUEST: '/forgot-password',
  USER_RESET_PASSWORD: '/reset-password/:id',
  USER_CHANGE_PASSWORD: '/change-password',
  USER_LOGOUT: '/log-out'
};
