import React, { useState, useEffect, useRef} from 'react';
import { connect } from 'react-redux';

import './styles.scss';

function Player({boardData}) {
    

    const { leftMinPos, leftMaxPos } = boardData;

    let velocity = 1;
    let width = 100;
    let height = 20;
    let borderWidth = 10;

    const [position, setPosition] = useState(borderWidth);
    const player = useRef();

    useEffect(() => {
        document.addEventListener('keydown', movePlatform);

        return document.removeEventListener('onkeydown', movePlatform);
    })

    const movePlatform = (e) => {
        const oldPosition = parseInt(player.current.style.left, 10);

        if ( e.keyCode === 37 /*left key */ && oldPosition - borderWidth >= leftMinPos ) {
            setPosition( oldPosition - velocity);

        } else if ( e.keyCode === 39 /*right key */ && oldPosition + borderWidth + width <= leftMaxPos ) {
            setPosition( oldPosition + velocity);
        }
    }

    return (
        <div id="player" ref={player} style={{
            bottom: - height,
            left: position
            }}>

        </div>
    );
}

const mapStateToProps = state => {
    return {
        boardData : state.board, 
        ballData: state.ball
    }
}

export default connect(mapStateToProps)(Player);
