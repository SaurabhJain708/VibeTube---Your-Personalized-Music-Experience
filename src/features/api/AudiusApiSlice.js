import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const audiusApiSlice = createApi({
    reducerPath: 'audio',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_AUDIO_BASE_URL }),
    tagTypes: ['ALLSONGS', 'NEWSONGS', 'OLDSONGS', 'PLAYLISTS', 'ARTISTS', 'PLAYLISTTRACKS', 'TRENDINGSONGS', 'USERSONGS', 'USER', 'SONG'],
    endpoints: (builder) => ({})
})