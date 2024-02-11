import React, { useContext } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './components/Home'
import { useState,useEffect } from 'react'
import { colorContext } from './App'


const MyRoute = () => {
  const [pokemons,setPokemons] = useState([])
  const [urlMain, setUrlMain] = useState(
    "https://pokeapi.co/api/v2/pokemon-species/?limit=24&offset=0"
  );

const colors = useContext(colorContext)
console.log('colors',colors)
const [filterPokemons,setFilterPokemons] = useState([])
const [mainData, setMainData] = useState([]);


async function handlePokemons() {
  const res = await fetch(urlMain);
  const data = await res.json();
  setMainData(data);
  setPokemons(data.results);

}



useEffect(()=>{
  handlePokemons()
},[urlMain])

  return (
    <Router>
        <Nav setPokemons={setPokemons} setUrlMain={setUrlMain} setFilterPokemons={setFilterPokemons}/>
        <Routes>
            <Route path="/" element={<Home pokemons={pokemons} mainData={mainData} setMainData={setMainData} setUrlMain={setUrlMain} filterPokemons={filterPokemons}/>}/>

        </Routes>
    </Router>
  )
}

export default MyRoute