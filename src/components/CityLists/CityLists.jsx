'use client'
import useCities from "@/store/cityStore";
import {useEffect} from "react";
import Cart from "@/components/Cart/Cart";

const CityList = () => {
    const cities = useCities(state => state.cities);


    const rehydrate = useCities(state => state.rehydrate);

    useEffect(() => {
        if (cities.length === 0){
            rehydrate()
        }
    },[])



    return (
        <div style={{display: 'flex',justifyContent:'space-between',flexWrap: 'wrap',gap: '22px'}}>
            {cities.length === 0 && <p>Select city</p>}
            {
                cities.length > 0 && cities.map((city, index) => <Cart city={city} key={index} />)
            }
        </div>
    )
}
export default CityList;