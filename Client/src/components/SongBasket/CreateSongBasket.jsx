import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import SongBasket from "./SongBasket";
import { useSpotify } from "../Spotify/SpotifyContext";

export const CreateSongBasket = () => {
  const { setSelectedBasketId, jwtUserId } = useSpotify(null);
  const [songBaskets, setSongBaskets] = useState([]);
  const [nextId, setNextId] = useState(0);

  const createSongBasketInBackend = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("Access token not found");
      return;
    }

    try {
      const response = await fetch("http://localhost:5556/create_song_basket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ user_id: jwtUserId }),
      });

      const data = await response.json();
      console.log("New Song Basket Created with ID:", data.basket_id);
    } catch (error) {
      console.error("Error creating song basket:", error);
    }
  };

  const handleAddSongBasket = () => {
    const newBasket = {
      id: nextId,
    };
    setSongBaskets([...songBaskets, newBasket]);
    setNextId(nextId + 1);
    setSelectedBasketId(nextId);
    createSongBasketInBackend();
  };

  return (
    <div>
      <Button variant="faded" onClick={handleAddSongBasket}>
        Create a new song basket
      </Button>
      {songBaskets.map((basket, index) => (
        <SongBasket key={basket.id} id={basket.id} />
      ))}
    </div>
  );
};
