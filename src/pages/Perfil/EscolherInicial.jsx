import { useEffect, useState } from "react";

const STARTER_IDS = [
  1, 4, 7,
  152, 155, 158,
  252, 255, 258,
  387, 390, 393,
  495, 498, 501,
  650, 653, 656,
  722, 725, 728,
  810, 813, 816,
  906, 909, 912
];

const EscolherInicial = ({ onSelect, onClose }) => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStarters = async () => {
      const promises = STARTER_IDS.map(async (id) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();

        return {
          id: data.id,
          name: data.name,
          types: data.types.map((t) => t.type.name),
          image: data.sprites.other["official-artwork"].front_default,
        };
      });

      const result = await Promise.all(promises);
      setPokemons(result);
      setLoading(false);
    };

    loadStarters();
  }, []);

  if (loading) {
    return (
      <div style={styles.loading}>
        Carregando Pokémon iniciais...
      </div>
    );
  }

  return (
    <div style={styles.overlay}>
      <h1 style={{textAlign:"center"}}>Escolha seu Pokémon Inicial</h1>

      <div style={styles.grid}>
        {pokemons.map((p) => (
          <div
            key={p.id}
            style={styles.card}
            onClick={() => onSelect(p)}
          >
            <img src={p.image} alt={p.name} style={styles.image} />
            <h3 style={{ textTransform: "capitalize" }}>{p.name}</h3>
            <small>{p.types.join(" / ")}</small>
          </div>
        ))}
      </div>

      <button onClick={onClose} style={styles.close}>
        Voltar
      </button>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "#0b0b0b",
    color: "#fff",
    zIndex: 9999,
    padding: 20,
    overflowY: "auto",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: 20,
    marginTop: 30,
  },
  card: {
    background: "#1a1a1a",
    borderRadius: 12,
    padding: 10,
    textAlign: "center",
    cursor: "pointer",
    transition: "0.2s",
  },
  image: {
    width: 120,
    height: 120,
    objectFit: "contain",
  },
  close: {
    marginTop: 30,
    padding: "10px 20px",
    borderRadius: 8,
    cursor: "pointer",
  },
  loading: {
    position: "fixed",
    inset: 0,
    background: "#000",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
  },
};

export default EscolherInicial;
