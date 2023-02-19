import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterWord, setFilterWord] = useState('')

  const fetchDataHook = () => {
    console.log('fetching data from the server')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }
  useEffect(fetchDataHook, [])

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }  
  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterInput = (event) => {
    setFilterWord(event.target.value)
  }
  const addNewPerson = (event) => {
    event.preventDefault()    
    
    if(persons.map(p => p.name).some(name => name.localeCompare(newName) === 0)){
      alert(`${newName} is already added to the phonebook.`)
      return
    }
    
    if(newName.length < 1){
      console.log("Please enter a valid name.")
      return
    }

    const person = {
      name: newName,
      number: newNumber,
      id: newName,
    }

    setPersons(persons.concat(person))
    setNewName('')
    setNewNumber('')
  }

  const formContext = {
    addNewPersonHandler: addNewPerson,
    nameInputHandler: handleNameInput,
    numberInputHandler: handleNumberInput,
    personName: newName,
    personNumber: newNumber
  }

  const personsToShow = persons.filter(person => 
    person.name.toLocaleUpperCase()
              .startsWith(filterWord.toLocaleUpperCase())
              )

  return (
    <div>
      <Header title = "Phonebook"></Header>
      <SearchFilter filterWord = {filterWord} filterInputHandler = {handleFilterInput}></SearchFilter>

      <Header title = "Add a new person"></Header>
      <PersonForm context = {formContext}></PersonForm>

      <Header title = "Numbers"></Header>
      <PersonDisplay persons = {personsToShow}></PersonDisplay>

    </div>
  )
}

const Header = ({title}) => {
  return(
    <h2>{title}</h2>
  )
}

const SearchFilter = ({filterWord, filterInputHandler}) => {
  return(
    <div>
      filter shown with: <input
        value = {filterWord}
        onChange = {filterInputHandler}
      />
    </div>
  )
}

const PersonDisplay = ({persons}) => {
  return(
    persons.map(person => <p  key = {person.id}> {person.name} : {person.number} </p>)
  )
}

const PersonForm = ({context}) => {
  
  return(
    <form onSubmit = {context.addNewPersonHandler}>
        <div>
          name: <input
            value = {context.personName} 
            onChange = {context.nameInputHandler}
           />
        </div>

        <div>
          number: <input
          value = {context.personNumber} 
          onChange = {context.numberInputHandler}/>
        </div>

        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
  
}
export default App