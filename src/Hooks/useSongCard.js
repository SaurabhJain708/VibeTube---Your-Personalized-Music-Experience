import useRtkHooks from "./useRTKHooks"

const useSongCard = (type)=>{
    const {songs, isSuccess, isLoading, isError, error} = useRtkHooks(type)
    let content
    if(isLoading){
        content='Loading'
    }else if(isError){
        content='Error'
        console.log(error)
    }else if(isSuccess){
        content = <SongSlide heading={'Trending Songs'} ids={songs.ids} type={type}/>
    }
}