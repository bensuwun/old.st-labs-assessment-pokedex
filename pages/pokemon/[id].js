import React from 'react';
import Head from 'next/head'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { UpCaseFirstChar } from "../../utils/UpCaseFirstChar";
import Image from 'next/image'
import axios from 'axios'
import Link from "next/link";

const Pokemon = ({id}) => {
  const [info, setInfo] = useState(null);
  const router = useRouter();

  useEffect(() => {
    
    async function fetchPokemonData() {
        const { data } = await axios.get('/api/fetchPokemonFull', {params: {id: router.query.id}});
        console.log(data);
        setInfo(data);
    }
    if (!router.isReady) return;
    
    fetchPokemonData();
  }, [router.isReady])

  return (
    <>
        <Head>
            <title>Pokemon Info</title>
        </Head>
        <nav className="container h-16 w-full flex text-2xl align-center px-10 bg-[#3466af] ">
            <div className="flex content-center items-center">
            <h2 className="font-bold">Old.St-Dex</h2>
            </div>
        </nav>

        <section className="container">
            {info == null ? <p>Loading</p> : 
                <div className="flex flex-col justify-center items-center mx-auto w-full bg-slate-400 py-5">
                    <div className="flex justify-between w-full px-36">
                        <a href={`/pokemon/${parseInt(router.query.id) - 1}`} className={router.query.id == 1 ? "invisible" : ""}>
                            <button className={`bg-[#ffcb05] rounded-md px-7 py-3 font-semibold`} disabled={router.query.id == 1 ? true : false}>
                                #{parseInt(router.query.id) - 1}
                            </button>
                        </a>
                       

                        <a href={`/pokemon/${parseInt(router.query.id) + 1}`} className={router.query.id == 1281 ? "invisible" : ""}>
                            <button className="bg-[#ffcb05] rounded-md px-7 py-3 font-semibold">
                                #{parseInt(router.query.id) + 1}
                            </button>
                        </a>
                    </div>
                    <h2 className="m-4 text-center text-4xl">{UpCaseFirstChar(info.name)} #{info.id}</h2>
                    <div className="flex gap-8 w-9/12 bg-full mb-4">
                        <Image
                            src={info.photoUrl}
                            alt={UpCaseFirstChar(info.name)}
                            className="self-center"
                            width={250}
                            height={250}
                            style={{
                                objectFit: "contain"
                            }}
                        />

                        {/* Basic Info */}
                        <div className="flex flex-col flex-wrap justify-start gap-5 rounded-md bg-slate-700 w-full p-5">
                            <p><span className="font-bold mr-1 w-0.5">Height:</span>  {info.height}</p>
                            <p><span className="font-bold mr-1 w-0.5">Weight:</span> {info.weight}</p>
                            <p><span className="font-bold mr-1 w-0.5">Type/s:</span>  {UpCaseFirstChar(info.type1) + (info.type2 != "None" ? ", " + UpCaseFirstChar(info.type2) : "")}</p>
                            <p><span className="font-bold mr-1 w-0.5">Weaknesses:</span> {info.weaknesses} </p>
                        </div>
                    </div>
                    {/* Stats */}
                    <div className="flex flex-col flex-wrap justify-start gap-5 rounded-md bg-slate-600 p-5 w-9/12 h-28">
                        <p><span className="font-bold mr-1 w-0.5">HP:</span>  {info.stats.hp}</p>
                        <p><span className="font-bold mr-1 w-0.5">Attack:</span>  {info.stats.atk}</p>
                        <p><span className="font-bold mr-1 w-0.5">Defense:</span>  {info.stats.def}</p>
                        <p><span className="font-bold mr-1 w-0.5">Sp. Attack:</span>  {info.stats.sp_atk}</p>
                        <p><span className="font-bold mr-1 w-0.5">Sp. Defense:</span>  {info.stats.sp_def}</p>
                        <p><span className="font-bold mr-1 w-0.5">Speed:</span>  {info.stats.speed}</p>
                    </div>
                </div>
            }
        </section>
    </>
  );
};

export default Pokemon;