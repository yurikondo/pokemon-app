import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonDate, setPokemonDate] = useState([]);
  const [nextURL, setNextURL] = useState("");

  //ブラウザをリロードした時に呼び出す
  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      // 各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      setNextURL(res.next);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    // レッスン13 Promise.allの解説
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonDate(_pokemonData);
  };

  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);
    setLoading(false);
  };

  const handlePrevPage = () => {};

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>ロード中✨</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonDate.map((pokemon, i) => {
                return (
                  <Card key={i} pokemon={pokemon}>
                    Pokemon{" "}
                  </Card>
                );
              })}
            </div>
            <div className="btn">
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
