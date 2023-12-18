import React from "react";
import NavBar from "./NavBar";
import CurrentlyPlayingCard from "../MusicPlayer/CurrentlyPlayingCard";
import SavedSongTable from "./SavedSongTable";
import Container from "react-bootstrap/Container";
import CreatePlaylist from "../Playlist/CreatePlaylist";
import SavedPlaylist from "../Playlist/SavedPlaylist";
import { useSpotify } from "../Spotify/SpotifyContext";
function HomePage() {
  const {
    setSavedTracks,
    savedTracks,
    userPlaylists,
    setUserPlaylists,
    accessToken,
    setAccessToken,
    setUserId,
    userId,
    refreshToken,
    setRefreshToken,
  } = useSpotify();
  return (
    <Container>
      <div className="nav-container">
        <NavBar />
      </div>
      <br />
      <div>
        <CurrentlyPlayingCard accessToken={accessToken} />
      </div>
      <div className="flex"></div>
      <div className="saved-song-table-container">
        <br />
        <br />
        <SavedSongTable />
        <br />
        <CreatePlaylist />
        <SavedPlaylist />
      </div>
      <br />
    </Container>
  );
}

export default HomePage;