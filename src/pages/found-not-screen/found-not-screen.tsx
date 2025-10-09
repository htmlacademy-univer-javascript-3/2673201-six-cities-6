import { Link } from 'react-router-dom';

function NotFound(): JSX.Element {
  return (
    <main style={{ padding: 24, color: 'purple', fontStyle: 'italic' }}>
      <h1>404 - страница не найдена :(</h1>
      <p>Такой страницы не существует. Вернуться на главную:</p>
      <Link to="/" title="/" style={{fontWeight: 'bold', color: 'mediumpurple'}}>На главную страницу</Link>
    </main>
  );
}

export default NotFound;
