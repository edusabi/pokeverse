import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

const gifs = [
    "https://i.redd.it/v015pnmeg5m81.gif",
    "https://shinyash.com/cdn/shop/files/0249_-_-Lugia.gif?v=1743342565&width=1013",
  "https://shinyash.com/cdn/shop/files/0006---Charizard.gif?v=1737774265",
  "https://i.makeagif.com/media/2-16-2016/wu260n.gif",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg14fsViCCREl8DwLwsKAtt6PLW__8nnCbatddrFqQiVyspQaCbVerqLI7m8rbN2-NakWMuO6hj5bugmhxTMJze2lfaDGhWCeP4yQJasFyV5iG76XNBMU5RLSqEGr4BjIgsPvbtrhKdmv0/s1600/384.gif",
  "https://cdn.staticneo.com/w/pokemon/8/80/392.gif",
  "https://shinyash.com/cdn/shop/files/0004_-_-Charmander_ca93207e-35b7-4aa6-98ee-192dc51f2d1e.gif?v=1747272731&width=650",
  "https://pokefella.com/cdn/shop/files/Mew_800x.gif?v=1613677022",
  "https://wiki.pokexgames.com/images/7/7f/18_-_Pidgeot.gif",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgtH7-sBV9eSKQAD7XBwHJAlXu1jJHNx5x6NiNGPF1fxYubKLhK-4hzYAC9TaTeqtUKkw4br5gm9LmuZ-cnYbKNtbe4cuRHqxEoE-m91kphvH5Gh4K5_dW09S1jdW57gPlSJRdwuO2gU6HYsO4lYosPbQXbFF6FJZX6CXSc7YNZRqDTrx8-0YLUHj7LUXE/s320/0001%20-%20Bulbasaur.gif",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi_nYInnZpAVYqvqzVFbwlyL8MZn98PC1p3Bpvgy4krUiF7w6uFQA7QUnsHDzFd5uSkncVKNozdm8UYW-3Tr7q8k6FSI1YmT2doycbSZLcbGzCPKeov7wOtIfyT-Q3sHNfcTf1LsAbhErk/s1600/Noivern_XY.gif",
  "https://professorlotus.com/Sprites/Gible.gif",
  "https://professorlotus.com/Sprites/Gengar.gif",


];

const Navbar = () => {
  const [selectedGif, setSelectedGif] = useState(() => {
    return localStorage.getItem("pokemonGif") || gifs[0];
  });

  const [open, setOpen] = useState(false);

  // ✅ EFEITO APENAS PARA SINCRONIZAR COM LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("pokemonGif", selectedGif);
  }, [selectedGif]);

  return (
    <header className={styles.header}>

      <div
        className={styles.avatar}
        onClick={() => setOpen(!open)}
      >
        <img src={selectedGif} alt="Pokemon selecionado" />
      </div>

      {open && (
        <div className={styles.dropdown}>
          {gifs
            .filter(gif => gif !== selectedGif)
            .map((gif, index) => (
              <img
                key={index}
                src={gif}
                alt="pokemon option"
                onClick={() => {
                  setSelectedGif(gif);
                  setOpen(false);
                }}
              />
            ))}
        </div>
      )}

      <nav className={styles.nav}>
        <NavLink to="/">Home</NavLink>
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
