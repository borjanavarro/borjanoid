import React from 'react';
import { useSelector } from 'react-redux';
import useBallPosition from '../../utils/BallPosition';

import './styles.scss';

function Ball({ ballRef }) {
    const [ ballTop, ballLeft ] = useBallPosition( ballRef );
    const ballData = useSelector( state => state.ball );

    return (
        <div id="ball" ref={ballRef} style={{
            top: ballTop,
            left: ballLeft,
            width: ballData.size,
            height: ballData.size,
            borderRadius: ballData.size
        }}></div>
    );
}

export default Ball;
