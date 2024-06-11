import React, { useEffect } from 'react'
import useFetch from '../hooks/useFetch'
import './styles/residentCard.css';

const ResidentCard = ({info}) => {

    const [resident, getResident] = useFetch();

    useEffect(() => {
      getResident(info)
    }, [])
    
  return (
    <article className='residentCard'>
        <figure className='residentCard__img'>
            <img src={resident?.image} alt="character image" />
            <figcaption className='residentCard__status'>
                <div className={`residentCard__circle ${resident?.status}`}></div>
                <span>{resident?.status}</span>
            </figcaption>
        </figure>
        <h2 className='residentCard__name'>{resident?.name}</h2>
        <hr className='residentCard__separator'/>
        <ul className='residentCard__list'>
            <li className='residentCard__item'><span>Specie</span><span>{resident?.species}</span></li>
            <li className='residentCard__item'><span>Origin</span><span>{resident?.origin.name}</span></li>
            <li className='residentCard__item'><span>Episodes where appear</span>{resident?.episode.length}<span></span></li>
        </ul>
    </article>
  )
}

export default ResidentCard