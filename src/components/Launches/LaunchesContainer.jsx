import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
  getAllLaunches,
  getIsLoading,
} from '../../features/spacex/spacexSlice';

import LaunchesDetails from './LaunchesDetails';

export default function LaunchesContainer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState('');

  const spaceXLaunches = useSelector(getAllLaunches);
  const fetchedIsLoading = useSelector(getIsLoading);

  useEffect(() => {
    setSearchResults(spaceXLaunches);
  }, [spaceXLaunches]);

  const inputHandler = (e) => {
    //convert input text to lower case
    const inputText = e.target.value.toLowerCase();
    setSearchTerm(inputText);

    if (searchTerm !== '') {
      const filteredLaunches = spaceXLaunches.filter((launch) => {
        return Object.values(launch)
          .join(' ')
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(filteredLaunches);
    } else {
      setSearchResults(spaceXLaunches);
    }
  };

  let renderLaunches = '';

  if (fetchedIsLoading === true) {
    renderLaunches = <p className='fw-bold'>Loading data...</p>;
  }

  if (searchResults.length === 0) {
    <div>
      <h3 className='fw-bold'>No data</h3>
    </div>;
  } else {
    renderLaunches = searchResults.map((launch, index) => {
      return <LaunchesDetails key={index} data={launch} term={searchTerm} />;
    });
  }

  return (
    <div className='mt-5 mb-5 bg-light px-5 py-5'>
      <h1 className='mb-5'>SpaceX API</h1>

      <div className='search'>
        <div className='mb-3'>
          <input
            type='text'
            className='form-control'
            id='launchSearch'
            placeholder='Search...'
            onChange={inputHandler}
          ></input>
        </div>
      </div>

      {/* <Searchbar /> */}
      {renderLaunches}
    </div>
  );
}
