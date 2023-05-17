const axios = require('axios').default;
const { SORT_VALUES, BASE_URL } = require("../../utils/constants.js");

/**
 * Retrieves specific information about a specific pokemon
 * @param {*} req 
 * @param {*} res 
 */
export default async function handler(req, res) {
    // Retrieve basic info from pokeapi.co
    try {
        var newPokemon = {
            id: 0,
            name: "",
            type1: "",
            type2: "",
            photoUrl: "" // TODO: Placeholder image here
        }
        
        const id = req.query.id
        console.log(req.query)
        
        const { data } = await axios.get(`${BASE_URL}/pokemon/${id}`);
        newPokemon.id = data.id;
        newPokemon.name = data.name;
        newPokemon.type1 = data.types[0].type.name;
        newPokemon.type2 = data.types.length > 1 ? data.types[1].type.name : "None";
        newPokemon.photoUrl = data.sprites.other["official-artwork"].front_default
       
        res.status(200).json(newPokemon);
    }
    catch (err) {
        res.status(400).json("Request Failed");
    }
}
  