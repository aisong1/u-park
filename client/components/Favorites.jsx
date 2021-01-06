import React, { useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import axios from 'axios';
import styles from './styles/Map.css';

const Favorites = ({ favorites }) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.heading}>
        <h1>Favorites</h1>
      </div>
      <div className={styles.favorites}>
        {favorites.map((favorite) => {
          const props = favorite.properties;
          const street = props.blockface_name;
          const pattern = 'BETWEEN';
          const title = street.slice(0, street.indexOf(pattern));
          return (
            <div key={`favorite-${props.id}`} className={styles.item}>
              <a href="#" className={styles.title} id={`link-${props.id}`}>{title} · {props.side_of_street}</a>
              <div className={styles.desc}>
                {props.meter_code}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Favorites;
