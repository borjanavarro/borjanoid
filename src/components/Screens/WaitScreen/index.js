import React, { useState, useEffect, useRef } from 'react';
import { GAME_SCREEN } from '../constants'; 

import './styles.scss'

function WaitScreen({ setScreens }) {
    const [counter, setCounter] = useState(3);
    const elem = useRef();

    useEffect(() => {
        let interval;

        const main = () => {
            interval = setInterval(() => {
                elem.current.classList.remove('big');
                setCounter(counter - 1);
                if ( counter === 0 ) {
                    setScreens(GAME_SCREEN);
                }
            }, 1000);
        }

        main();
        

        return () => {clearInterval(interval);}
    }, [counter, setScreens])

    return (
        <div className="container">
            <div className="counter" ref={elem}>{counter}</div>
        </div>
    );
}

export default WaitScreen;