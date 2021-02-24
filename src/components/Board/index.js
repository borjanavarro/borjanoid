import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Ball from '../Ball/index';
import Player from '../Player/index'
import updateData from '../../redux/actions/action'

import './styles.scss';

function Board({ updateBoardData, ballData }) {
    const [keyDown, setKeyDown] = useState(false);
    const board = useRef(null);

    useEffect(() => {
        document.addEventListener('keydown', (e) => setKeyDown(e.key));

        return document.removeEventListener('keydown', (e) => setKeyDown(e.key));
    }, [updateBoardData, ballData.size])

    return (
        <div className="center-board">
            <div className="board-container" ref={board} style={{
                width: 400,
                height: 600
            }}>
                <div id="board">
                    <Ball />
                </div>
                <Player keyDown={keyDown} setKeyDown={setKeyDown} />
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