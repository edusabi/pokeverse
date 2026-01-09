import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

const SPRITE_URL = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;

const FALLBACK =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png";

const Navbar = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [open, setOpen] = useState(false);

  const [selectedPokemon, setSelectedPokemon] = useState(() => {
    const saved = localStorage.getItem("pokemon");
    return saved ? JSON.parse(saved) : { id: 25, name: "pikachu" };
  });

  // 🔹 Buscar lista de Pokémon
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then(res => res.json())
      .then(data => {
        const formatted = data.results.map((p, index) => ({
          name: p.name,
          id: index + 1,
        }));
        setPokemonList(formatted);
      });
  }, []);

  // 🔹 Salvar no localStorage
  useEffect(() => {
    localStorage.setItem("pokemon", JSON.stringify(selectedPokemon));
  }, [selectedPokemon]);

  return (
    <header className={styles.header}>

      <div
        className={styles.avatar}
        onClick={() => setOpen(!open)}
      >
        <h2 style={{margin:"0 1rem 0 0"}}>PokeVerse</h2>
        <img
          src={SPRITE_URL(selectedPokemon.id)}
          onError={(e) => (e.target.src = FALLBACK)}
          alt={selectedPokemon.name}
        />
      </div>

      {open && (
        <div className={styles.dropdown}>
          {pokemonList.map((pokemon) => (
            <div
              key={pokemon.id}
              className={styles.pokemonOption}
              onClick={() => {
                setSelectedPokemon(pokemon);
                setOpen(false);
              }}
            >
              <img
                src={SPRITE_URL(pokemon.id)}
                onError={(e) => (e.target.src = FALLBACK)}
                alt={pokemon.name}
              />
              <span>{pokemon.name}</span>
            </div>
          ))}
        </div>
      )}

      <nav className={styles.nav}>
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/tipos">Tipos</NavLink>
        <NavLink to="/trocas">Trocas</NavLink>
        <NavLink to="/missoes">Missões</NavLink>
        <NavLink to="/loja">Loja</NavLink>
        <NavLink to="/perfil">Perfil</NavLink>
      </nav>

    </header>
  );
};

export default Navbar;
