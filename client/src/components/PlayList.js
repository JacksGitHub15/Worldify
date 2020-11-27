import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import _ from 'lodash';
import music from '../images/music.jpeg';
import { get } from '../utils/api';
import { SET_TRACKARTISTS } from '../utils/constants';
import { useDispatch } from 'react-redux';

const PlayList = ({ playlist }) => {

  const dispatch = useDispatch();

  const [selectedPlaylist, setSelectedPlaylist] = useState('')
  useEffect(() => {
    selectedPlaylist &&
      get(`https://api.spotify.com/v1/playlists/${selectedPlaylist}`).then((res) => res.tracks.items.map(item => {
        return item?.track?.name, item?.track?.artists[0]?.name
      })).then(res => (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? res.slice(0, 20).filter(artist => artist === undefined) :res)
        .then(res => {
          dispatch({ type: SET_TRACKARTISTS, trackArtists: res })
          console.log(res)
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
