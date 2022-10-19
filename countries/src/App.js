import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

const SingleDisplay = ({filter}) => {

  //const [temp,setTemp] = useState(0)
  const [weatherJSON, setWeatherJSON] = useState(null)

  useEffect(() => 
  {
    const api_key = process.env.REACT_APP_API_KEY
    const latlng = filter[0].capitalInfo.latlng
    const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${api_key}`
    axios.get(weather_url).then(response=>{
      setWeatherJSON(response)
    })
  },)

    if (weatherJSON !== null) {
      return <>
      <h1>{filter[0].name.common}</h1>
      <p>capital {filter[0].capital[0]}</p>
      <p>area {filter[0].area}</p>
      <h3>languages:</h3>
      <ul>
      {Object.values(filter[0].languages).map((lang)=> 
        <li key={lang}>{lang}</li>
      )}
      </ul>
      <img src={filter[0].flags.png} alt=""></img>
      <h3>Weather in {filter[0].capital[0]}</h3>
      <p>temperature {weatherJSON.data.main.temp-273.15} Celcius</p>
      <p>{`wind speed ${weatherJSON.data.wind.speed} m/s`}</p>    
    </>
    } else {
      return <>
      <h1>{filter[0].name.common}</h1>
      <p>capital {filter[0].capital[0]}</p>
      <p>area {filter[0].area}</p>
      <h3>languages:</h3>
      <ul>
      {Object.values(filter[0].languages).map((lang)=> 
        <li key={lang}>{lang}</li>
      )}
      </ul>
      <img src={filter[0].flags.png} alt=""></img>
    </>
    }

  
}

function Display({search, countries, setSearch}) {
  const filter = countries.filter((country)=> {
    const name = country.name.common
    return name.toLowerCase().includes(search.toLowerCase())
  })

  if(filter.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (filter.length === 1) {
    return <SingleDisplay filter={filter}/>
  } else {
    return <div>
    {filter.map((country)=> {
      const name = country.name.common
      return <p key={name}>{name} <button onClick={()=>setSearch(name)}>show</button></p>
    })}
    </div>
  }
}

function App() {

  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  const handleSearch = function(event) {   
    setSearch(event.target.value)
  }
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      setCountries(response.data)
    })
  },[])

  return (
    <div className="App">
      <form>
      find countries<input onChange={handleSearch}></input>
      </form>
      <Display search={search} countries={countries} setSearch={setSearch}/>
    </div>
  );
}

export default App;
