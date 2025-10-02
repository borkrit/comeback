"use client"
import {useEffect, useRef, useState} from "react";
import useCities from "@/store/cityStore";

const API = process.env.API_KEY
import AddIcon from '@mui/icons-material/Add';
import style from './style.module.scss'

const Search = () => {
    const addItem = useCities(state => state.addCity)
    const [openSearch, setOpenSearch] = useState(false)
    const [name, setName] = useState('')
    const [lists, setLists] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const data = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${API}`);
            const res = await data.json();
            setLists(res)
            setLoading(false)
        }

        fetchData();
    }, [name]);


    const handleChange = (item) => {
        addItem(item).then(()=>{
            setOpenSearch(false)
            setName('')
        })
    }

    return (
        <div className={style.search}>
            <input type="text"
                   style={{width: '100%',height: '55px', padding: '10px',backgroundColor:'#80808000',borderRadius:'40px'}}
                   value={name}
                   placeholder='Search...'
                   onChange={(e) => {
                       setOpenSearch(true)
                       setName(e.target.value)
                   }}/>


            <div className={`${style.lists} ${openSearch && style['lists__expand']}`} style={{width: '100%', padding: '10px'}}>
                {loading && <p>loading</p>}
                {lists.length === 0 && <p>Ooops! Try again</p>}
                {
                    lists.length > 0 && lists.map((item, index) => {
                        return (
                            <div key={index} style={{display: 'flex', justifyContent: 'space-between',padding: '10px 0'}}>
                                {item.name} {item?.state} - {item?.country}
                                <button onClick={() => handleChange(item)}><AddIcon/></button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Search;