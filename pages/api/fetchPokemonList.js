import { getCurrentPokemonCount } from "../../utils/apiUtils";

const { SORT_VALUES, BASE_URL } = require("../../utils/constants.js");
const axios = require('axios').default;

/**
 * Retrieves list of ID, Name of all pokemons from pokeapi.co
 * @param {*} req 
 * @param {*} res 
 */
export default async function handler(req, res) {
    // Fetch current total pokemon count
    const count = await getCurrentPokemonCount();

    // Fetch list of pokemons, prepping for sort
    try {
        const result = await axios.get(`${BASE_URL}/pokemon?limit=${count}`);
        if (result.status == 200) {
            var origData = result.data.results;
            // Create list of dictionary containing (ID, Name), to be used for Sort/Filter optimization
            var pokemonList = origData.map((pokemon) => {
                var url = pokemon.url.slice(0, -1)
                var id = parseInt(url.substring(url.lastIndexOf('/') + 1));
                return {
                    id,
                    name: pokemon.name,
                }
            })
            res.status(200).json(pokemonList);
        }
    }
    catch (ex) {
        res.status(400).json(ex)
    }
    
}
  