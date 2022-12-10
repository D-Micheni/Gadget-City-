import React, { useEffect, useRef, useState} from 'react'
import { Slides as slides } from './Data';
import SlideDots from './Slidedots';

export default function SliderShow() {
    const [index, setIndex] = useState(0);
    const delay = 5000;
    const timeoutRef = useRef(null);
    function resetTimeout() {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
    }
    useEffect(() => {
      resetTimeout();
      timeoutRef.current = setTimeout(
        () =>
          setIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
          ),
        delay
      );
      return () => {
        resetTimeout();
      };
    }, [index]);

  return (
    <div className='slideshow-container'>
      <div className='mySlides fade' style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
        {slides.map((item, index) =>
          <div key={index} className="slider">
            <img src={item.url} alt="" style={{width: "100%"}}/>
            <div className='text'>{item.text}</div>
          </div>
        )}
      </div>
      <SlideDots slides={slides} index={index} setIndex={setIndex}/>
    </div>
  )
}
