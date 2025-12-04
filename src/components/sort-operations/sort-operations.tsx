import { SortType } from '../../const';

type SortOperationsProps = {
  activeSort: SortType;
  onSortChange: (sortType: SortType) => void;
};

function SortOperations({ activeSort, onSortChange }: SortOperationsProps): JSX.Element {
  const sortOperations = [
    SortType.Popular,
    SortType.PriceLowToHigh,
    SortType.PriceHighToLow,
    SortType.TopRatedFirst,
  ];

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {activeSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {sortOperations.map((operation) => (
          <li
            key={operation}
            className={
              `places__option${
                operation === activeSort ? ' places__option--active' : ''}`
            }
            tabIndex={0}
            onClick={() => onSortChange(operation)}
          >
            {operation}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortOperations;
