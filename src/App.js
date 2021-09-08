import React, { useState, useRef } from "react";

//styles
import "./styles/App.scss";

//componenets
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
import Nav from "./components/Nav";
//import util
import data from "./util";

function App() {
    //ref
    const audioRef = useRef(null);
    //state
    const [songs, setSongs] = useState(data());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);

    //state
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0,
    });
    const [libraryStatus, setLibraryStatus] = useState(false);

    const timeUpdateHandler = (e) => {
        //update song info
        const current = e.target.currentTime;
        const duration = e.target.duration;
        //calculate percentage
        const roundedCurrent = Math.round(current);
        const roundedDuration = Math.round(duration);
        const animation = Math.round((roundedCurrent / roundedDuration) * 100);
        setSongInfo({
            ...songInfo,
            currentTime: current,
            duration,
            animationPercentage: animation,
        });
    };
    const songEndHandler = async () => {
        let currentIndex = songs.findIndex(
            (song) => song.id === currentSong.id
        );
        await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        if (isPlaying) audioRef.current.play();
    };
    return (
        <div className={`App ${libraryStatus ? "library-active" : ""}`}>
            <Nav
                libraryStatus={libraryStatus}
                setLibraryStatus={setLibraryStatus}
            />
            <Song currentSong={currentSong} />
            <Player
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                currentSong={currentSong}
                audioRef={audioRef}
                setSongInfo={setSongInfo}
                songInfo={songInfo}
                songs={songs}
                setCurrentSong={setCurrentSong}
                setSongs={setSongs}
            />
            <Library
                songs={songs}
                setCurrentSong={setCurrentSong}
                currentSong={currentSong}
                audioRef={audioRef}
                isPlaying={isPlaying}
                setSongs={setSongs}
                libraryStatus={libraryStatus}
            />
            <audio
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={timeUpdateHandler}
                ref={audioRef}
                src={currentSong.audio}
                onEnded={songEndHandler}
            ></audio>
        </div>
    );
}

export default App;
