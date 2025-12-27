import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-actions';

function HeaderNav(): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((s) => s.authorizationStatus);
  const user = useAppSelector((s) => s.user);
  const offers = useAppSelector((s) => s.offers);
  const favoriteCount = offers.filter((o) => o.isFavorite).length;
  const handleLogoutClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    void dispatch(logoutAction());
  };
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          {authStatus === AuthorizationStatus.Auth ? (
            <Link
              to={AppRoute.Favorites}
              className="header__nav-link header__nav-link--profile"
            >
              <div className="header__avatar-wrapper user__avatar-wrapper" />
              <span className="header__user-name user__name">
                {user?.email}
              </span>
              <span className="header__favorite-count">
                {favoriteCount}
              </span>
            </Link>
          ) : (
            <Link
              to={AppRoute.Login}
              className="header__nav-link header__nav-link--profile"
            >
              <div className="header__avatar-wrapper user__avatar-wrapper" />
              <span className="header__login">Sign in</span>
            </Link>
          )}
        </li>

        {authStatus === AuthorizationStatus.Auth && (
          <li className="header__nav-item">
            <a
              href={AppRoute.Root}
              className="header__nav-link"
              onClick={handleLogoutClick}
            >
              <span className="header__signout">Sign out</span>
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default HeaderNav;
