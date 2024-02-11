import React, { useEffect } from "react";
import { IoIosArrowDroprightCircle } from "react-icons/io";

const Evolution = ({ evolutionChain }) => {
  const [prevEvolution, setPrevEvolution] = React.useState(null);
  const [nextEvolution, setNextEvolution] = React.useState(null);
  const [prevtypes, setPrevTypes] = React.useState([]);
  const [nexttypes, setNextTypes] = React.useState([]);
  async function getPrevEvolution(url) {
    const response = await fetch(url);
    const data = await response.json();
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${data.id}`);
    const data2 = await res.json();
    setPrevTypes(data2.types.map((type) => type.type.name));
    setPrevEvolution(data2);
  }
  async function getNextEvolution(url) {
    const response = await fetch(url);
    const data = await response.json();
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${data.id}`);
    const data2 = await res.json();
    setNextTypes(data2.types.map((type) => type.type.name));
    setNextEvolution(data2);
  }
  async function getEvolution() {
    const response = await fetch(evolutionChain);
    const data = await response.json();
    getPrevEvolution(data.chain.species.url);
    getNextEvolution(data.chain.evolves_to[0]?.evolves_to[0]?.species.url);
  }
  useEffect(() => {
    getEvolution();
  }, []);


  return (
    <div style={{display:"flex",flexDirection:'column', gap:'1rem',marginTop:'2rem'}} >
        <h2>Evolution</h2>
     <div style={{display:'flex',alignItems:'center',gap:'20px'}}>
     {prevEvolution && (
        <div className="">
          <h1>#{prevEvolution.id}</h1>
          <div>
            {" "}
            <img
            width={"100px"}
            height={"100px"}
              src={prevEvolution.sprites.other.dream_world.front_default}
              className={``}
              alt=""
            />
          </div>
          <p> {prevEvolution.name}</p>
        </div>
      )}
<IoIosArrowDroprightCircle size={30} />
      {nextEvolution && (
        <div>
          <h1>#{nextEvolution.id}</h1>
          <div >
            {" "}
            <img
             width={"100px"}
             height={"100px"}
              src={nextEvolution.sprites.other.dream_world.front_default}
              alt=""
            />
          </div>
          <p>{nextEvolution.name}</p>
        </div>
      )}
     </div>
    </div>
  );
};

export default Evolution;
