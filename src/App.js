import React, {useState, useEffect} from 'react'
import { getAllPokemon, getPokemon } from './services/pokemon'


import './App.css';

function App() {

  const [pokemonData, setPokemonData] = useState ([]);
  const [nextUrl, setNextUrl] = useState ('');
  const [prevUrl, setPrevUrl] = useState ('');
  const [loading, setLoading] = useState (true);
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon'

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl)
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadPokemon(response.results);
      setLoading(false);
    }
    fetchData()
  }, [])

  const next  = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results); 
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  } 

  const prev  = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results); 
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  } 

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon)
      return pokemonRecord
    }))
    setPokemonData(_pokemonData)
  }

  return (
    <div className="App">
      {pokemonData.map(({ name }) => (
        <div key={ name }>
          <div to={`/pokemonData/${name}`}>{name}</div>
        </div>
      ))}
      <button onClick={prev}>Anterior</button>
      <button onClick={next}>Próximo</button>
    </div>
  );
}

export default App;