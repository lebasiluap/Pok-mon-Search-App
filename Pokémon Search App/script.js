document.getElementById("search-button").addEventListener("click", function () {
  // Convert special characters and ensure lowercase for API compatibility
  let inputValue = document.getElementById("search-input").value.toLowerCase();
  inputValue = inputValue.replace(/♀/g, "-f").replace(/♂/g, "-m"); // Adjust for special characters

  const url = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${inputValue}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Pokémon not found");
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("pokemon-name").textContent =
        data.name.toUpperCase();
      document.getElementById("pokemon-id").textContent = `#${data.id}`;
      document.getElementById("weight").textContent = `Weight: ${data.weight}`;
      document.getElementById("height").textContent = `Height: ${data.height}`;

      // Clear existing types before adding new ones
      const typesElement = document.getElementById("types");
      typesElement.innerHTML = "";
      data.types.forEach((type) => {
        const typeSpan = document.createElement("span");
        typeSpan.textContent = type.type.name.toUpperCase();
        typesElement.appendChild(typeSpan);
        if (
          data.types.length > 1 &&
          data.types.indexOf(type) < data.types.length - 1
        ) {
          typesElement.appendChild(document.createTextNode(", ")); // Add comma for multiple types
        }
      });

      document.getElementById("hp").textContent = data.stats[0].base_stat;
      document.getElementById("attack").textContent = data.stats[1].base_stat;
      document.getElementById("defense").textContent = data.stats[2].base_stat;
      document.getElementById("special-attack").textContent =
        data.stats[3].base_stat;
      document.getElementById("special-defense").textContent =
        data.stats[4].base_stat;
      document.getElementById("speed").textContent = data.stats[5].base_stat;

      // Sprite handling
      let spriteElement = document.getElementById("sprite");
      if (!spriteElement) {
        spriteElement = document.createElement("img");
        spriteElement.setAttribute("id", "sprite");
        document.body.appendChild(spriteElement);
      }
      spriteElement.src = data.sprites.front_default;
    })
    .catch((error) => {
      alert("Pokémon not found");
    });
});
