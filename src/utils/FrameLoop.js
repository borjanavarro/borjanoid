/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect } from 'react'

const useFrameLoop = (callback) => {

    const requestID = useRef();
    const previousTime = useRef();

    const loop = time => {
        if (previousTime.current !== undefined) {
            const deltaTime = time - previousTime.current;
            callback(time, deltaTime);
        }

        previousTime.current = time;
        requestID.current = requestAnimationFrame(loop);
    }
    
    useEffect(()=>{
        requestID.current = requestAnimationFrame(loop);
        
        return ()=> cancelAnimationFrame(requestID.current);
    }, []);
}

export default useFrameLoop;
