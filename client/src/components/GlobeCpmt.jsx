import React, { useRef, useState, useEffect } from 'react';
import Globe from 'react-globe.gl';
import axios from 'axios';
import useWindowSize from '../utils/hooks';

function GlobeCpmt(props) {
  const globeEl = useRef();
  const [countries, setCountries] = useState({ features: [] });
  const [locs, setLocs] = useState([]);
  const { arcs } = props;

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
      });
  }, []);

  useEffect(() => {
    const keys = ['endLat', 'endLng', 'startLat', 'startLng'];

    const ret = arcs.map((item) => {
      const r = {};
      for (let i = 0; i < 4; i += 1) {
        r[keys[i]] = item[i];
      }
      return r;
    });
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
      arcsData={locs}
      arcStroke={2}
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
