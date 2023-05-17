const { SORT_VALUES, BASE_URL } = require("./constants.js");
const axios = require('axios').default;

/**
 * Retrieves current total pokemon count from pokeapi.co
 * @returns int - current total pokemon count
 */
async function getCurrentPokemonCount() {
    var count = null;
    try {
        const { data } =  await axios.get(`${BASE_URL}/pokemon/`);
        count = data.count;
    } catch (err) {
        console.warn('Error when retrieving total pokemon count.')
        console.warn(err);
    }
    return count;
}


module.exports = {
    getCurrentPokemonCount
}
