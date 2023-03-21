import { useState, useRef, useEffect } from 'react';

import { useFetchGet } from '../../../hooks/fetchData/useFetchData';

import './DiscoverMap.scss';

import Sidebar from '../../../components/Sidebar/Sidebar';
import EnigmaCard from '../../../components/EnigmaCard/EnigmaCard';

import DiscoverBackground from '../../../assets/images/discover.png';

export default function DiscoverMap() {
  const { isLoading, data: enigmas, } = useFetchGet('enigmas', 'enigmas');

  return (
    <>
      <div className='discover-map'>
        <div className='enigmas'>
          { enigmas ? (enigmas.map(enigma => (
            <EnigmaCard enigma={enigma} key={enigma.id} path={`/enigme/${enigma.id}`}/>
          ))
          ) : (
            <div>
              {isLoading}
            </div>
          )
          }
        </div>
        <Sidebar />
        <img className='discover-background-image' src={DiscoverBackground} />
      </div>
    </>
  )
}
