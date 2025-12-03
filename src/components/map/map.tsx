import {useRef, useEffect} from 'react';
import leaflet, {layerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from './use-map.jsx';
import {City} from '../../types/type-city.js';

export type OffersMapProps = {
  city: City;
  coords: [number, number][];
  activeCoord: [number, number] | null;
};

function Map({city, coords, activeCoord}: OffersMapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const defaultIcon = leaflet.icon({
    iconUrl: '/img/pin.svg',
    iconSize: [38, 38],
    iconAnchor: [20, 40],
  });
  const activeIcon = leaflet.icon({
    iconUrl: '/img/pin-active.svg',
    iconSize: [38, 38],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (!map) {
      return;
    }
    const markersLayer = layerGroup().addTo(map);
    coords.forEach((coord) => {
      const isActive =
          activeCoord &&
          coord[0] === activeCoord[0] &&
          coord[1] === activeCoord[1];
      leaflet.marker(
        {
          lat: coord[0],
          lng: coord[1],
        },
        {
          icon: isActive ? activeIcon : defaultIcon,
        }).addTo(markersLayer);
    });

    return () => {
      map.removeLayer(markersLayer);
    };
  }, [map, coords, activeCoord, city]);

  return (
    <div
      style={{height: '100%'}}
      ref={mapRef}
    />
  );
}

export default Map;
