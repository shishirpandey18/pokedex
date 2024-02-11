import React, { useEffect, useState } from "react";
import "../css/Nav.css";
import { Link } from "react-router-dom";

const Nav = ({pokemons, setPokemons,setUrlMain,setFilterPokemons }) => {
  const [gender, setGender] = useState([]);
  const [region, setRegion] = useState([]);
  const [habitat, setHabitat] = useState([]);
  const [state, setState] = useState(true);
  const handleSearch = async (e) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=200&`);
    const data = await res.json();
  
    const filteredPokemon = data.results.filter((pokemon) => {
      return pokemon.name.includes(e.target.value);
    });
    // setState(false);
    setFilterPokemons(filteredPokemon);
  };
  async function handleRegion() {
    const res = await fetch("https://pokeapi.co/api/v2/region/");
    const data = await res.json();
    setRegion(data.results);
  }
  async function handleHabitat() {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon-habitat/");
    const data = await res.json();
    setHabitat(data.results);
  }

  async function filterPokemonByGender(url) {
    console.log('url',url)
    if (url) {
      const res = await fetch(url);
      const data = await res.json();
      console.log('dataofgender',data.pokemon_species_details.slice(0, 20))
      setFilterPokemons(data.pokemon_species_details.slice(0, 20).map((p=>p.pokemon_species)));
    }
  }
  async function filterPokemonByHabitat(url) {
    console.log('url',url)
    if (url) {
      const res = await fetch(url);
      const data = await res.json();
      setFilterPokemons(data.pokemon_species);
    }
  }
  async function handleGender() {
    const res = await fetch("https://pokeapi.co/api/v2/gender/");
    const data = await res.json();
    setGender(data.results);
  }
  useEffect(()=>{
    handleRegion();
    handleGender();
    handleHabitat();

  },[])
  return (
    <div style={{ display: "flex", padding: "1rem", backgroundColor: "pink" }}>
      <a href='/'><img style={{ width: "150px" }} src="/assets/pokemon.png"></img></a>
      <input style={{marginLeft:'10rem',width:'30vw',borderRadius:'10px',padding:'10px'}} type="text" name="search" id="search" placeholder="Please enter the name of pokemon" onChange={handleSearch} />
      <div  style={{marginLeft:'5rem',marginTop:'10px',display:'flex',gap:'10px',borderRadius:'50px',height:'30px'}}>
        <select
          id="Gender"
          onChange={(e) => {
            filterPokemonByGender(e.target.value);
          }}
        >
          <option value="Gender" defaultChecked>
            Gender
          </option>
          {gender.map((gender, i) => (
            <option key={i}  value={gender.url}>
              {gender.name}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => {
            filterPokemonByHabitat(e.target.value);
          }}
        >
          <option value="Gender">Habitat</option>
          {habitat.map((habitat, i) => (
            <option key={i} value={habitat.url}>
              {habitat.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Nav;
