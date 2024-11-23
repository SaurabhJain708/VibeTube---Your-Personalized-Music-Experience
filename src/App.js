import { Route, Routes } from "react-router-dom";
import "./App.css";
import React, { lazy } from "react";
import Layout from "./Components/Authorisation/Layout";
import RequireAuth from './Components/Authorisation/RequireAuth'
import Alert from "./Components/Authorisation/Alert";
import { AnimatePresence } from "framer-motion";
import { selectAlert } from "./features/AlertSlice";
import { useSelector } from "react-redux";
const SongPage = lazy(()=> import('./Components/AllComponents/SongPage'))
const Home = lazy(() => import("./Components/HomePage/Home"));
const Signup = lazy(() => import("./Components/Authorisation/Signup"));
const Login = lazy(() => import("./Components/Authorisation/Login"));
const Missing = lazy(() => import("./Components/Authorisation/Missing"));
const Reads = lazy(() => import("./Components/AllComponents/Reads"));
const Videos = lazy(() => import("./Components/AllComponents/Videos"));
const Album = lazy(() => import("./Components/AllComponents/Album"));
const Artist = lazy(() => import("./Components/AllComponents/Artist"));
const Charts = lazy(() => import("./Components/AllComponents/Charts"));
const Devotion = lazy(() => import("./Components/AllComponents/Devotion"));
const Genres = lazy(() => import("./Components/AllComponents/Genres"));
const Language = lazy(() => import("./Components/AllComponents/Language"));
const MusicLabels = lazy(() => import("./Components/AllComponents/MusicLabels"));
const MyMusic = lazy(() => import("./Components/AllComponents/MyMusic"));
const OldSongs = lazy(()=> import('./Components/AllComponents/OldSongs'));
const Songs = lazy(()=> import('./Components/AllComponents/Songs'));
const TrendingSongs = lazy(()=> import('./Components/AllComponents/TrendingSongs'));
const NewSongs = lazy(()=> import('./Components/AllComponents/NewSongs'));
const Radio = lazy(()=> import('./Components/PremiumComponents/Radio'));
const Lyrics = lazy(()=> import('./Components/PremiumComponents/Lyrics'));
const Podcasts = lazy(()=> import('./Components/PremiumComponents/Podcasts'))


function App() {
  const { isVisible } = useSelector(selectAlert);

  const routes = {
    PUBLIC: [
      { route: "login", element: <Login /> },
      { route: "signup", element: <Signup /> },
      { route: "*", element: <Missing /> },
      { route: "home", element: <Home /> },
    ],
    PROTECTED: {
      USER: [
        { route: "reads", element: <Reads /> },
        { route: "videos", element: <Videos /> },
        { route: "albums", element: <Album /> },
        { route: "artists", element: <Artist /> },
        { route: "charts", element: <Charts /> },
        { route: "devotion", element: <Devotion /> },
        { route: "genres", element: <Genres /> },
        { route: "language", element: <Language /> },
        { route: "musiclabels", element: <MusicLabels /> },
        { route: "mymusic", element: <MyMusic /> },
        { route: "oldsongs", element: <OldSongs /> },
        { route: "songs", element: <Songs /> },
        { route: "trendingsongs", element: <TrendingSongs /> },
        { route: "newsongs", element: <NewSongs /> },
        { route: 'songpage/:type/:id', element: <SongPage/>}
      ],
      PREMIUM: [
        { route: "radio", element: <Radio /> },
        { route: "lyrics", element: <Lyrics /> },
        { route: "podcasts", element: <Podcasts /> },
      ],
    },
  };
  return (
    <>
    <AnimatePresence>{isVisible && <Alert />}</AnimatePresence>

    <Routes>
      <Route path="/" element={<Layout />}>

        {/* Public Routes */}

        <Route path="/" element={<Home />} />
        {routes.PUBLIC.map(({route,element})=>{
         return <Route path={route} element={element} key={route}/>
        })}

        {/* USER Routes */}

        <Route element={<RequireAuth roles={['USER,PREMIUM']}/>}>
        {routes.PROTECTED.USER.map(({route,element})=>{
         return <Route path={route} element={element} key={route}/>
        })}
        </Route>

        {/* PREMIUM Routes */}

        <Route element={<RequireAuth roles={['PREMIUM']}/>}>
        {routes.PROTECTED.PREMIUM.map(({route,element})=>{
         return <Route path={route} element={element} key={route}/>
        })}
        </Route>

      </Route>
    </Routes>
    </>
  );
}

export default App;
