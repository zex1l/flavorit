export const ACCESS_EXPIRES_TOKEN_HOUR = 1;
export const REFRESH_EXPIRES_TOKEN_DAYS = 3;

export const REFRESH_TOKEN_COOKIE_NAME = 'refreshToken' as const;
export const ACCESS_TOKEN_COOKIE_NAME = 'accessToken' as const;

export const USER_ALREADY_EXISTS_ERROR = 'User already exists';
export const USER_NOT_FOUND = 'user not found';

export const REGISTRATION_ERROR = 'Registration failed:';
export const LOGIN_ERROR = 'Login failed:';
export const EMAIL_OR_PASSWORD_INVALID_ERROR = 'Invalid email or password'
export const FORBIDDEN_ERROR = 'You dont have permission'
export const REFRESH_TOKEN_ERROR = 'Refresh token is invalid'
