import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonDate, setPokemonDate] = useState([]);

  //ブラウザをリロードした時に呼び出す
  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      // 各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    // レッスン13 Promise.allの解説
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // console.log(pokemon);
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonDate(_pokemonData);
    console.log(pokemonDate);
  };
  return (
    <div className="App">
      {loading ? <h1>ロード中✨</h1> : <h1>ポケモンデータを取得しました</h1>}
    </div>
  );
}

export default App;
