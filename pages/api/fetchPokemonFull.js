const axios = require('axios').default;
const { SORT_VALUES, BASE_URL, WEAKNESS_CONVERSION } = require("../../utils/constants.js");

/**
 * Retrieves more detailed information about a specific pokemon
 * @param {*} req 
 * @param {*} res 
 */
export default async function handler(req, res) {
    try {
        const id = req.query.id;
        const { data } = await axios.get(`${BASE_URL}/pokemon/${id}`);

        const newPokemon = {
            id: data.id,
            name: data.name,
            height: data.height,
            weight: data.weight,
            type1: data.types[0].type.name,
            type2: data.types.length > 1 ? data.types[1].type.name : "None",
            photoUrl: data.sprites.other["official-artwork"].front_default,
            stats: {
                hp: data.stats[0].base_stat,
                atk: data.stats[1].base_stat,
                def: data.stats[2].base_stat,
                sp_atk: data.stats[3].base_stat,
                sp_def: data.stats[4].base_stat,
                speed: data.stats[5].base_stat,
            },
            
        }
        newPokemon.weaknesses = newPokemon.type2 != "None" ? WEAKNESS_CONVERSION[newPokemon.type2] : WEAKNESS_CONVERSION[newPokemon.type1];
        
        res.status(200).json(newPokemon);
    }
    catch (err) {
        res.status(400).json("Request Failed for Full Pokemon Info");
    }
}
  