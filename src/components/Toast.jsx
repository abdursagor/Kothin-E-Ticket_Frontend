import {useEffect, useState} from 'react'

function Toast({ children }) {
    const [style, setStyle] = useState();
    useEffect(() => {
        const timer = setTimeout(() => {
            setStyle("animate-goSide");
            console.log("Time out");
        }, 1000)
        return ()=> clearTimeout(timer)
    },[])
  return (
      <div className={`absolute top-2 right-5 bg-green-400 w-44 h-16 flex justify-center items-center ${style}`}>{ children }</div>
  )
}

export default Toast