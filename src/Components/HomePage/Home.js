import React from "react";
import Header from "./Header";
import useSongCard from "../../Hooks/useSongCard";

const Home = () => {
  const { content: TrendingSongs } = useSongCard("trending");
  const { content: NewSongs } = useSongCard("NewSongs");
  const { content: AllSongs } = useSongCard("AllSongs");
  const { content: OldSongs } = useSongCard("OldSongs");

  return (
    <>
      <main className="relative inset-0 h-auto w-full bg-gradient-to-b from-gray-900 via-purple-800 to-purple-900 min-h-screen">
        <Header />
        
        {/* Show Trending Songs */}
        {TrendingSongs !== "Loading" ? TrendingSongs : <p>Loading Trending Songs...</p>}
        
        {/* Show New Songs after Trending is loaded */}
        {TrendingSongs !== "Loading" && NewSongs !== "Loading" ? NewSongs : <p>Loading New Songs...</p>}
        
        {/* Show All Songs after Trending and New are loaded */}
        {TrendingSongs !== "Loading" && NewSongs !== "Loading" && AllSongs !== "Loading" ? AllSongs : <p>Loading All Songs...</p>}
        
        {/* Show Old Songs after all previous are loaded */}
        {TrendingSongs !== "Loading" && NewSongs !== "Loading" && AllSongs !== "Loading" && OldSongs !== "Loading" ? OldSongs : <p>Loading Old Songs...</p>}
      </main>
    </>
  );
};

export default Home;
