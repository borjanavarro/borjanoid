import React, { useState, useEffect, useRef} from 'react';
import { connect } from 'react-redux';
import useKeyboard from '../../utils/Keyboard';

import './styles.scss';

function Player({ boardData, playerData }) {
    let { leftMinPos, leftMaxPos } = boardData;
    leftMaxPos = leftMaxPos - playerData.width;
    const [position, setPosition] = useState(leftMinPos);
    const player = useRef();
    const keyDown = useKeyboard();

    useEffect( () => {
        if ( keyDown ) {
            const oldPosition = parseInt(player.current.style.left, 10);      

            if ( keyDown === 'ArrowLeft' ) {
                if ( oldPosition > leftMinPos ) {
                    setPosition( oldPosition - playerData.velocity );
                } else {
                    setPosition( leftMinPos );
                }
            } else if ( keyDown === 'ArrowRight' ) {
                if ( oldPosition < leftMaxPos ) {
                    setPosition( oldPosition + playerData.velocity );
                } else {
                    setPosition( leftMaxPos );
                }
            }
        }
    }, [keyDown, playerData.velocity, leftMaxPos, leftMinPos ]);

    return (
        <div id="player" ref={player} style={{
            bottom: - playerData.height,
            left: position
            }}>

        </div>
    );
}

const mapStateToProps = state => {
    return {
        boardData : state.board,
        playerData: state.player
    }
}

export default connect(mapStateToProps)(Player);
