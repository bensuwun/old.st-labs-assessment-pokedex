import Image from "next/image";
import Link from "next/link";
import { UpCaseFirstChar } from "../utils/UpCaseFirstChar";

const PokemonListItem = ( {basicInfo} ) => {
    return (
        <div className="flex flex-col justify-center items-start p-7 bg-white relative text-black rounded-md w-56">
            <Image
                src={basicInfo.photoUrl}
                alt="Pokemon Image"
                className="self-center"
                width={150}
                height={150}
                style={{
                    objectFit: "contain"
                }}
            />

            <p className="text-slate-400 mb-2">#{basicInfo.id}</p>
            <h2><span className="font-bold mr-1 w-0.5">Name:</span> {UpCaseFirstChar(basicInfo.name)}</h2>
            <p><span className="font-bold mr-1 w-0.5">Type/s:</span>  {UpCaseFirstChar(basicInfo.type1) + (basicInfo.type2 != "None" ? ", " + UpCaseFirstChar(basicInfo.type2) : "")}</p>
        </div>
    )
}

export default PokemonListItem;