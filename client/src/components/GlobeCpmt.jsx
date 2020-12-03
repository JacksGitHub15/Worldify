import React, { useRef, useState, useEffect } from 'react';
import Globe from 'react-globe.gl';
import axios from 'axios';
import useWindowSize from '../utils/hooks';

function GlobeCpmt() {
  const globeEl = useRef();
  const [countries, setCountries] = useState({ features: [] });
  // TODO: latitudes
  // eslint-disable-next-line no-unused-vars
  const [latlong, setLatlong] = useState({});
  // const [arcs, setArcs] = useState(["GB", "US"]);
  // const [userLocation, setUserLocation] = useState(["IE", 53, -8]);
  // const [transitionDuration, setTransitionDuration] = useState(1000);

  const size = useWindowSize();

  const getRandomColor = () => {
    return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)}, 0.6)`;
  };

  useEffect(() => {
    // load data
    axios
      .get('./data/ne_110m_admin_0_countries.geojson')
      .then((res) => res.data)
      .then((res) => {
        setCountries(res);

        // setTimeout(() => {
        //     setTransitionDuration(4000);
        //     setAltitude(() => feat => Math.max(0.1, Math.sqrt(+feat.properties.POP_EST) * 7e-5));
        // }, 3000);
      });
    axios
      .get('./data/country-codes-lat-long-alpha3.json')
      .then((res) => res.data)
      .then((data) => {
        setLatlong(data);
      });
  }, []);

  useEffect(() => {
    // Auto-rotate
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.3;

    globeEl.current.pointOfView({ altitude: 4 }, 5000);
  }, []);

  return (
    <Globe
      width={size.width * 0.9}
      height={window.innerHeight / 2}
      ref={globeEl}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
      polygonsData={countries.features}
      // polygonAltitude={altitude}
      polygonCapColor={getRandomColor}
      polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
      polygonLabel={({ properties: d }) => `
        <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
        Population: <i>${Math.round(+d.POP_EST / 1e4) / 1e2}M</i>
      `}
      // polygonsTransitionDuration={transitionDuration}
    />
  );
}

export default GlobeCpmt;
