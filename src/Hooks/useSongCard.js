import useRtkHooks from "./useRTKHooks"
import SongSlide from "../Components/HomePage/SongSlide"
const useSongCard = (type)=>{
    let heading
    const {songs, isSuccess, isLoading, isError, error} = useRtkHooks(type)
    switch (type){
        case 'trending':
            heading = 'Trending Songs';
            break;
        case 'NewSongs':
            heading = 'New Songs';
            break;
        case 'OldSongs':
            heading = 'Old Songs';
            break;
        case 'AllSongs':
            heading = 'Other Songs';
            break;
    }
    let content
    if(isLoading){
        content='Loading'
    }else if(isError){
        content='Error'
        console.log(error)
    }else if(isSuccess){
        content = <SongSlide heading={heading} ids={songs.ids} type={type}/>
    }
    return {content};
}

export default useSongCard;