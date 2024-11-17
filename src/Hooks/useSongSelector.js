import { useGetAllSongsQuery, useGetNewSongsQuery, useGetOldSongsQuery, useGetTrendingSongsQuery } from "../features/AudiusSlice"
const useSongSelector = (type, id)=>{
    const trendingQuery =useGetTrendingSongsQuery('getTrendinSongs',{
        selectFromResult: ({data})=>({
            song: data?.entities[id]
        }),
        skip: type!=='trending',
    })
    const newQuery = useGetNewSongsQuery('getNewSongs',{
        selectFromResult: ({data})=>({
            song: data?.entities[id]
        }),
        skip: type !== 'NewSongs',
    })
    const oldQuery = useGetOldSongsQuery('getOldSongs',{
        selectFromResult:({data})=>({
            song: data?.entities[id]
        }),
        skip: type!=='OldSongs',
    })
    const allQuery = useGetAllSongsQuery('getAllSongs',{
        selectFromResult:({data})=>({
            song: data?.entities[id]
        }),
        skip: type!=='AllSongs',
    })

    switch (type){
        case 'trending':
            return trendingQuery ;
        case 'NewSongs':
            return newQuery ;
        case  'OldSongs':
            return oldQuery ;
        case 'AllSongs':
            return allQuery
    }
}

export default useSongSelector;