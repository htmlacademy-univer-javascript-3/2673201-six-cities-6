import { Link } from 'react-router-dom';
import './found-not-screen.css';

function NotFound(): JSX.Element {
  return (
    <main className="not-found">
      <h1 className="not-found__title">404 - страница не найдена :(</h1>
      <p className="not-found__text">Такой страницы не существует. Вернуться на главную:</p>
      <Link to="/" title="/"  className="not-found__link">На главную страницу</Link>
    </main>
  );
}

export default NotFound;
