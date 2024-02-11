import React,{useState,useEffect, useContext} from 'react'
import '../css/pokemon.css'
import { colorContext } from '../App';
const Pokemon = ({name,url}) => {
    const [types, setTypes] = useState([]);
    const [pokemon, setPokemon] = useState(null);
    const colors = useContext(colorContext);


    const handlePokemon = async () => {
        const res = await fetch(url);
        const data = await res.json();
        const varieties = await fetch(data.varieties[0].pokemon.url);
        const varietiesData = await varieties.json();
        setTypes(varietiesData.types.map((type) => type.type.name));
        setPokemon(varietiesData);
    };
    useEffect(() => {
      handlePokemon();
    }, [name,url]);
  
  return (

    pokemon&&
    <div style={{background:`${colors[types[0]]}`,display:'flex',justifyContent:'center',alignItems:'center',fontSize:'20px',flexDirection:'column',padding:'10px',borderRadius:'10px'}}>
        <div>#{pokemon?.id}</div>
        <img height={150}  src={pokemon?.sprites?.front_default} alt={name} />
    <div style={{fontWeight:'bold'}}>{name.toUpperCase()}</div>
    </div>

  )
}

export default Pokemon