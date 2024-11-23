import {
  useGetAllSongsQuery,
  useGetArtistsQuery,
  useGetNewSongsQuery,
  useGetOldSongsQuery,
  useGetPlaylistsQuery,
  useGetPlaylistTracksQuery,
  useGetTrendingSongsQuery,
} from "../features/AudiusSlice";

const useRtkHooks = (query) => {
  const trending = useGetTrendingSongsQuery("getTrendingSongs", {
    skip: query !== "trending",
  });
  const newSongs = useGetNewSongsQuery("getNewSongs", {
    skip: query !== "NewSongs",
  });
  const OldSongs = useGetOldSongsQuery("getOldSongs", {
    skip: query !== "OldSongs",
  });
  const AllSongs = useGetAllSongsQuery("getAllSongs", {
    skip: query !== "AllSongs",
  });
  const Artists = useGetArtistsQuery("getArtists", {
    skip: query !== "artists",
  });
  const Playlists = useGetPlaylistsQuery("getPlaylists", {
    skip: query !== "playlists",
  });
  const PlayListTracks = useGetPlaylistTracksQuery("getPlaylisyTracks", {
    skip: query !== "playlisttracks",
  });
  let method;
  switch (query) {
    case "trending":
      method = trending;
      break;
    case "NewSongs":
      method = newSongs;
      break;
    case "OldSongs":
      method = OldSongs;
      break;
    case "AllSongs":
      method = AllSongs;
      break;
    case "artists":
      method = Artists;
      break;
    case "playlists":
      method = Playlists;
      break;
    case "playlisttracks":
      method = PlayListTracks;
  }

  const { data: songs, isLoading, isSuccess, isError, error } = method;

  return {songs,isLoading,isSuccess,isError,error}
};

export default useRtkHooks;
