import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { getPokemonInfo, LoadPokemonList } from "../utils/apiUtils"
import { SORT_VALUES } from "../utils/constants"
import PokemonListItem from "../components/PokemonListItem";

import { useState, useEffect } from 'react';
import axios from 'axios'


export default function Home() {
  const [pkmnListID, setPkmnListID] = useState([]);
  const [pkmnListName, setPkmnListName] = useState(null);
  const [sortValue, setSortValue] = useState(SORT_VALUES.ID_ASC)
  const [searchValue, setSearchValue] = useState("");
  const [curPkmns, setCurPkmns] = useState(null);
  const [offset, setOffset] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [initialLoaded, setInitialLoaded] = useState(false);

  // Query at most 10 more from current offset
  async function loadMore() {
    var pkmnInfos = [];
    var counter = 0;
    if (sortValue == SORT_VALUES.ID_ASC) {
      for (let i = offset; i < offset + 10; i++) {
        const { data } = await axios.get(`/api/fetchPokemon`, {params: {id: pkmnListID[i].id}});
        if (data) {
          pkmnInfos.push(data);
          counter += 1;
        }
        else {
          // Assume no more data
          break;
        }
      }
    }
    else {
      for (let i = offset; i < offset + 10; i++) {
        const { data } = await axios.get(`/api/fetchPokemon`, {params: {id: pkmnListName[i].id}});
        if (data) {
          pkmnInfos.push(data);
          counter += 1;
        }
        else {
          // Assume no more data
          break;
        }
      }
    }

    setOffset(offset + counter)
    setCurPkmns(curPkmns.concat(pkmnInfos))
  }

  

  useEffect(() => {
    async function fetchData() {
      // Set sorted pokemon list ID
      const { data } = await axios.get("/api/fetchPokemonList");
      const tempList = Object.values(data)
      setPkmnListID(tempList);
      
      // Set sorted pokemon list name
      setPkmnListName([...tempList].sort((a, b) => b.name < a.name ? 1 : -1));

      // Query first batch of pokemon details
      var pkmnInfos = [];

      // Get details
      for (let i = offset; i < offset + 10; i++) {
        const { data } = await axios.get(`/api/fetchPokemon`, {params: {id: tempList[i].id}});
        pkmnInfos.push(data);
      }
      setOffset(offset + 10);
      setCurPkmns(pkmnInfos);
      setLoading(false);
      setInitialLoaded(true);
    }

    fetchData();
  }, []);

  useEffect(() => {
    
    async function sortData() {
      // Clear data, query new batch starting from 0 offset
      setOffset(0);
      setCurPkmns([]);

      var pkmnInfos = [];

      // Sort
      if (sortValue == SORT_VALUES.ID_ASC) {
        for (let i = 0; i < 10; i++) {
          const { data } = await axios.get(`/api/fetchPokemon`, {params: {id: pkmnListID[i].id}});
          pkmnInfos.push(data);
        }
      }
      else {
          for (let i = 0; i < 10; i++) {
            const { data } = await axios.get(`/api/fetchPokemon`, {params: {id: pkmnListName[i].id}});
            pkmnInfos.push(data);
          }
      }

      // Filter
      pkmnInfos.filter((pkmn) => console.log(pkmn))

      setOffset(10);
      setCurPkmns(pkmnInfos)
      setLoading(false);
    }
    if (initialLoaded) {
      setLoading(true);
      sortData();
    }
  }, [sortValue])

  useEffect(() => {
    async function filterData() {
       // Clear data, query new batch starting from 0 offset
      setOffset(0);
      setCurPkmns([]);

      var pkmnSet = []
      var pkmnInfos = []

      // Filter name or ID
      if (searchValue != "") {
        pkmnSet = pkmnListName.filter((pkmn) => pkmn.name == searchValue.toLowerCase() || pkmn.id == searchValue)
      }

      if (pkmnSet != null)  {
        for (let i = 0; i < pkmnSet.length; i++) {
          const { data } = await axios.get(`/api/fetchPokemon`, {params: {id: pkmnSet[i].id}});
            pkmnInfos.push(data);
        }
      }
      
      setCurPkmns(pkmnInfos)
      setLoading(false);
    }

    if (initialLoaded) {
      setLoading(true);
      filterData();
    }
  }, [searchValue])

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <nav className="container h-16 w-full flex text-2xl align-center px-10 bg-[#3466af] ">
        <div className="flex content-center items-center">
          <h2 className="font-bold">Old.St-Dex</h2>
        </div>
      </nav>

       {/* Search and Sort Section */}
      <section className="container w-full h-auto bg-slate-400">
        <form onSubmit={(e) => {
          e.preventDefault();
          setSearchValue(document.getElementById("search_val").value.toLowerCase());
        }}>
          <div className="flex py-6 justify-center gap-8 items-center content-center">
              {/* Search */}
              <input type="text" id="search_val" name="search_val" placeholder="Search ID or Name..."
                className="w-2/6 rounded-md px-5 py-4">
              </input>

              {/* Sort */}
              <div className="flex w-3/12 items-center content-center">
                <h2 className="mr-4 text-xl font-semibold">Sort By:</h2>
                <select id="sort_selector" name="sort_value"  onChange={(e) => {setSortValue(e.target.value)}}
                  className="w-4/6 rounded-md py-4 px-2">
                  <option value={SORT_VALUES.ID_ASC}>ID ASC</option>
                  <option value={SORT_VALUES.NAME_ASC}>NAME ASC</option>
                </select>
              </div>
          </div>
        </form>
      </section>

      {/* Pokemons */}
      <section className="container">
        <div className="flex flex-col content-center items-center py-10">
          <div className="flex flex-wrap gap-8 justify-center w-5/6 mx-auto mb-10" id="pkmn-list-container">
            {isLoading ? <p>Loading</p> : curPkmns.map((pkmn, index) => {
              return <a href={`/pokemon/${pkmn.id}`} key={index}>
                      <PokemonListItem basicInfo={pkmn}  />
                  </a>
            })}
          </div>
          
          <button className="bg-[#ffcb05] rounded-md px-7 py-3 font-semibold" onClick={loadMore}>
            Load More
          </button>
        </div>
        
      </section>
    </>
    
  )
}