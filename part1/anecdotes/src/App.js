import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const getRandomAnecdote = () =>{
    const randIdx = Math.floor(Math.random() * anecdotes.length)
    setSelected(randIdx)
  }  
  const voteForCurrentAnecdote = () =>{
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }
  const getAnecdoteWithMostVotes = () =>{ 
    let max = votes[0]
    var maxIdx = 0;

    for (var i = 1; i < votes.length; i++) {
      if (votes[i] > max) {
        maxIdx = i;
        max = votes[i];
      }
    }
    console.log(maxIdx, max)
    return {anecdote: anecdotes[maxIdx], voteCount: max}
  }

  const mostVotedAnecdote = getAnecdoteWithMostVotes()
  return (
    <div>
      <Header title = "Anecdote of the day"></Header>
      <AnecdoteDisplay anecdote = {anecdotes[selected]} voteCount = {votes[selected]}></AnecdoteDisplay>

      <Button onClick={ getRandomAnecdote } label = "Next anecdote"></Button>
      <Button onClick={ voteForCurrentAnecdote } label = "vote"></Button>

      <Header title = "Anecdote with most votes"></Header>
      <AnecdoteDisplay anecdote = {mostVotedAnecdote.anecdote} voteCount = {mostVotedAnecdote.voteCount}></AnecdoteDisplay>
    </div>
  )
}

const AnecdoteDisplay = ({anecdote, voteCount}) => {
  return (
    <>
      <p>{anecdote}</p>
      <p>has {voteCount} votes</p>
    </>
  )
}

const Button = ({onClick, label}) =>{
  return(
    <button onClick = {onClick}> {label} </button>
  )
}
const Header = ({title}) => {
  return (
    <h1>{title}</h1>
  )
}


export default App