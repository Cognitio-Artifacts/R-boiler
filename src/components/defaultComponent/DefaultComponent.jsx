import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect } from 'react';
import { getDataAction } from './actions'
import './defaultComponent.scss';
import { Timer } from "../Timer";

const DefaultComponent = () => {
  const storeData = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className='sectionHome-container'>
      {
        storeData?.loading
          ? <h1>🍅</h1>
          : <Timer/>
      }
    </section>
  );
}

export default DefaultComponent;
