import Map from '../../components/map/map';
import type { City } from '../../types/type-city';

type Props = {
  city: City;
  coords: [number, number][];
  activeCoord: [number, number];
};

function OfferMap({ city, coords, activeCoord }: Props) {
  return <Map city={city} coords={coords} activeCoord={activeCoord} />;
}

export default OfferMap;
