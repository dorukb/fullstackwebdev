import Note from './components/Note'
import axios from 'axios'
import {useState, useEffect} from 'react'

const App = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...') 
  const [showAll, setShowAll] = useState(true)


  const fetchDataHook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }

  useEffect(fetchDataHook, [])


  console.log('render', notes.length, ' notes')
  
  const addNote = (event) => {
    event.preventDefault()    

    const note = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    setNotes(notes.concat(note))
    setNewNote('')
  }

  const handleNoteChange = (event) => { 
    setNewNote(event.target.value)  
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>

      <div>
        <button onClick = {() => setShowAll(!showAll)}>
          displaying {showAll ? 'all notes' : "only important notes"}
        </button>
      </div>
      <ul>
        <ul>
          {notesToShow.map(note => 
            <Note key={note.id} note={note} />
          )}
        </ul>
      </ul>
      
      <form onSubmit = {addNote}>
            <input value={newNote} 
                    onChange = {handleNoteChange}
            />
            
            <button type = "submit">Add</button>
      </form>
    </div>
  )
}

export default App



// import {useState} from 'react'


// const App = (props) => {

//   const [left, setLeft] = useState(0)
//   const [right, setRight] = useState(0)
//   const [allClicks, setAll] = useState([])

//   const handleLeftClick = () => 
//   {
//     setAll(allClicks.concat('L'))
//     setLeft(left + 1)
//   }
//   const handleRightClick = () => 
//   {
//     setAll(allClicks.concat('R')) 
//     setRight(right + 1)
//   }
//   return (
//     <div>
//       {left}
//       <Button onClick={handleLeftClick} text={"left"}/>
//       <Button onClick={handleRightClick} text = {'right'}/>
//       {right}
//       <History allClicks = {allClicks}/>
//     </div>
//   )
// }
// const History = (props) => {  
//   if (props.allClicks.length === 0) 
//   {    
//     return(
//             <div>the app is used by pressing the buttons</div>
//           )  
//   }  
//   return (<div> button press history: {props.allClicks.join(' ')}</div>)
// }


// const Display = (props) => {
//   return (
//     <p>{props.counter}</p>
//   )
// }
// const Button = ({ onClick, text }) => (
//   <button onClick={onClick}>
//     {text}
//   </button>
// )

// export default App