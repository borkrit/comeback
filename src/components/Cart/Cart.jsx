import Link from "next/link";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import useCities from "@/store/cityStore";
import style from './style.module.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Cart = ({city}) => {
    const removeCity = useCities(state => state.removeCity);
    const refreshCurrentCity = useCities(state => state.refreshCurrentCity);

    return (
        <div className={style.city}>
            <Link style={{flex:1,display:'flex',justifyContent:'center',alignItems:'start',gap:'30px'}}
                  href={`/weather/${city.name.toLowerCase()}`}>
                <div className="" style={{flexBasis:'150px',alignItems:'start',}}>
                    <p style={{fontSize:'35px'}}>
                        {city.information?.current?.temp} ° <br/>

                    </p>
                    <span style={{fontSize:'20px',fontWeight:'bold'}}>
                    {city.information?.current?.weather[0].main}
                    </span>
                </div>
                <div className="" style={{flexBasis:'140px',display: 'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',textAlign:'center'}}>
                    <img src={`http://openweathermap.org/img/wn/${city.information?.current?.weather[0].icon}@2x.png`} alt="weather icon" />
                     <span style={{fontSize:'20px',fontWeight:'bold'}}>
                    {city.name}
                     </span>

                </div>
            </Link>
            <div style={{display: 'flex', flexDirection: 'column',position:'absolute',right:'10px'}}>
                <details>
                    <summary><MoreVertIcon/></summary>
                    <div className={style['city__action']}>
                        <button
                            style={{flex:1}}
                            onClick={() => refreshCurrentCity(city.name)}>
                            <RefreshIcon/>
                        </button>
                        <button style={{flex:1}} onClick={() => removeCity(city)}>
                            <DeleteIcon/>
                        </button>
                    </div>

                </details>

            </div>

        </div>
    )
}
export default Cart;