import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Ball from '../Ball/index';
import Player from '../Player/index';
import updateData from '../../redux/actions/action';
import useKeyboard from '../../utils/Keyboard';

import './styles.scss';

function Board({ updateBoardData, ballData }) {
    const pauseRef = useRef(true);
    const board = useRef(null);
    const keyDown = useKeyboard();

    useEffect(() => {
        if ( keyDown === 'Space' ) {
            pauseRef.current = true;
        } else if ( keyDown === 'Esc' ) {
            pauseRef.current = pauseRef.current ? false: true;
        }
    }, [keyDown])

    return (
        <div className="center-board">
            <div className="board-container" ref={board} style={{
                width: 400,
                height: 600
            }}>
                <div id="board">
                    <Ball pauseRef={pauseRef} />
                </div>
                <Player pauseRef={pauseRef} />
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ballData: state.ball
     }
}

const mapDispatchToProps = dispatch => {
    return { updateBoardData: (data) => dispatch( updateData(data)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);