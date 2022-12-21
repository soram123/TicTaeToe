import React from 'react'
import './Cell.css'

function Cell(props){
    let className = "cell" ;
    if (props.char !==''){
        if (props.char === 'W'){
            className += " winner" 
        }
        else{
            className +=  " disabled"
        }
         
    }
    else{
        className +=   " enabled"
     }
    return (
        <>
           <div 
           className={className}
           onClick={()=>props.onClick(props.row, props.col)}
           > {props.char !== 'W' && props.char }</div>
        </>
    )
}
export default Cell