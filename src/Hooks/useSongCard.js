import useRtkHooks from "./useRTKHooks"
import SongSlide from "../Components/HomePage/SongSlide"
const useSongCard = (type)=>{
    let heading
    let route
    const {songs, isSuccess, isLoading, isError, error} = useRtkHooks(type)
    switch (type){
        case 'trending':
            heading = 'Trending Songs';
            route= '/trendingsongs'
            break;
        case 'NewSongs':
            heading = 'New Songs';
            route = '/newsongs'
            break;
        case 'OldSongs':
            heading = 'Old Songs';
            route = '/oldsongs'
            break;
        case 'AllSongs':
            heading = 'Other Songs';
            route = '/genres'
            break;
    }
    let content
    if(isLoading){
        content='Loading'
    }else if(isError){
        content='Error'
        console.log(error)
    }else if(isSuccess){
        content = <SongSlide heading={heading} ids={songs.ids} type={type} route={route}/>
    }
    return {content};
}

export default useSongCard;