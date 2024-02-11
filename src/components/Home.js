import React, { useEffect, useState } from "react";
import Pokemon from "./Pokemon";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { IoIosArrowDropleftCircle,IoIosArrowDroprightCircle } from "react-icons/io";

const Home = ({ pokemons,setUrlMain,mainData, filterPokemons }) => {

  const [isModal, setIsModal] = useState(false);
  const [modalUrl, setModalUrl] = useState("");

  const handlePokemon = (pokemon) => {
    setIsModal(true);
    setModalUrl(pokemon.url);
  };


  return (
    <div id="outer-body" style={{ height: "100vh", width: "100vw" }}>
      {isModal && (
        <Modal url={modalUrl} isModal={isModal} setIsModal={setIsModal} />
      )}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          padding: "2rem",
          gap: "1rem",
        }}
      >
        {!filterPokemons.length>0 &&
          pokemons.map((pokemon, index) => {
            return (
              <div>
                <div
                  key={index}
                  onClick={() => {
                    handlePokemon(pokemon);
                  }}
                >
                  <Pokemon name={pokemon?.name} url={pokemon?.url} />
                </div>
              </div>
            );
          })}
        {filterPokemons.length>0 &&
          filterPokemons.map((pokemon, index) => {
            console.log("pokemonfrom filtered dataf", pokemon);
            return (
              <div key={index}>
                <Pokemon
                  name={pokemon?.name}
                  url={pokemon?.url}
                />
              </div>
            );
          })}
      </div>
      <footer style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <div style={{display:"flex",gap:'1rem',fontSize:'1rem'}} >
                  <IoIosArrowDropleftCircle
                  style={{height:'50px',width:'50px'}}
                    onClick={() => {
                      mainData.previous && setUrlMain(mainData.previous);
                    }}
                   
                  >
                    Prev
                  </IoIosArrowDropleftCircle>
                  <IoIosArrowDroprightCircle
                  style={{height:'50px',width:'50px'}}

                    onClick={() => {
                      mainData.next && setUrlMain(mainData.next);
                    }}
                   
                  >
                  </IoIosArrowDroprightCircle>
                </div>
              
            </footer>
    </div>
  );
};

export default Home;
