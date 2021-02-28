import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Brick from '../Brick/index';

function Wall({ clock, ballRef, vector }) {
    const wallData = useSelector(state => state.wall);
    const brickData = useSelector(state => state.brick);
    const [bricks, setBricks] = useState([]);
    const [collisionDetected, setCollisionDetected] = useState(false);

    useEffect(() => {
        let top = wallData.topOffset;
        let left = wallData.leftOffset;
        const aux = [];

        for (let i = 1; i <= 36; i++) { 
            aux.push({ top, left});
            left = left + brickData.width;
            if ( i % 6 === 0 ) {
                top = top + brickData.height;
                left = wallData.leftOffset;
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
                    ballRef={ballRef}
                    vector={vector}
                    collisionDetected={collisionDetected}
                    setCollisionDetected={setCollisionDetected}
                    />
        })
    );
}

export default Wall;