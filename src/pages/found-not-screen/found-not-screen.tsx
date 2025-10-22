import { Link } from 'react-router-dom';
import './found-not-screen.css';

function NotFound(): JSX.Element {
  return (
    <main className="not-found">
      <h1>404 - страница не найдена :(</h1>
      <p>Такой страницы не существует. Вернуться на главную:</p>
      <Link to="/" title="/" >На главную страницу</Link>
    </main>
  );
}

export default NotFound;
