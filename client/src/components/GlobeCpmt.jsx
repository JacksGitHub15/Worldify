import React, { useRef, useState, useEffect } from 'react';
import Globe from 'react-globe.gl';
import axios from 'axios';


function GlobeCpmt(props) {
    const globeEl = useRef();
    const [countries, setCountries] = useState({ features: [] });
    const [latlong, setLatlong] = useState({})
    const [arcs, setArcs] = useState(['GB', 'US'])
    const [userLocation, setUserLocation] = useState(['IE', 53, -8])
    const [transitionDuration, setTransitionDuration] = useState(1000);

    const size = useWindowSize();

    const getRandomColor = () => {
        return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`;
    }

    useEffect(() => {
        // load data
        axios.get('./data/ne_110m_admin_0_countries.geojson')
            .then(res => res.data)
            .then(countries => {
                setCountries(countries);

                // setTimeout(() => {
                //     setTransitionDuration(4000);
                //     setAltitude(() => feat => Math.max(0.1, Math.sqrt(+feat.properties.POP_EST) * 7e-5));
                // }, 3000);
            });
        axios.get('./data/country-codes-lat-long-alpha3.json')
            .then(res => res.data)
            .then(data => {
                setLatlong(data)
            })
    }, []);

    useEffect(() => {
        // Auto-rotate
        globeEl.current.controls().autoRotate = true;
        globeEl.current.controls().autoRotateSpeed = 0.3;

        globeEl.current.pointOfView({ altitude: 4 }, 5000);
    }, []);

    return (
        <Globe
            width={size.width * .9}
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
};

function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: document.body.clientWidth,
                height: window.innerHeight,
            });
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}

export default GlobeCpmt;