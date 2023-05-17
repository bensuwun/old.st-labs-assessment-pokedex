const SORT_VALUES = {
    ID_ASC: 0,
    ID_DESC: 1,
    NAME_ASC: 2,
    NAME_DESC: 3
}

const BASE_URL = `https://pokeapi.co/api/v2/`

const WEAKNESS_CONVERSION = {
    normal: "Rock, Ghost, Steel",
    fighting: "Flying, Poison, Psychic, Bug, Ghost, Fairy",
    flying: "Rock, Steel, Electric",
    poison: "Poison, Ground, Rock, Ghost, Steel",
    ground: "Flying, Bug, Grass",
    rock: "Fighting, Ground, Steel",
    bug: "Fighting, Flying, Poison, Ghost, Steel, Fire, Fairy",
    ghost: "Normal, Dark",
    steel: "Steel, Fire, Water, Electric",
    fire: "Rock, Fire, Water, Dragon",
    water: "Water, Grass, Dragon",
    grass: "Flying, Poison, Bug, Steel, Fire, Grass, Dragon",
    electric: "Ground, Grass, Electric, Dragon",
    psychic: "Steel, Psychic, Dark",
    ice: "Steel, Fire, Water, Ice",
    dragon: "Steel, Fairy",
    fairy: "Poison, Steel, Fire",
    dark: "Fighting, Dark, Fairy"
}

module.exports = {
    SORT_VALUES,
    BASE_URL,
    WEAKNESS_CONVERSION
}