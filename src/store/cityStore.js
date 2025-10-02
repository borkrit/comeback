import {create} from 'zustand'
const API = process.env.API_KEY

const useCities = create((set,get)=>({
    cities:[],

    addCity:async (item)=>{

        const res =  await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${item.lat}&lon=${item.lon}&units=metric&appid=${API}`)
        const inf =  await res.json()
        const el =  { name: item.name, information:inf  }

        set((state)=>({
                cities:[...state.cities,el],
        }))
        get().saveToLocal()
    },

    selectedCity: (name)=>{
        return get().cities.find((item)=> item.name.toLowerCase() === name.toLowerCase())
    },

    rehydrate: ()=>{
        const localData = localStorage.getItem("cities")
        if(localData){
           const parsed=  JSON.parse(localData)
            for (const data of parsed) {
                set((state)=>({
                    cities: [...state.cities,data],
                }))
                get().refreshCurrentCity(data.name)
            }
        }



    },



    saveToLocal:()=> {

        const persistedCity = get().cities.map(({name, information})=> ({name, lon: information.lon,lat:information.lat}) )

        localStorage.setItem("cities", JSON.stringify(persistedCity));
},


    removeCity:(cityInfo)=>{
      set((state)=>({
          cities: state.cities.filter(city=>city.information.lat !== cityInfo.information.lat || city.information.lon !== cityInfo.information.lon)
      }))
        get().saveToLocal()

    },
    refreshCurrentCity: async (name) => {
        const city = get().cities.find((c) => c.name === name);

        if (!city) return;

        const res = await fetch(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${API}`
        );
        const inf = await res.json();

        set((state) => {
            const updated = state.cities.map((c) =>
                c.name === name ? { ...c, information: inf } : c
            );
            localStorage.setItem(
                "cities",
                JSON.stringify(updated.map(({ name, lat, lon }) => ({ name, lat, lon })))
            );
            return { cities: updated };
        });
    },


}))
export default useCities;