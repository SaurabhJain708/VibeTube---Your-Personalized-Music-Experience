import React from "react";
import SongCard from "../HomePage/SongCard";
import Header from "../HomePage/Header";
import { useGetNewSongsQuery } from "../../features/AudiusSlice";
import { Audio } from "react-loader-spinner";

const NewSongs = () => {
  const { data: songs, isLoading } = useGetNewSongsQuery();
  if (isLoading)
    return (
      <div className="h-full w-full bg-gradient-to-b from-indigo-500 via-purple-400 to-pink-300 min-h-screen flex justify-center items-center ">
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      </div>
    );
  return (
    <>
      <main className="relative inset-0 h-auto w-full bg-gradient-to-b from-gray-900 via-purple-800 to-purple-900 min-h-screen">
        <Header />
        <section className="h-auto w-full flex flex-wrap justify-center items-center gap-4 mt-4">
          {songs?.ids?.map((postId) => {
            return <SongCard key={postId} postid={postId} type={"NewSongs"} />;
          })}
        </section>
      </main>
    </>
  );
};

export default NewSongs;
