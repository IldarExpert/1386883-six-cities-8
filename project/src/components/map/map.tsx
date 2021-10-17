import {useEffect, useRef} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap';
import type MapProps from './type';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';

const {Icon, Marker} = leaflet;

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAncor: [20, 20],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAncor: [20, 20],
});

function Map ({city, cardInfo, selectedPoint}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      cardInfo.forEach((item) => {
        const marker = new Marker({
          lat: item.location.latitude,
          lng: item.location.longitude,
        });

        marker.setIcon(
          selectedPoint !== undefined && item.id === selectedPoint.id
            ? currentCustomIcon
            : defaultCustomIcon,
        ).addTo(map);
      });
    }
  }, [map, cardInfo, selectedPoint]);


  return (
    <section className="cities__map map"
      style = {{
        height: '100%',
        minHeight: '500px',
      }}
      ref={mapRef}
    >
    </section>
  );
}

export default Map;