import React, {useState, useEffect, useRef} from 'react';

function Stopwatch() {

    const [isRunning, setIsRunning] = useState(false);
    const[elapsedTime, setElapsedTime] = useState(0); // 0 ms
    const intervalIdRef = useRef(null); // interval?
    const startTimeRef = useRef(0); // start time

    // useEffect hook; pass in a function and a dependency array
    useEffect(() => {

        if(isRunning){
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current); // what it says on the tin
            }, 10);
        }

        return() => { // cleanup function (?) - stop interview from continuing
            // to prevent unexpected behavior
            clearInterval(intervalIdRef.current); // would call same time again and again
        }


    }, [isRunning]); // state var in dependency array; if isRunning changes this is called?

    useEffect(() => {
        document.title = formatTimehms();
    }, [elapsedTime]);


    function start() {
        setIsRunning(true); // set state to true
        startTimeRef.current = Date.now() - elapsedTime; // start time to current time (epoch) - current stopwatch time
    }

    function stop() {
        setIsRunning(false); // set state to false
    }

    function reset() {
        setElapsedTime(0);
        setIsRunning(false);
    }

    function formatTimehmsm() {
        // return `00:00:00`;
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60)); // 1000 ms in s, 60 s in min, 60 min in hr
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60); // reset to 0 every 60 seconds
        let seconds = Math.floor(elapsedTime / 1000 % 60); // every 1000 ms (I think?)
        let milliseconds = Math.floor(elapsedTime % 1000 / 10); // display only the first 2 digits with that last "/ 10"

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");
        return `${hours}:${minutes}:${seconds}:${milliseconds}`;
        // return `${minutes}:${seconds}:${milliseconds}`;
    }
    function formatTimehms() {
        // return `00:00:00`;
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60)); // 1000 ms in s, 60 s in min, 60 min in hr
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60); // reset to 0 every 60 seconds
        let seconds = Math.floor(elapsedTime / 1000 % 60); // every 1000 ms (I think?)
        // let milliseconds = Math.floor(elapsedTime % 1000 / 10); // display only the first 2 digits with that last "/ 10"

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        // milliseconds = String(milliseconds).padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
        // return `${minutes}:${seconds}:${milliseconds}`;
    }

    return(
        <div className="stopwatch">
            <div className='display'>{formatTimehmsm()}</div>
            <div className='controls'>
                <button onClick={start} className='start-button'>Start</button>
                <button onClick={stop} className='stop-button'>Stop</button>
                <button onClick={reset} className='reset-button'>Reset</button>
            </div>

        </div>
    );

}

export default Stopwatch;