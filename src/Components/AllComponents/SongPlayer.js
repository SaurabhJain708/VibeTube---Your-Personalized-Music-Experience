import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Audio } from "react-loader-spinner";

const fetchaudio = async (id) => {
  const response = await fetch(
    `https://discoveryprovider.audius.co/v1/tracks/${id}/stream`
  );
  console.log("stream", response);
  if (!response.ok) {
    throw new Error("Network error");
  }
  return response.blob();
};

const SongPlayer = ({ trackId }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["trackStream", trackId],
    queryFn: () => fetchaudio(trackId),
    enabled: !!trackId,
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Audio
          height="60"
          width="60"
          radius="9"
          color="purple"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  // Create an object URL from the audio blob
  const audioUrl = URL.createObjectURL(data);

  return (
    <section className="w-full h-full flex justify-center items-center">
      {/* Add audio player */}
      <audio controls className="w-10/12 rounded-lg shadow-lg">
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </section>
  );
};

export default SongPlayer;
