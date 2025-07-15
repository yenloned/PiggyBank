// Global API configuration
export const API_BASE_URL = 'https://piggy-bank-backend-three.vercel.app';

// API endpoints
export const API_ENDPOINTS = {
  // Account endpoints
  LOGIN: '/account/login',
  LOGOUT: '/account/logout',
  LOGGEDIN: '/account/loggedin',
  AUTH: '/account/auth',
  REGISTER: '/account/register',
  REGISTERED: '/account/registered',
  STORE_CODE: '/account/store_code',
  CHECK_CODE: '/account/check_code',
  CHECK_2FA: '/account/check_2FA',
  CHECK_PASSWORD: '/account/check_password',
  CHANGE_PASSWORD: '/account/change_password',
  DELETE_ACCOUNT: '/account/delete_account',
  CREDIT_SCORING: '/account/credit_scoring',
  UPDATE_CREDIT: '/account/update_credit',
  GET_DEBT_BYREF: '/account/get_debt_byref',
  PAY_DEBT: '/account/pay_debt',
  
  // Profile endpoints
  GET_INFO: '/profile/get_info',
  GET_DEBT: '/profile/get_debt',
  GET_HISTORY: '/profile/get_history',
  GET_SUB: '/profile/get_sub',
  GET_PAYEE: '/profile/get_payee',
  CHECK_SUB: '/profile/check_sub',
  CHECK_PAYEE: '/profile/check_payee',
  CHECK_USER: '/profile/check_user',
  ADD_PAYEE: '/profile/add_payee',
  DELETE_PAYEE: '/profile/delete_payee',
  CHECK_BALANCE: '/profile/check_balance',
  ENABLE_2FA: '/profile/enable_2FA',
  DISABLE_2FA: '/profile/disable_2FA',
  
  // Function endpoints
  DEPOSIT: '/function/deposit',
  WITHDRAWAL: '/function/withdrawal',
  TRANSFER: '/function/transfer',
  LOAN: '/function/loan',
  INSURANCE: '/function/insurance',
  
  // Email endpoints
  RESET_EMAIL: '/email/reset_email',
  NOTICE_EMAIL: '/email/notice_email'
}; 