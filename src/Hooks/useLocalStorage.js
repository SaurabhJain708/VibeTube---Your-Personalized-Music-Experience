import { useEffect, useState } from "react"


const getlocalval = (key,value)=>{
    if(typeof window === 'undefined') return value

    const localvalue = JSON.parse(localStorage.getItem(key))
    if(localvalue) return localvalue

    if(value instanceof Function) return value()
        return value
}

const useLocalStorage = (key,value)=>{
    const [value,setValue] = useState(()=>{
        return getlocalval(key,value)
    })

    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value))
    },[value])
    return [value,setValue]
}

export default useLocalStorage;