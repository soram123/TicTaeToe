import React , {useEffect, useState} from 'react' 
import Cell from './Cell'
import './Board.css'

let turnMap = {
    1: 'X',
    2: 'O'
}
function Board(){
    const [contents, setContents] = useState([['','',''],['','',''],['','','']])
    const [turn , setTurn ] = useState(1)
    const [isGameRunning, setIsGameRunning ] = useState(true)
    const [winnerOfGame, setWinnerOfGame ] = useState(-1)

    function handleCellClick(row, col){
        if (contents[row][col] === ''){
            let newContents = contents.map((rowContent, i)=>{
                if(i !== row ) return rowContent
                let newRowContent = rowContent.map((colContent, j)=>{
                    if ( j !== col) return colContent
                    else {
                        return turnMap[turn]
                    }
                })
                return newRowContent
            })
            setContents(newContents)
            if (turn ==1) setTurn(2)
            else setTurn(1)
        }
    }

    useEffect(()=>{
        let winner = ''
        for (let i =0; i<= 2; i++){
            if (contents[i][0] === contents[i][1] && contents[i][1] === contents[i][2] && contents[i][0] !== ''){
                winner = contents[i][0]
                contents[i][0] = 'W'
                contents[i][1] = 'W'
                contents[i][2] = 'W'
            }
        }
        for (let j=0; j<= 2; j++){
            if (contents[0][j] === contents[1][j] && contents[1][j] === contents[2][j] && contents[0][j] !== ''){
                winner = contents[0][j]
                contents[0][j] = 'W'
                contents[1][j] = 'W'
                contents[2][j] = 'W'
            }
        }
        if (contents[0][0] === contents[1][1] && contents[1][1] === contents[2][2] && contents[0][0] !== ''){
            winner = contents[0][0]
            contents[0][0] = 'W'
            contents[1][1] = 'W'
            contents[2][2] = 'W'
        }
        if (contents[0][2] === contents[1][1] && contents[1][1] === contents[2][0] && contents[0][2] !== ''){
            winner = contents[0][2]
            contents[0][2] = 'W'
            contents[1][1] = 'W'
            contents[2][0] = 'W'
        }
        let isGameOver = true 
        for(let i=0;i<=2;i++){
            for(let j=0;j<=2;j++){
                if(contents[i][j] === '' && winner === ''){
                    isGameOver =false 
                    break
                }
            }
        }
        setIsGameRunning(!isGameOver)
        if(winner !== ''){
            if(winner === 'X'){
                setWinnerOfGame(1)
            }
            else {
                setWinnerOfGame(2)
            }
        }
        else {
            setWinnerOfGame(-1)
        }
    },[contents])
    return (
        <>
           { isGameRunning && <h2>This is the turn of player: {turn}</h2>}
           { !isGameRunning && winnerOfGame !== -1 && <h3>The game has been won by player #{winnerOfGame}</h3>}
           { !isGameRunning && winnerOfGame === -1 && <h3>The game is drawn </h3>}
            <div className='row'>
                <Cell row={0} col={0} char={contents[0][0]} onClick={(row, col)=>handleCellClick(row,col)}/>
                <Cell row={0} col={1} char={contents[0][1]} onClick={(row, col)=>handleCellClick(row,col)}/>
                <Cell row={0} col={2} char={contents[0][2]} onClick={(row, col)=>handleCellClick(row,col)}/>
            </div>
            <div className='row'>
                <Cell row={1} col={0} char={contents[1][0]} onClick={(row, col)=>handleCellClick(row,col)}/>
                <Cell row={1} col={1} char={contents[1][1]} onClick={(row, col)=>handleCellClick(row,col)}/>
                <Cell row={1} col={2} char={contents[1][2]} onClick={(row, col)=>handleCellClick(row,col)}/>
            </div>
            <div className='row'>
                <Cell row={2} col={0} char={contents[2][0]} onClick={(row, col)=>handleCellClick(row,col)}/>
                <Cell row={2} col={1} char={contents[2][1]} onClick={(row, col)=>handleCellClick(row,col)}/>
                <Cell row={2} col={2} char={contents[2][2]} onClick={(row, col)=>handleCellClick(row,col)}/>
            </div>
        </>
    )
}

export default Board