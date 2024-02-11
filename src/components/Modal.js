import React, { useContext, useEffect, useRef, useState } from "react";
import "../css/modal.css";
import Evolution from "./Evolution";
import { colorContext } from "../App";
const Modal = ({ url, setIsModal }) => {
  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [species, setSpecies] = useState(null);
  const [bio, setBio] = useState("");
  const [types,setTypes ] = useState([])
  const colors = useContext(colorContext)


  const getRequiredPokemon = async () => {
    const res = await fetch(url);
    const data = await res.json();
    const res2  = await fetch(data.varieties[0].pokemon.url)
    const data2 = await res2.json()

    await handleSpecies(data.id);
    setPokemon(data2);
  };
  const handleSpecies = async (id) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const data = await res.json();
    const species = data.genera.filter((genus) => {
      return genus.language.name === "en";
    });
    const varieties = await fetch(data.varieties[0].pokemon.url);
    const varietiesData = await varieties.json();
    setTypes(varietiesData.types.map((type) => type.type.name));
    setEvolutionChain(data.evolution_chain?.url);
    setSpecies(species);
    const englishFlavorText = data.flavor_text_entries.filter((flavor) => {
      return flavor.language.name === "en";
    });
    setBio(englishFlavorText[0]?.flavor_text);
  };
  const handleClick = (e) => {
    e.stopPropagation();
    if (document.getElementById("modal-body").contains(e.target)) {
      console.log("inside");
    } else {
      console.log("outsied");
      setIsModal(false);
    }
  };
  console.log("evolution chain", evolutionChain);

  useEffect(() => {
    document
      .getElementById("outer-body")
      .addEventListener("click", handleClick);
    getRequiredPokemon();
    return () => {
      document
        .getElementById("outer-body")
        .removeEventListener("click", handleClick);
    };
  }, [url]);
  console.log("pokemon", pokemon);
  if(!pokemon) return<>Loading....</>


  return (
    <div id="modal-body" style={{backgroundColor:`${colors[types[0]]}`}}>
      <div className="modal-left">
        <div
          style={{
            display: "flex",
            width: "10rem",
            height: "10rem",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h3> #{pokemon?.id}</h3>
          <img
            style={{ width: "10rem", height: "10rem" }}
            src={pokemon?.sprites?.other.dream_world.front_default}
            alt={"lllllllll"}
          />
          <div style={{fontWeight:'bold',marginTop:'10px'}}>{pokemon?.name.toUpperCase()}</div>
        </div>
        <div style={{ display: "flex", gap: "50px", marginTop: "3rem" }}>
          {pokemon?.types?.map((type, id) => {
            return <div>{type?.type.name}</div>;
          })}
        </div>
        {evolutionChain && <Evolution evolutionChain={evolutionChain} />}
      </div>
      <div className="modal-right">
        <div className="">
          <p className="">{bio}</p>
          <h2>Bio</h2>
          <hr />
          <table>
            <tbody>
              <tr>
                <td>Genus</td>
                <td>
                  
                  {species &&
                    species.map((genus, i) => (
                      <li  key={i}>
                        {genus.genus}
                      </li>
                    ))}
                </td>
              </tr>
              <tr>
                <td>Height</td>
                <td>{pokemon.height}</td>
              </tr>
              <tr>
                <td>Weight</td>
                <td>{pokemon.weight}</td>
              </tr>
              <tr>
                <td>Abilities</td>
                <td>
                  {pokemon.abilities.map((ability, i) => (
                    <li key={i}>
                      {ability.ability.name}
                    </li>
                  ))}
                </td>
              </tr>
              <tr>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
                <h2>Moves</h2>
                <hr />
                <ul style={{display:'flex',flexWrap:'wrap',width:'12rem', gap:'10px'}}>
                  {pokemon &&
                    pokemon.moves.slice(0, 6).map((move, i) => (
                      <li style={{width:'5rem'}} className="" key={i}>
                        {move.move.name}
                      </li>
                    ))}
                </ul>
              </div>
      <div>
                <h2>Abilities</h2>
                <hr />
                <ul>
                  {pokemon &&
                    pokemon.abilities.map((ability, i) => (
                      <li key={i}>
                        {ability.ability.name}
                      </li>
                    ))}
                </ul>
              </div>
      </div>
    </div>
  );
};

export default Modal;
