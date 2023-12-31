import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure,
} from "@nextui-org/react";
import PlaylistDetails from "./PlaylistDetails";
import { useSpotify } from "../Spotify/SpotifyContext";
import NavBar from "../Home/NavBar";
export default function Playlist() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const { playlists, setPlaylists } = useSpotify(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;

    const fetchUserPlaylists = async () => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/me/playlists`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setPlaylists(data.items); // Update your state with the fetched playlists
        } else {
          console.error("Error fetching user playlists:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user playlists:", error);
      }
    };

    fetchUserPlaylists();
  }, []);

  const openModalWithPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
    onOpen();
  };

  if (!playlists || playlists.length === 0) {
    return <p>No playlists available.</p>;
  }

  return (
    <div>
      <NavBar />
      <Table aria-label="User Playlists" css={{ cursor: "pointer" }}>
        <TableHeader>
          <TableColumn>Playlist Name</TableColumn>
        </TableHeader>
        <TableBody>
          {playlists.map((playlist) => (
            <TableRow
              key={playlist.id}
              onClick={() => openModalWithPlaylist(playlist)}
              css={{ cursor: "pointer" }}
            >
              <TableCell>{playlist.name || "N/A"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PlaylistDetails
        playlist={selectedPlaylist}
        isOpen={isOpen}
        onClose={onOpenChange}
        setPlaylists={setPlaylists}
      />
    </div>
  );
}
