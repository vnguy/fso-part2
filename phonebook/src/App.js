import { useState, useEffect } from 'react'
import personService from './services/person'
import Notification from './components/notification'


const DisplayPhoneBook = ({filter, persons, deletePerson}) => {
  const result = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  return <div>
          {result.map((person)=> <PersonInfo key={person.id} person={person} handleOnClick={deletePerson}/>)}  
        </div>
}

const PersonInfo = ({person, handleOnClick}) => {
  return <p> 
          {person.name} {person.number} <button onClick={()=>handleOnClick(person.id) }>delete</button>
        </p>
}

const SearchFilter = ({handleFilter}) => {
  return <input onChange={handleFilter}/>
}

const NewPersonForm = ({addNewPerson, handleNameChange, handleNumberChange}) => {

  return <form  onSubmit={addNewPerson}>
    <div>
      name: <input onChange={handleNameChange} />
    </div>
    <div>
      phone: <input onChange={handleNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)  
  const [message, setMessage] = useState(null)   

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')


  const handleFilter = (event) => {
    setFilter(event.target.value)
  }  

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  } 

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addNewPerson = (event) => {

    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const found = persons.find(person => person.name === newPerson.name)
    if (found === undefined) {
      personService.create(newPerson).then(response => {
        setMessage(`Added ${response.name}`)
        setTimeout(()=> {
          setMessage(null)
        }, 5000)
        setPersons(persons.concat(response))        
      })
    } else {
      if(window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number with a new one?`)) {
        const newObject = {...newPerson, id : found.id}
        personService.update(found.id, newObject).then(response => {
          setPersons(persons.map(person => person.id !== found.id ? person : response))
          setMessage(`${newObject.name}'s phonenumber has been replaced`)
        }).catch(()=> {
          setErrorMessage(`${newObject.name} has aready been removed from server`)
          setTimeout(()=> {
            setErrorMessage(null)
          }, 5000)
        })
      }
    }
  }

  const deletePerson = (id) => {
    if(window.confirm('delete person')) {
      personService.remove(id).then(()=> {
        setPersons(()=>persons.filter(person => person.id !== id))
      }).catch(()=> {
        setErrorMessage('Delete Errror')
        setTimeout(()=> {
          setErrorMessage(null)
        }, 5000)
      })
    }
  }

  const hook = ()=> { 
    personService.getAll().then(persons => {
      console.log(persons)
      setPersons(persons)
    })
  }

  useEffect(hook,[])
  
  return (
    <div>
      <Notification errorMessage={errorMessage} message={message}/>
      <h2>Phonebook</h2>
      <SearchFilter handleFilter={handleFilter}/>
      <h3>Add a new</h3>
      <NewPersonForm addNewPerson={addNewPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <DisplayPhoneBook filter={filter} persons={persons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App