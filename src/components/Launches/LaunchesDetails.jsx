import React, { useState } from 'react';
import moment from 'moment';

export default function LaunchesDetails({ data, term }) {
  const [showDetails, setShowDetails] = useState(false);

  const ShowDetailsClickHandler = () => {
    setShowDetails(!showDetails);
  };

  const dateFormatter = (date) => {
    return moment(date, 'YYYYMMDD').fromNow();
  };

  let renderStatus;

  if (data.upcoming) {
    renderStatus = (
      <span
        className='d-inline-block fw-bold px-1  mb-4'
        style={{ backgroundColor: '#6DFBFB', fontSize: '12px' }}
      >
        upcoming
      </span>
    );
  } else {
    if (data.launch_success) {
      renderStatus = (
        <span
          className='d-inline-block fw-bold px-1  mb-4'
          style={{ backgroundColor: '#73F440', fontSize: '12px' }}
        >
          success
        </span>
      );
    } else {
      renderStatus = (
        <span
          className='d-inline-block fw-bold px-1  mb-4 bg-danger'
          style={{ color: '#fff', fontSize: '12px' }}
        >
          failed
        </span>
      );
    }
  }

  return (
    <div className='card text-start mb-3'>
      <div className='card-body'>
        <h5
          className='card-title d-inline-block'
          style={{ marginRight: '10px' }}
        >
          {data.mission_name}
        </h5>
        {renderStatus}
        <div className='details mb-4'>
          <div
            className='card-subtitle mb-2 text-muted mb-4'
            style={{ fontSize: '12px', color: 'black' }}
          >
            {dateFormatter(data.launch_year)}{' '}
            {data.links.article_link !== null && (
              <a
                href={data.links.article_link}
                className='text-decoration-none'
              >
                | Article{' '}
              </a>
            )}
            {data.links.video_link !== null && (
              <a href={data.links.video_link} className='text-decoration-none'>
                | Video
              </a>
            )}
          </div>
        </div>

        {showDetails && (
          <div className='row mb-4'>
            <div className='col-4 text-center'>
              {data.links.mission_patch_small !== null ? (
                <img src={data.links.mission_patch_small} />
              ) : (
                <p className='fst-italic fw-light'>No image yet</p>
              )}
            </div>
            <div className='col-8'>
              {data.details ? (
                data.details
              ) : (
                <p className='fst-italic fw-light'>No details yet</p>
              )}
            </div>
          </div>
        )}

        <button className='btn btn-primary' onClick={ShowDetailsClickHandler}>
          {showDetails ? 'HIDE' : 'VIEW'}
        </button>
      </div>
    </div>
  );
}
