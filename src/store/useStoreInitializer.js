import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeStore } from './intializeStore';

export const useStoreInitializer = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.data);

  useEffect(() => {
    const isStoreReady = user?.email;

    if (!isStoreReady) {
      initializeStore(dispatch);
    }
  }, [dispatch]);
};
