document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("search-input");
  const searchForm = document.getElementById("input");

  const pokemonText = {
    name_id: document.getElementById("name_id"),
    weight_height: document.getElementById("weight_height"),
    name: document.getElementById("pokemon-name"),
    id: document.getElementById("pokemon-id"),
    height: document.getElementById("height"),
    weight: document.getElementById("weight"),
    sprites: document.getElementById("sprite"),
    stats: [
      {
        stat: {
          name: "hp",
        },
        base_stat: document.getElementById("hp"),
      },
      {
        stat: {
          name: "attack",
        },
        base_stat: document.getElementById("attack"),
      },
      {
        stat: {
          name: "defense",
        },
        base_stat: document.getElementById("defense"),
      },
      {
        stat: {
          name: "special-attack",
        },
        base_stat: document.getElementById("special-attack"),
      },
      {
        stat: {
          name: "special-defense",
        },
        base_stat: document.getElementById("special-defense"),
      },
      {
        stat: {
          name: "speed",
        },
        base_stat: document.getElementById("speed"),
      },
    ],
    types: document.getElementById("types"),
  };

  const getPokemon = async () => {
    resetSearch();
    try {
      const nameOrID = input.value.toLowerCase();
      const response = await fetch(
        `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nameOrID}`
      );
      const data = await response.json();

      //fill in the pokemon basic info
      pokemonText.id.innerText = data.id;
      pokemonText.name.innerText = data.name;
      pokemonText.height.innerText = data.height;
      pokemonText.weight.innerText = data.weight;
      pokemonText.sprites.src = data.sprites.front_default;
      pokemonText.sprites.alt = `${data.name} front default sprite`;
      // fill the stats
      for (let i = 0; i < pokemonText.stats.length; i++) {
        if (pokemonText.stats[i].stat.name === data.stats[i].stat.name) {
          pokemonText.stats[i].base_stat.innerText = data.stats[i].base_stat;
        }
      }
      //fill in the types
      for (let i = 0; i < data.types.length; i++) {
        console.log(data.types[i].type.name);
        pokemonText.types.innerHTML += `<p id="${data.types[i].type.name}">${data.types[i].type.name}</p>`;
      }

      pokemonText.name_id.style.display = "flex";
      pokemonText.weight_height.style.display = "flex";
    } catch (err) {
      resetSearch();
      alert("Pokemon not found");
    }
  };

  const resetSearch = () => {
    pokemonText.name_id.style.display = "none";
    pokemonText.weight_height.style.display = "none";
    pokemonText.id.innerText = "";
    pokemonText.name.innerText = "";
    pokemonText.height.innerText = "";
    pokemonText.weight.innerText = "";
    pokemonText.sprites.src = "";
    pokemonText.sprites.alt = "";

    for (let i = 0; i < pokemonText.stats.length; i++) {
      pokemonText.stats[i].base_stat.innerText = "";
    }

    pokemonText.types.innerHTML = "";
  };

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    getPokemon();
  });
});
