import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import _ from 'lodash';
import music from '../images/music.jpeg';
import { getSpotify, getTADB } from '../utils/api';
import { SET_LOCATIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const PlayList = ({ playlist }) => {

  const dispatch = useDispatch();

  const [selectedPlaylist, setSelectedPlaylist] = useState('')
  useEffect(() => {
    selectedPlaylist &&
      getSpotify(`https://api.spotify.com/v1/playlists/${selectedPlaylist}`)
        .then((res) => res.tracks.items.map(item => {
          return item?.track?.artists[0]?.name
        }))
        // Only return the first 20 artists if React is in development mode
        // filters out undefined values
        .then(res => (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? res.slice(0, 20).filter(artist => artist !== undefined) : res)
        .then(res => {
          console.log(res[0][1])
          axios.get('http://localhost:4000/artistSearch', {
            params: { artist: res }
          })
            // .then(res => JSON.parse(res.data.body)?.artists?.[0].strCountryCode)
            .then(res => {
              dispatch({ type: SET_LOCATIONS, locations: res.data })
              console.log(res)
            })
            .catch(err => console.error(err))
        })

    return () => {

    }
  }, [selectedPlaylist])

  return (
    <div>
      {Object.keys(playlist).length > 0 && (
        <div className="playlist">
          {playlist.items.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <Card onClick={() => setSelectedPlaylist(item.id)} style={{ width: '18rem' }}>
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
