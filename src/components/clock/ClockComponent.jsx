import React from 'react'
import { useReducer } from 'react';
import { useEffect } from 'react';
import { useState } from 'react'
import "./ClockComponent.css"


const initialValueTimer = 5;
const initialTimer = {count: initialValueTimer};

function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return {count: state.count + 1};
      case 'decrement':
        return {count: state.count - 1};
      case 'restart':
        return {count: initialValueTimer};
      default:
        throw new Error();
    }
  }






export const ClockComponent = () => {

   
    const [state, dispatch] = useReducer(reducer, initialTimer)
    const [interval, setPomodoroInterval] = useState(undefined);

    const continueInterval = ()=>{
        if(state.count <= 0) return;
        if(interval !== undefined){
            console.log("wait for actual interval to end...")
            return
        } ;
        console.log("continue interval")
        setPomodoroInterval(
            setInterval(() => {
                dispatch({type:'decrement'});
            }, 1000)
        )
    }

    const stopInterval = (interval)=>{
        console.log("stopping interval - state.count value -->", state.count)
        clearInterval(interval);
        dispatch({type:'restart'});
        setPomodoroInterval(undefined);        
    }

    const pauseInterval = (interval)=>{
        console.log("pause interval - state.count value -->", state.count)
        clearInterval(interval);
        setPomodoroInterval(undefined);        
    }

    const startInterval = ()=>{
        console.log("starting interval - state.count value -->", state.count)
        setPomodoroInterval(
            setInterval(() => {
                dispatch({type:'decrement'});
            }, 1000)
        )
    }

    const consoleInterval = ()=>{
        console.log(interval);
    }
    
    useEffect(() => {
        console.log("started first interval")
        setPomodoroInterval(
            setInterval(() => {
                dispatch({type:'decrement'});
            }, 1000)
        )
        return () => stopInterval(interval);
      }, []);


    useEffect(() => {
        console.log(state.count)
        if(state.count <= 0 ){
            stopInterval(interval);
            console.log("stopped current interval")
        }
      }, [state.count]);


      const buttons = ()=>{
        if(state.count != 0) {
            return (
            <>
             <button  onClick={()=> pauseInterval(interval)}>Pause</button> 
             <button onClick={()=> continueInterval(interval)}>Continue</button>
            </>)
        }
        if(!interval){
            return (
            <>
             <button  onClick={()=> startInterval(interval)}>Start</button> 
            </>)
        }
        
      }    

    

  return (
    <>
      <div className='clock-wrapper'>
        <h1 className='clock-title'>Pomodoro</h1>
        <p className='clock-timer'>{state.count}</p>
        <div className='clock-option-bar'>
            { buttons() }
            <button onClick={()=> consoleInterval()}>console</button>
        </div>
      </div>

    </>
  
  )
}
