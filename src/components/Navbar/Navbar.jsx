import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

const SPRITE_URL = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;

const FALLBACK =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png";

const Navbar = ({ user, loading }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [openPokemon, setOpenPokemon] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [selectedPokemon, setSelectedPokemon] = useState(() => {
    const saved = localStorage.getItem("pokemon");
    return saved ? JSON.parse(saved) : { id: 25, name: "pikachu" };
  });

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.results.map((p, index) => ({
          name: p.name,
          id: index + 1,
        }));
        setPokemonList(formatted);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("pokemon", JSON.stringify(selectedPokemon));
  }, [selectedPokemon]);

  if (loading) return null;

  return (
    <header className={styles.header}>
      <div
        className={styles.avatar}
        onClick={() => setOpenPokemon(!openPokemon)}
      >
        <img
          src={SPRITE_URL(selectedPokemon.id)}
          onError={(e) => (e.target.src = FALLBACK)}
          alt={selectedPokemon.name}
        />
      </div>

      {openPokemon && (
        <div className={styles.dropdown}>
          {pokemonList.map((pokemon) => (
            <div
              key={pokemon.id}
              className={styles.pokemonOption}
              onClick={() => {
                setSelectedPokemon(pokemon);
                setOpenPokemon(false);
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

      {/* BOTÃO MOBILE */}
      <button
        className={styles.menuButton}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
        {user ? (
          <>
            <NavLink to="/paginaInicial" onClick={() => setMenuOpen(false)}>Inicio</NavLink>
            <NavLink to="/tipos" onClick={() => setMenuOpen(false)}>Tipos</NavLink>
            <NavLink to="/trocas" onClick={() => setMenuOpen(false)}>Trocas</NavLink>
            <NavLink to="/missoes" onClick={() => setMenuOpen(false)}>Missões</NavLink>
            <NavLink to="/loja" onClick={() => setMenuOpen(false)}>Loja</NavLink>
            <NavLink to="/perfil" onClick={() => setMenuOpen(false)}>Perfil</NavLink>
          </>
        ) : (
          <NavLink to="/">Inicio</NavLink>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
