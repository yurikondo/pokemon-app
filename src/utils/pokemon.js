export const getAllPokemon = (url) => {
  return new Promise((resolve, reject) => {
    // レッスン１０で解説
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
};
