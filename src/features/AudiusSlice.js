import { createEntityAdapter } from "@reduxjs/toolkit";
import { audiusApiSlice } from "./api/AudiusApiSlice";

const audiusAdapter = createEntityAdapter({});

export const extendedAudiusSlice = audiusApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSongs: builder.query({
      query: () => "/playlists/NY33OEZ/tracks",
      transformResponse: (response)=>{
        return audiusAdapter.setAll(audiusAdapter.getInitialState(),response.data)
      },
      providesTags: (result, error, arg) => [
        { type: "ALLSONGS", id: "LIST" },
        ...result?.ids?.map((id) => ({ type: "ALLSONGS", id })) || []
      ],
    }),

    getNewSongs: builder.query({
      query: () => "/tracks/trending/underground",
      transformResponse: (response)=>{
        return audiusAdapter.setAll(audiusAdapter.getInitialState(),response.data)
      },
      providesTags: (result, error, arg) => [
        { type: "NEWSONGS", id: "LIST" },
        ...result?.ids?.map((id) => ({ type: "NEWSONGS", id })) || []
      ],
    }),
    getOldSongs: builder.query({
      query: () => "/playlists/6NoW049/tracks",
      transformResponse: (response)=>{
        return audiusAdapter.setAll(audiusAdapter.getInitialState(),response.data)
      },
      providesTags: (result, error, arg) => [
        { type: "OLDSONGS", id: "LIST" },
        ...result?.ids?.map((id) => ({ type: "OLDSONGS", id })) || []
      ],
    }),
    getPlaylists: builder.query({
      query: () => "//",
      transformResponse: (response)=>{
        return audiusAdapter.setAll(audiusAdapter.getInitialState(),response.data)
      },
      providesTags: (result, error, arg) => [
        { type: "PLAYLISTS", id: "LIST" },
        ...result?.ids?.map((id) => ({ type: "PLAYLISTS", id })) || []
      ],
    }),
    getArtists: builder.query({
      query: () => "//",
      transformResponse: (response)=>{
        return audiusAdapter.setAll(audiusAdapter.getInitialState(),response.data)
      },
      providesTags: (result, error, arg) => [
        { type: "ARTISTS", id: "LIST" },
        ...result?.ids?.map((id) => ({ type: "ARTISTS", id })) || []
      ],
    }),
    getPlaylistTracks: builder.query({
      query: () => "//",
      transformResponse: (response)=>{
        return audiusAdapter.setAll(audiusAdapter.getInitialState(),response.data)
      },
      providesTags: (result, error, arg) => [
        { type: "PLAYLISTTRACKS", id: "LIST" },
        ...result?.ids?.map((id) => ({ type: "PLAYLISTTRACKS", id })) || []
      ],
    }),
    getTrendingSongs: builder.query({
      query: () => "/tracks/trending",
      transformResponse: (response)=>{
        return audiusAdapter.setAll(audiusAdapter.getInitialState(),response.data)
      },
      providesTags: (result, error, arg) => [
        { type: "TRENDINGSONGS", id: "LIST" },
        ...result?.ids?.map((id) => ({ type: "TRENDINGSONGS", id })) || []
      ],
    }),
    getTracksbyId: builder.query({
      query:()=>'//',
      transformResponse: (response)=>{
        return audiusAdapter.setAll(audiusAdapter.getInitialState(),response.data)
      },
      providesTags: (result,error,arg)=>[
        ...result?.ids?.map(id=>({type:'ALLSONGS', id})) || []
      ]
    }),

  })
});

export const {
    useGetAllSongsQuery,
    useGetNewSongsQuery,
    useGetOldSongsQuery,
    useGetPlaylistsQuery,
    useGetArtistsQuery,
    useGetPlaylistTracksQuery,
    useGetTrendingSongsQuery,
    useGetTracksByIdQuery,
} = extendedAudiusSlice;