import React, { useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import axios from 'axios';
import styles from './styles/Map.css';

const Favorites = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.heading}>
        <h1>Favorites</h1>
      </div>
      <div className={styles.favorites}>
        
      </div>
    </div>
  );
}

export default Favorites;
