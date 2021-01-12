import React, { useRef, useState, useEffect } from 'react';
import Globe from 'react-globe.gl';
import axios from 'axios';
import useWindowSize from '../utils/hooks';

function GlobeCpmt(props) {
  const globeEl = useRef();
  const [countries, setCountries] = useState({ features: [] });
  const [usedCountries, setUsedCountries] = useState([]);
  const [locs, setLocs] = useState([]);
  const { arcs } = props;

  const size = useWindowSize();

  const getRandomColor = (geojson) => {
    return usedCountries.includes(geojson.properties.ISO_A2)
      ? 'rgba(79, 219, 121, 0.5)'
      : 'rgba(0, 27, 54, 0.0)';
    // return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
    //   Math.random() * 255
    // )}, ${Math.floor(Math.random() * 255)}, 0.6)`;
  };

  useEffect(() => {
    // load data
    axios
      .get('./data/ne_110m_admin_0_countries.geojson')
      .then((res) => res.data)
      .then((res) => {
        setCountries(res);
      });
  }, []);

  useEffect(() => {
    const keys = ['endLat', 'endLng', 'startLat', 'startLng'];
    const tempCountries = [];
    const ret = arcs.map((item) => {
      const r = {};
      console.log(item[0]);
      tempCountries.push(item[0]);
      for (let i = 1; i < 5; i += 1) {
        r[keys[i - 1]] = item[i];
      }
      return r;
    });
    setUsedCountries(tempCountries);
    console.log(usedCountries);
    console.log('Arcs:', arcs);
    console.log(ret);
    setLocs(ret);
  }, [arcs]);

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
      backgroundImageUrl="./images/starBackground.jpg"
      arcsData={locs}
      arcStroke={2}
      polygonsData={countries.features}
      polygonCapColor={getRandomColor}
      polygonSideColor={() => 'rgba(0, 100, 0, 0.15)'}
      polygonLabel={({ properties: d }) => `
        <b>${d.ADMIN}</b> <br />
        # of songs: ${usedCountries.filter((x) => x === d.ISO_A2).length}
      `}
      // polygonsTransitionDuration={transitionDuration}
    />
  );
}

export default GlobeCpmt;
