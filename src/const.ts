export const Setting = {
  ErrorsCount: 3
};
export enum AppRoute {
  Login = '/login',
  Root = '/',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  NotFound = '*',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
