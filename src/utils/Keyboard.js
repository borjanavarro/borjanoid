import { useState, useEffect } from 'react'

const useKeyboard = () => {
    const [keyDown, setKeyDown] = useState(false);

    useEffect(() => {
        document.addEventListener('keydown', (e) => setKeyDown(e.code));

        return document.removeEventListener('keydown', (e) => setKeyDown(e.code));
    }, [])

    useEffect(() => {
        setTimeout(() => setKeyDown(false), 17);
    }, [keyDown])

    return keyDown;
}

export default useKeyboard;