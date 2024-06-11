import { useEffect, useRef, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch';
import LocationCard from './components/LocationCard';
import ResidentCard from './components/ResidentCard';

function App() {
  
  const randomId = Math.floor(Math.random() * 126) + 1;
  const [inputValue, setInputValue] = useState(randomId)
  const [location, getLocation, isLoading, hasError] = useFetch();

    useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${inputValue}`;
    getLocation(url);
  }, [inputValue]);

   const textInput = useRef();

   const handleSumit = (event) => {
    event.preventDefault();
    setInputValue(textInput.current.value.trim().toLowerCase());
    textInput.current.value = '';
   }

   console.log(inputValue);
  
  return (
  <div className='app'>
    {
      isLoading ?
      <h2>Loading...</h2>
      :
      <>
        <figure className='app__img'>
          <img src="https://s3-alpha-sig.figma.com/img/2838/9946/263f7612d0101b6aa67c8b9f233f19fb?Expires=1719187200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ik09mT7QHBHnqwmabvHEwaqxn182JTEuKIlYkmaCNG5HXWu0SkHmf8-ltiFRH4yj2gZeWRxQOQj~UeLR6DHBnyls6jlEf9fZQX0p-rJ0Dlw3grsfIOVf8Z7x~BRaaG6qWNix4wYkSI-YXQTCJky-~2viIi35J8P6LR52v34YGhL61IObeJPGFRGjBFpGw6UK-uYAKSSJqAUa6T-cBoPuGoDuoO-LMRmsnRekX7DY8lpQZRJ-m-vJoLw33BVdHZM~YIwjq7Hugco5YckL3d2f1dsmQMzKC8wM3TVustD7hp1McrKuOlwXtIZp2j6~k7lDDlKSE~L-aM3X~mN6O2Mr0Q__"  width="900" height="200" alt="RickAndMorty image" />
        </figure>
        <form className='app__form' onSubmit={handleSumit}>
          <input className='app__form-input' ref={textInput} type="number" />
          <button className='app__form-btn'>Search</button>
        </form>
        {
          hasError || !+inputValue ?
          <h2>❌ Hey! you must provide an id from 1 to 126 😒</h2>
          :
          <>
              <LocationCard
                info={location}
             />
              <div className='app__container'>
               {
                location?.residents.map((character) => (
                  <ResidentCard 
                    key={character}
                    info={character}
                  />
                ))
              }
        </div>
        </>
        }
        
     </>
    }
    
  </div>
  )
}

export default App
