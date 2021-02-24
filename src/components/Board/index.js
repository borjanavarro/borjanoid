import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Ball from '../Ball/index.js';
import updateData from '../../redux/actions/action'

import './styles.scss';

function Board({clock, updateBoardData}) {
    const [loading, setLoading] = useState(false);

    const lateralMargin = 20;
    

    useEffect( () => {
        const w = window.innerWidth;
        const h = window.innerHeight;

        updateBoardData({
            topMinPos: lateralMargin,
            topMaxPos: h - lateralMargin,
            leftMinPos: lateralMargin,
            leftMaxPos: w - lateralMargin,
            margin: lateralMargin
        });

        // setLoading(true);
    }, [])

    return (
        <div id="board">
            <Ball clock={clock} loading={loading} />
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return { updateBoardData: (data) => dispatch( updateData(data)) };
}

export default connect(null, mapDispatchToProps)(Board);