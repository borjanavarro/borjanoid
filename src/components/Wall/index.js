import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Brick from '../Brick/index';

function Wall({ clock, ballTop, setBallTop, ballLeft, setBallLeft, vector }) {
    const ballData = useSelector(state => state.wall);
    const brickData = useSelector(state => state.brick);
    const [bricks, setBricks] = useState([]);

    useEffect(() => {
        let top = ballData.topOffset;
        let left = ballData.leftOffset;
        const aux = [];

        for (let i = 1; i <= 10; i++) { 
            aux.push({ top, left});
            left = left + brickData.width;
            if ( i % 10 === 0 ) {
                top = top + brickData.height;
                left = ballData.leftOffset;
            }
        }
        setBricks(aux);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        bricks.map( (elem, index) => {
            return <Brick 
                    key={index}
                    clock={clock}
                    brickTop={elem.top} 
                    brickLeft={elem.left} 
                    ballTop={ballTop}
                    setBallTop={setBallTop}
                    ballLeft={ballLeft}
                    setBallLeft={setBallLeft}
                    vector={vector}
                    />
        })
    );
}

export default Wall;