import { createContext, useContext, useState, useEffect } from "react";

export const SpotifyContext = createContext(null);

export const useSpotify = () => useContext(SpotifyContext);

export const SpotifyProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [savedTracks, setSavedTracks] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);
  console.log("user id:", userId);
  console.log("refresh token:", refreshToken);

  useEffect(() => {
    if (!refreshToken) return;

    const storeRefreshTokenInBackend = async () => {
      try {
        const response = await fetch(
          "http://localhost:5556/store_refresh_token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: userId,
              refresh_token: refreshToken,
            }),
          }
        );

        const data = await response.json();
        console.log("SRTIB: ", response);
        console.log("Response from backend:", data);
      } catch (error) {
        console.error("Error storing refresh token:", error);
      }
    };

    storeRefreshTokenInBackend();
  }, [refreshToken, userId]);

  return (
    <SpotifyContext.Provider
      value={{
        accessToken,
        setAccessToken,
        userId,
        setUserId,
        refreshToken,
        setRefreshToken,
        savedTracks,
        setSavedTracks,
        userPlaylists,
        setUserPlaylists,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};