import {useRef, useEffect} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from './use-map.jsx';
import {City} from '../../types/type-city.js';

export type OffersMapProps = {
  city: City;
  coords: [number, number][];
}

function Map({city, coords}: OffersMapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const customIcon = leaflet.icon({
    iconUrl: 'markup/img/pin.svg',
    iconSize: [38, 38],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      coords.forEach((coord) => {
        leaflet
          .marker({
            lat: coord[0],
            lng: coord[1],
          },{
            icon:customIcon
          })
          .addTo(map);
      });
    }
  }, [map, coords]);
  return (
    <div
      style={{height: '100%'}}
      ref={mapRef}
    >
    </div>
  );
}

export default Map;
