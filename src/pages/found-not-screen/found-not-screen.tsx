import { Fragment } from 'react';
import { Link } from 'react-router-dom';

function NotFound(): JSX.Element {
  return (
    <Fragment>
      <main style={{ padding: 24, color: 'purple', fontStyle: 'italic' }}>
        <h1>404 — страница не найдена</h1>
        <p>Такой страницы нет. Вернуться на главную:</p>
        <Link to="/" title="/" style={{fontWeight: 'bold', color: 'mediumpurple'}}>На главную</Link>
      </main>
    </Fragment>
  );
}

export default NotFound;
