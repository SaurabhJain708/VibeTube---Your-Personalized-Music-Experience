import React from 'react'
import Header from './Header'
import SongSlide from './SongSlide'
import { useGetTrendingSongsQuery } from '../../features/AudiusSlice'
const Home = () => {

  const {
    data:songs,
    isLoading: TrendingLoading,
    isSuccess: TrendingSuccess,
    isError: TrendingError,
    error: TrendingErr
  } = useGetTrendingSongsQuery()

  let TrendingSongs;
  if(TrendingLoading){
    TrendingSongs='Loading'
  }else if(TrendingSuccess){
    TrendingSongs= <SongSlide heading={'Trending Songs'} ids={songs.ids} type={'trending'}/>
  }else if(TrendingError){
    TrendingSongs= "Error"
    console.log(TrendingErr)
  }

  

  return (
    <>
    <Header/>
    <main className='absolute h-full w-full bg-gradient-to-b from-gray-900 via-purple-800 to-purple-900 min-h-screen'>
      {TrendingSongs}
    </main>
    </>
  )
}

export default Home
