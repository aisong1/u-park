import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import axios from 'axios';
import styles from './styles/Map.css';

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

const Map = (props) => {
  const [lng, setLng] = useState(-122.3321);
  const [lat, setLat] = useState(47.6062);
  const [zoom, setZoom] = useState(11);

  const mapContainer = useRef(null);

  useEffect(() => {
    // Initialize map
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [lng, lat],
      zoom,
    });

    map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    }));

    // Add navigation control (+/- buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    // Fetch data from API
    axios.get('/api/parking')
      .then(({ data }) => {
        const { rows } = data;
        rows.forEach((row) => {
          new mapboxgl.Marker()
          .setPopup(
            new mapboxgl.Popup({ 
              className: 'popup' 
            }).setHTML(
              `<p><b>Meter Code</b>: ${row.meter_code}</p>
              <p><b>Street</b>: ${row.blockface_name}</p>
              <p><b>Side of Street</b>: ${row.side_of_street}</p>`
            )
          )
          .setLngLat([row.longitude, row.latitude])
          .addTo(map);
        })
      })
      .catch((err) => {
        throw new Error(err);
      });

    // Clean up map on unmount
    // return () => map.remove();
  }, []);

  

  return (
    <div>
      <div className={styles.mapContainer} ref={mapContainer} />
    </div>
  );
};

export default Map;
