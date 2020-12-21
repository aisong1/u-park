import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import styles from './styles/Map.css';

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

const App = (props) => {
  const [lng, setLng] = useState(-122.3321);
  const [lat, setLat] = useState(47.6062);
  const [zoom, setZoom] = useState(10);

  const mapContainer = useRef(null);

  useEffect(() => {
    // Initialize map
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [lng, lat],
      zoom,
    });

    // Add navigation control (+/- buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    // Clean up map on unmount
    return () => map.remove();
  }, []);

  return (
    <div>
      <div className={styles.mapContainer} ref={mapContainer} />
    </div>
  );
};

export default App;
