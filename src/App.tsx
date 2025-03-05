import { useEffect, useState } from "react"
import { TestAPI } from "./apis/testApi"

export default function Main(){

  const [count, setCount] = useState<number>(0);

  const getItem = ()=>{
    TestAPI.all().then(()=>{
      console.log('berhasil')
    })
  }

  useEffect(()=>{
    getItem();
  },[count]);



  return (
    <>
      <div className='text-blue-400 flex justify-center'>
        el promigo
      </div>
      <button
        type="button"
        onClick={()=>{
          setCount(count+1);
        }}
      >
        API Caller
      </button>
    </>
  )
}

