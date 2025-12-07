import './styles.css';

const Spinner = (): JSX.Element => (
  <div className="spinner">
    <div className="spinner__circle" />
    <p className="spinner__text">Загрузка</p>
  </div>
);

export default Spinner;
