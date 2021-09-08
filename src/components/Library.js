import React from "react";

//components
import LibrarySong from "./LibrarySong";

const Library = ({
    songs,
    setCurrentSong,
    currentSong,
    audioRef,
    isPlaying,
    setSongs,
    libraryStatus,
}) => {
    //stuff

    //return
    return (
        <div className={`library ${libraryStatus ? "active-library" : ""}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map((song) => (
                    <LibrarySong
                        songs={songs}
                        song={song}
                        setCurrentSong={setCurrentSong}
                        currentSong={currentSong}
                        id={song.id}
                        key={song.id}
                        audioRef={audioRef}
                        isPlaying={isPlaying}
                        setSongs={setSongs}
                    />
                ))}
            </div>
        </div>
    );
};

export default Library;
