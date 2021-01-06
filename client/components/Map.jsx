import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; 
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import styles from './styles/Map.css';
import star15 from '../icons/star-15.png';

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

const Map = ({ favorites }) => {
  const [map, setMap] = useState(null);
  const [lng, setLng] = useState(-122.3321);
  const [lat, setLat] = useState(47.6062);
  const [zoom, setZoom] = useState(13);

  const mapContainer = useRef(null);

  const flyToFavorite = (currentFavorite) => {
    map.flyTo({
      center: currentFavorite.geometry.coordinates,
      zoom: 15,
    });
  }

  const createPopUp = (currentFavorite) => {
    const popUps = document.getElementsByClassName('mapboxgl-popup');
    
    if (popUps[0]) {
      popUps[0].remove();
    }

    const props = currentFavorite.properties;
    const street = props.blockface_name;
    const pattern = 'BETWEEN';
    const title = street.slice(0, street.indexOf(pattern));
    const between = street.substr(street.indexOf(pattern) + pattern.length);

    new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(currentFavorite.geometry.coordinates)
      .setHTML(`<p><b>${title}</b></p>
      <p>BETWEEN ${between}</p>
      <p>${props.meter_code}</p>`)
      .addTo(map);
  }

  const handleFavoriteClick = (e) => {
    for (let i = 0; i < favorites.features.length; i++) {
      if (e.target.id === `link-${favorites.features[i].properties.id}`) {
        const clickedFavorite = favorites.features[i];
        flyToFavorite(clickedFavorite);
        createPopUp(clickedFavorite);
      }
    }
  }

  useEffect(() => {
    // Initialize map
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [lng, lat],
      zoom,
    });

    setMap(map);

    map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    }));

    // Add navigation control (+/- buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    // Fetch data from API
    axios.get('/api/parking')
      .then(({ data }) => {
        data.forEach((row) => {
          const el = document.createElement('div');
          el.setAttribute("style", "background-image: url('./car-15.png'); background-size: cover; width: 15px; height: 15px; cursor: pointer;");

          const street = row.blockface_name;
          const pattern = 'BETWEEN';
          const title = street.slice(0, street.indexOf(pattern));
          const between = street.substr(street.indexOf(pattern) + pattern.length);

          new mapboxgl.Marker(el)
          .setPopup(
            new mapboxgl.Popup({ 
              className: 'popup' 
            }).setHTML(
              `<p><b>${title}</b></p>
              <p>BETWEEN ${between}</p>
              <p>${row.meter_code}</p>`
            )
          )
          .setLngLat([row.longitude, row.latitude])
          .addTo(map);
        })
      })
      .catch((err) => {
        throw new Error(err);
      });
    
    // Load user's favorites onto the map as a layer
    map.on('load', (e) => {
      map.loadImage(star15, (err, image) => {
        if(err) {
          throw err;
        }
        map.addImage('star-15', image)        
        map.addLayer({
          'id': 'favorites',
          'type': 'symbol',
          'source': {
            'type': 'geojson',
            'data': favorites,
          },
          'layout': {
            'icon-image': 'star-15',
            'icon-allow-overlap': true,
          },
        });
      });
    });

    // Clean up map on unmount
    // return () => map.remove();
  }, []);

  return (
    <div>
      <div className={styles.mapContainer} ref={mapContainer} />
      <div className={styles.sidebar}>
        <div className={styles.heading}>
          <h1>Favorites</h1>
        </div>
        <div className={styles.favorites}>
          {favorites.features.map((favorite) => {
            const props = favorite.properties;
            const street = props.blockface_name;
            const pattern = 'BETWEEN';
            const title = street.slice(0, street.indexOf(pattern));
            const between = street.substr(street.indexOf(pattern) + pattern.length);
            return (
              <div key={`favorite-${props.id}`} className={styles.item}>
                <a href="#" className={styles.title} id={`link-${props.id}`} onClick={handleFavoriteClick}>
                  {title} · {props.side_of_street}
                </a>
                <div className={styles.desc}>
                  <p>
                    {between}
                  </p>
                  <p>
                    {props.meter_code}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Map;
