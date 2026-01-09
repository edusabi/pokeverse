import { useState, useEffect } from "react";
import axios from "axios";
import EscolherInicial from "./EscolherInicial";
import styles from "./Perfil.module.css";

const Perfil = () => {
  // Estados do Formulário
  const [trainerName, setTrainerName] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [trainerImagePreview, setTrainerImagePreview] = useState(null);
  const [firstPokemon, setFirstPokemon] = useState(null);

  // Estados de Controle
  const [openSelector, setOpenSelector] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true); // Novo: estado de carregamento inicial
  const [message, setMessage] = useState("");

  // Estado do Perfil (Dados do usuário)
  const [createdProfile, setCreatedProfile] = useState(null);

  // 1. USEEFFECT: Busca o perfil assim que a página carrega
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users/perfil", {
          withCredentials: true,
        });

        // Se o servidor retornar dados, salvamos no estado
        if (response.data) {
          setCreatedProfile(response.data);
        }
      } catch (error) {
        // Se der 404, significa que o usuário ainda não tem perfil.
        // Apenas silenciamos o erro e deixamos o form aparecer.
        console.log(
          "Usuário sem perfil ou erro na busca:",
          error.response?.status
        );
      } finally {
        setLoadingData(false);
      }
    };

    fetchProfile();
  }, []);

  // 2. FUNÇÃO: Envia o formulário para criar o perfil
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("trainer_name", trainerName);
      formData.append("gender", gender);
      formData.append("bio", bio);
      formData.append("first_pokemon", JSON.stringify(firstPokemon));

      if (imageFile) {
        formData.append("image", imageFile);
      }

      await axios.post("http://localhost:3000/users/perfil", formData, {
        withCredentials: true,
      });

      const profileResponse = await axios.get(
        "http://localhost:3000/users/perfil",
        { withCredentials: true }
      );

      setCreatedProfile(profileResponse.data);

      setMessage("Perfil criado com sucesso!");
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.error || "Erro ao criar perfil");
    } finally {
      setLoading(false);
    }
  };

  // Se estiver carregando a verificação inicial, mostra um loading simples
  if (loadingData) {
    return (
      <div className={styles.container}>
        <p>Carregando perfil...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {!createdProfile ? (
        /* ================= FORMULÁRIO DE CRIAÇÃO ================= */
        <>
          <h1 className={styles.title}>Criar Perfil</h1>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* NOME */}
            <label className={styles.label}>
              Nome do Treinador:
              <input
                className={styles.input}
                type="text"
                value={trainerName}
                onChange={(e) => setTrainerName(e.target.value)}
                required
              />
            </label>

            {/* SEXO */}
            <label className={styles.label}>
              Sexo:
              <select
                className={styles.select}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Selecione</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
              </select>
            </label>

            {/* BIO */}
            <label className={styles.label}>
              Bio:
              <textarea
                className={styles.textarea}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </label>

            {/* POKÉMON INICIAL */}
            <label className={styles.label}>
              Pokémon inicial:
              <input
                className={styles.input}
                type="text"
                readOnly
                placeholder="Clique para escolher"
                value={firstPokemon ? firstPokemon.name : ""}
                onClick={() => setOpenSelector(true)}
                required
              />
            </label>

            {/* PREVIEW DO POKÉMON NO FORM */}
            {firstPokemon && (
              <div className={styles.previewBox}>
                <p className={styles.previewTitle}>Pokémon escolhido</p>
                <img
                  src={firstPokemon.image}
                  alt={firstPokemon.name}
                  className={styles.pokemonPreview}
                />
                <p className={styles.pokemonName}>{firstPokemon.name}</p>
              </div>
            )}

            {/* IMAGEM DO TREINADOR */}
            <label className={styles.label}>
              Imagem do treinador:
              <input
                className={styles.fileInput}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImageFile(file);
                  if (file) {
                    setTrainerImagePreview(URL.createObjectURL(file));
                  }
                }}
              />
            </label>

            {/* PREVIEW DA IMAGEM DO TREINADOR NO FORM */}
            {trainerImagePreview && (
              <div className={styles.previewBox}>
                <p className={styles.previewTitle}>Preview do treinador</p>
                <img
                  src={trainerImagePreview}
                  alt="Preview treinador"
                  className={styles.trainerPreview}
                />
              </div>
            )}

            <button
              type="submit"
              className={styles.button}
              disabled={loading || !firstPokemon}
            >
              {loading ? "Criando..." : "Criar Perfil"}
            </button>
          </form>

          {message && <p className={styles.message}>{message}</p>}
        </>
      ) : (
        <div className={styles.profileCard}>
          <h2 className={styles.profileTitle}>Perfil do Treinador</h2>

          {createdProfile.trainer_image_url ? (
            <img
              src={createdProfile.trainer_image_url}
              alt={createdProfile.trainer_name}
              className={styles.profileAvatar}
            />
          ) : (
            <div className={styles.noAvatar}>Sem foto</div>
          )}

          <div className={styles.profileInfo}>
            <p>
              <strong>Nome:</strong> {createdProfile.trainer_name}
            </p>
            <p>
              <strong>Sexo:</strong> {createdProfile.trainer_gender}
            </p>
            <p>
              <strong>Bio:</strong> {createdProfile.trainer_bio}
            </p>
            <p>
              <strong>Moedas:</strong> 🪙 {createdProfile.coins}
            </p>
          </div>

          <div className={styles.pokemonCard}>
            <h3>Pokémon Inicial</h3>
            <img
              src={createdProfile.first_pokemon?.image}
              alt={createdProfile.first_pokemon?.name}
              className={styles.pokemonPreview}
            />
            <p className={styles.pokemonName}>
              {createdProfile.first_pokemon?.name}
            </p>

            {createdProfile.stats && createdProfile.stats.tem_evolucao ? (
              <div className={styles.progressContainer}>
                {/* Texto explicativo */}
                <div className={styles.progressLabel}>
                  <span>Próx: {createdProfile.stats.proximo_nome}</span>
                  <span>{createdProfile.stats.dias_restantes} dias</span>
                </div>

                {/* Barra visual */}
                <div className={styles.progressBarBack}>
                  <div
                    className={styles.progressBarFill}
                    style={{ width: `${createdProfile.stats.porcentagem}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              /* Se for nível máximo (Charizard/Venusaur/Blastoise) */
              <div className={styles.progressContainer}>
                <span className={styles.maxLevelBadge}>Nível Máximo</span>
              </div>
            )}
          </div>
        </div>
      )}

      {openSelector && (
        <EscolherInicial
          onSelect={(pokemon) => {
            const now = new Date().toISOString();

            setFirstPokemon({
              id: pokemon.id,
              name: pokemon.name,
              types: pokemon.types,
              image: pokemon.image,
              level: 5,
              born_at: now, // 🔥
              is_shiny: false, // 🔥
            });

            setOpenSelector(false);
          }}
          onClose={() => setOpenSelector(false)}
        />
      )}
    </div>
  );
};

export default Perfil;
