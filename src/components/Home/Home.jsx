import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchAsyncLaunches } from '../../features/spacex/spacexSlice';

import LaunchesContainer from '../Launches/LaunchesContainer';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncLaunches());
  }, [dispatch]);

  return (
    <div className='container'>
      <LaunchesContainer />
    </div>
  );
}
