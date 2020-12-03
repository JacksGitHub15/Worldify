import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import music from '../images/music.jpeg';
import { getSpotify } from '../utils/api';
import { SET_LOCATIONS } from '../utils/constants';

const PlayList = ({ playlist }) => {
  const dispatch = useDispatch();

  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    selectedPlaylist &&
      getSpotify(`https://api.spotify.com/v1/playlists/${selectedPlaylist}`)
        .then((atrists) =>
          atrists.tracks.items.map((item) => {
            return item?.track?.artists[0]?.name;
          })
        )
        // Only return the first 20 artists if React is in development mode
        // filters out undefined values
        .then((artists) =>
          !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
            ? artists.slice(0, 20).filter((artist) => artist !== undefined)
            : artists
        )
        .then((artists) => {
          axios
            .get('http://localhost:4000/artistSearch', {
              params: { artist: artists },
            })
            // .then(res => JSON.parse(res.data.body)?.artists?.[0].strCountryCode)
            .then((locations) => {
              dispatch({ type: SET_LOCATIONS, locations: locations.data });
              console.log(locations);
            })
            .catch((err) => console.error(err));
        });

    return () => {};
  }, [selectedPlaylist]);

  return (
    <div>
      {Object.keys(playlist).length > 0 && (
        <div className="playlist">
          {playlist.items.map((item) => {
            return (
              <React.Fragment key={item.id}>
                <Card
                  onClick={() => setSelectedPlaylist(item.id)}
                  style={{ width: '18rem' }}
                >
                  {/* <a
                    target="_blank"
                    href={item.external_urls.spotify}
                    rel="noopener noreferrer"
                    className="card-image-link"
                  > */}
                  {!_.isEmpty(item.images) ? (
                    <Card.Img variant="top" src={item.images[0].url} alt="" />
                  ) : (
                    <img src={music} alt="" />
                  )}
                  {/* </a> */}
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      <small>By {item.owner.display_name}</small>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PlayList;
