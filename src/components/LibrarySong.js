import React from "react";

const LibrarySong = ({
    song,
    songs,
    setCurrentSong,
    currentSong,
    id,
    audioRef,
    isPlaying,
    setSongs,
}) => {
    //stuff
    const songSelectHandler = async () => {
        //change song
        await setCurrentSong(song);
        //add active state
        const newSongs = songs.map((song) => {
            if (song.id === id) {
                return {
                    ...song,
                    active: true,
                };
            } else {
                return {
                    ...song,
                    active: false,
                };
            }
        });
        //set songs
        setSongs(newSongs);
        //check if song is playing
        if (isPlaying) audioRef.current.play();
    };
    return (
        <div
            onClick={songSelectHandler}
            className={`library-song ${
                song.id === currentSong.id ? "selected" : ""
            }`}
        >
            <img alt={song.name} src={song.cover}></img>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
};

export default LibrarySong;
