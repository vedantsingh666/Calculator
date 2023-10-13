import React,{ useRef , useEffect} from 'react'

import "./Header.css"

function Header(props) {
  const resultRef=useRef();
  const expRef=useRef();
  useEffect(()=>{
    resultRef.current.scrollIntoView();
  },[props.history])

  useEffect(()=>{
    expRef.current.scrollLeft=expRef.current.scrollWidth;
  },[props.expression])

  return (
    <div className='header custom-scroll'>
        <div className='header_history'>
          {props.history &&
          props.history?.map((item)=>(
          <p key={item+""+Math.random()*44}>{item}</p> 
          ))}
        </div><br />
        <div ref = {expRef} className='header_expression custom-scroll'>
          <p>{props.expression}</p>
        </div>
        <p ref={resultRef} className='header_result'>{props.result}</p>
    </div>
  )
}

export default Header