import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HomePage from './HomePage';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import Map from './Map';
import Favorites from './Favorites';
import styles from './styles/App.css';

const App = () => {
  const [page, setPage] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [signUpFailed, setSignUpFailed] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  let render = null;

  useEffect(() => {}, [page, favorites, signUpFailed, loginFailed]);

  /* REFACTOR LATER
  const getFavorites = async (email) => {
    axios.get('/api/parking/favorites', {
      params: {
        email,
      },
    })
    .then(({ data }) => {
      const features = formatFavorites(data);
      const favorites = {
        'type': 'FeatureCollection',
        features,
      };
      console.log(favorites);
      return favorites;
    });
  }; 
  */

  const formatFavorites = (favorites) => {
    const features = [];
    favorites.forEach((favorite) => {
      const feature = {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [
            favorite.longitude,
            favorite.latitude,
          ]  
        },
        'properties': {
          'meter_code': favorite.meter_code,
          'blockface_name': favorite.blockface_name,
          'side_of_street': favorite.side_of_street,
        } 
      };
      features.push(feature);
    });

    features.forEach((feature, i) => {
      feature.properties.id = i;
    });

    return features;
  };

  const handleSignUpClick = () => {
    setPage(1);
  };
    
  const handleLoginClick = () => {
    setPage(2);
  };

  const handleSignUpSubmit = (e, firstName, lastName, email, password) => {
    e.preventDefault();
    if (firstName.target === undefined ||
        lastName.target === undefined ||
        email.target === undefined ||
        password.target === undefined) {
          setSignUpFailed(true);
    } else {
      axios.post('/api/parking/users', {
        'firstName': firstName.target.value,
        'lastName': lastName.target.value,
        'email': email.target.value,
        'password': password.target.value,
      })
      .then(({ data }) => {
        if (Array.isArray(data)) {
          setPage(2);
          setSignUpSuccess(true);
        } else {
          setPage(1);
          setSignUpFailed(true);
        }
      })
    }
  }

  const handleLoginSubmit = (e, email, password) => {
    e.preventDefault();
    if (email.target === undefined || password.target === undefined) {
      setLoginFailed(true);
    } else {
      axios.get('/api/parking/users', {
        params: {
          'email': email.target.value,
          'password': password.target.value,
        },
      })
      .then(({ data }) => {
        const user = data;
        if (user.length > 0) {
          axios.get('/api/parking/favorites', {
            params: {
              'email': email.target.value,
            },
          })
          .then(({ data }) => {
            const features = formatFavorites(data);
            const favorites = {
              'type': 'FeatureCollection',
              features,
            };
            setFavorites(favorites);
            setPage(3);
          });
        } else {
          setSignUpSuccess(false);
          setPage(2);
          setLoginFailed(true);
        }
      });
    }
  }

  const handleBackClick = () => {
    setPage(0);
    setSignUpSuccess(false);
    setSignUpFailed(false);
    setLoginFailed(false);
  }

  if (page === 0) { // Home Page
    render = (
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <div className={styles.leftContent}>
            <h1>WePark</h1>
            <p>Parking simplified.</p>
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.rightContent}>
            <HomePage
              handleSignUpClick={handleSignUpClick}
              handleLoginClick={handleLoginClick}
            />
          </div>
        </div> 
      </div>
    )
  } else if (page === 1) { // Sign Up 
    render = (
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <div className={styles.leftContent}>
            <h1>WePark</h1>
            <p>Parking simplified.</p>
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.rightContent}>
            <SignUpForm 
              handleSignUpSubmit={handleSignUpSubmit}
              handleBackClick={handleBackClick}
              failed={signUpFailed}
            />
          </div>
        </div> 
      </div>
    )
  } else if (page === 2) { // Login
    render = (
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <div className={styles.leftContent}>
            <h1>WePark</h1>
            <p>Parking simplified.</p>
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.rightContent}>
            <LoginForm 
              handleLoginSubmit={handleLoginSubmit}
              handleBackClick={handleBackClick}
              signUpSuccess={signUpSuccess}
              failed={loginFailed}
            />
          </div>
        </div> 
      </div>
    )
  } else { // Map
    render = (
      <div className={styles.map}>
        <Map favorites={favorites}/>
      </div>
    )
  }
  return (
    <>
      {render}
    </>
  )
};

export default App;
