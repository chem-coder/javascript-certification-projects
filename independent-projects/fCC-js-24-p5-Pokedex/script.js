const pokemonInfo = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weightEl = document.getElementById("weight");
const heightEl = document.getElementById("height");
const imgField = document.getElementById("img-field");
const pokemonImg = document.getElementById("sprite");
const imgBackBtn = document.getElementById("img-back-btn");
const imgFwdBtn = document.getElementById("img-fwd-btn");
const typesEl = document.getElementById("types");
const statsTable = document.getElementById("stats-table");
const hpEl = document.getElementById("hp");
const attackEl = document.getElementById("attack");
const defenseEl = document.getElementById("defense");
const specialAttackEl = document.getElementById("special-attack");
const specialDefenseEl = document.getElementById("special-defense");
const speedEl = document.getElementById("speed");
let spritesObj = {};
let spritesArr = [];
let img_index = 0;

// Pull API data
const fetchData = async (url) => {
	try {
		const res = await fetch(url);
		const data = await res.json();
		return data;
	} catch(err) {
		console.log(err);
	}
}

const getStats = async () => {}
const getTypes = async () => {}

const loadImage = (imageArr, index) => {
	pokemonImg.src = imageArr[index];
}


const getSprites = async () => {}

const getBaseStats = (data) => {
	const { base_experience, height, order, sprites, stats, types, weight } = data;
	console.log("baseExp: " + base_experience);
	console.log("order: " + order);
	console.log("sprites: " + sprites); // object
	console.log("stats: " + stats); // array of nested objects
	console.log("types: " + types); // array of nested objects

	weightEl.innerText = `Weight: ${weight} `;
	heightEl.innerText = `Height: ${height}`;

	// Access stats in an array of nested objects
	const hp = stats.find(el => el.stat.name === "hp")?.base_stat;
	hpEl.innerText = hp;
	const attack = stats.find(el => el.stat.name === "attack")?.base_stat;
	attackEl.innerText = `${attack}`;
	const defense = stats.find(el => el.stat.name === "defense")?.base_stat;
	defenseEl.innerText = `${defense}`;
	const specialAttack = stats.find(el => el.stat.name === "special-attack")?.base_stat;
	specialAttackEl.innerText = `${specialAttack}`;
	const specialDefense = stats.find(el => el.stat.name === "special-defense")?.base_stat;
	specialDefenseEl.innerText = specialDefense;
	const speed = stats.find(el => el.stat.name === "speed")?.base_stat;
	speedEl.innerText = speed;
	const typesArr = types.map((el) => {
		typesEl.innerHTML += `<div class="type type-${el.type.name}">${el.type.name}</div>`;
	});	
	return sprites;
}

// Display the input value in one of the output elements (pokemonName)
const findPokemon = (data) => {
	const { results } = data; // results is an array of objects

	// Get  Pokemon name or ID# from the input
	const pSearch = searchInput.value.trim().toLowerCase();

	// Find the Pokemon matching that name or ID#
	const myPokemon = results.find((el) => el.name === pSearch || el.id === Number(pSearch));
	// myPokemon contains ID, name, and url to query for more information

	if (!myPokemon) {
		alert("Pokémon not found");
		return;		
	}
	
	pokemonName.innerText = myPokemon.name.toUpperCase();
	pokemonId.innerText = ` #${myPokemon.id}`;

	return myPokemon.url;
}

// Get value from the input element when the button is clicked
searchButton.addEventListener("click", handleSearch);
// Get value from the input element when the "Enter" key is pressed
searchInput.addEventListener("keydown", (e) => {
	if (e.key == "Enter") {
		handleSearch();
	}
});

async function handleSearch() {
	typesEl.innerHTML = '';
	const data = await fetchData(pokemonInfo);
	const statsUrl = findPokemon(data);

	const baseStatsData = await fetchData(statsUrl);
	spritesObj = getBaseStats(baseStatsData);
	// Filter out null sprites
	spritesArr = Object.values(spritesObj).filter(Boolean);
	
	const front_default_index = Object.keys(spritesObj).indexOf("front_default");
	img_index = front_default_index;
	loadImage(spritesArr, img_index);

	// Show "img-field"
	imgField.classList.remove("hidden");
	statsTable.classList.remove("hidden");
}

imgBackBtn.addEventListener("click", () => {
	img_index -= 1;
	if (img_index < 0) {
		img_index = spritesArr.length - 1;
	}
	loadImage(spritesArr, img_index);	
});

imgFwdBtn.addEventListener("click", () => {
	img_index += 1;
	if (img_index >= spritesArr.length) {
		img_index = 0;
	}
	loadImage(spritesArr, img_index);	
});



