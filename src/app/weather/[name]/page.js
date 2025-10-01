import Link from "next/link";
import Details from "@/components/Details/Details";


export default async function Page({params}) {
const {name} = params;


    return (
        <div>
            <Details name={name} />
        </div>
    )
}
