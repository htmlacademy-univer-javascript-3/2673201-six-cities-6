import {useAppDispatch, useAppSelector} from '../../hooks';
import { changeCity } from '../../store/action';
import type { City } from '../../types/type-city';
import type { CityType } from '../../types/type-offer';

type CitiesListProps = {
  cities: City[];
};

export default function CitiesList({ cities}: CitiesListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector((state) => state.city);

  const handleCityClick = (city: CityType) => {
    dispatch(changeCity(city));
  };

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li
          key={`city-${city.id}`}
          className="locations__item"
        >
          <a
            href="#"
            className={
              'locations__item-link tabs__item' +
              (city.name === activeCity ? ' tabs__item--active' : '')
            }
            onClick={(evt) => {
              evt.preventDefault();
              handleCityClick(city.name);
            }}
          >
            <span>{city.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
