'use client'
import useCities from "@/store/cityStore";
import Image from "next/image";
import style from './style.module.scss'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import WavesIcon from '@mui/icons-material/Waves';
import SpeedIcon from '@mui/icons-material/Speed';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThermostatAutoIcon from '@mui/icons-material/ThermostatAuto';
import LightModeIcon from '@mui/icons-material/LightMode';
import AirIcon from '@mui/icons-material/Air';

import Sun from '@/free-icon-sunset-430485.png'
import DetailsTitle from "@/components/Details/DetailsTitle";
const Details =({name})=>{
    const selectedCity = useCities(state => state.selectedCity(name));

    if(!selectedCity){
        return (
            <div>
                <Link href="/">
                    oops could found city return to back
                </Link>
            </div>
        );
    }
    function formatSunTime(unix, tzOffset) {
        if (!unix) return "—";
        return new Date((unix + tzOffset) * 1000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });
    }
    return (
        <section className={style.details}>
            <Link  href={'/'}>Back</Link>

            <div className={style.title} >
                <h1 className={style.bold}>{selectedCity?.name}</h1>
                <p className={`${style.degree}`}>
                    {selectedCity?.information?.current?.temp}°
                </p>
                <span>
                    Feels like: {selectedCity?.information?.current?.feels_like} °
                </span>
                <span>
                     {selectedCity?.information?.current?.weather[0].main}
                </span>
            </div>

            <div className={`${style.container} ${style.sunrise}`} style={{maxWidth:"45%",width:'100%'}}>
                <DetailsTitle>
                    <WbTwilightIcon/> Sunrise
                </DetailsTitle>
                <hr />
                <div style={{marginTop:'10px'}}>
                    <span>Sunrise</span>
                    {
                        formatSunTime(selectedCity?.information?.current?.sunrise,selectedCity?.information.timezone_offset)
                    }
                </div>
                <div >
                    <Image src={Sun} style={{margin:'0 auto'}} alt="Sun" width={100} height={80} />

                </div>
                <div className="">
                    <span>
                        Sunset
                    </span>
                    {
                        formatSunTime(selectedCity?.information?.current?.sunset,selectedCity?.information.timezone_offset)
                    }
                </div>
            </div>
            <div className={`${style.container} ${style.sunrise}`} style={{maxWidth:"45%",width:'100%'}}>
                <DetailsTitle>
                    <LightModeIcon/>uvi
                </DetailsTitle>
                <hr/>
                <div className="" style={{display:"flex",
                    flexDirection:"column",
                    marginBlock:'auto',justifyContent:"start",alignItems:"start"}}>
                    <p className={style.bigger__text} style={{marginBottom:'10px'}}>
                        {selectedCity?.information?.current?.uvi}
                    </p>
                    <div className={style.uvi__gradient}></div>
                </div>


            </div>

            <div className={`${style.container} ${style.wind}`} style={{maxWidth:"100%"}}>

                <DetailsTitle>
                    <AirIcon/>wind
                </DetailsTitle>
                <hr/>
                <div className={style.wind__content}>
                    <p>
                        Direction  {selectedCity?.information?.current?.wind_deg}°

                    </p>
                    <p>
                        Gust {selectedCity?.information?.current?.wind_gust} miles/sec

                    </p>
                    <p>
                        Wind speed {selectedCity?.information?.current?.wind_speed} miles/sec

                    </p>
                </div>
            </div>
            <div className={style.container} style={{maxWidth:"45%",width:'100%',aspectRatio:'3/2'}}>
                <DetailsTitle>
                    <WavesIcon/> Humidity
                </DetailsTitle>
                <hr/>
                <p className={style.bigger__text}>
                     {selectedCity?.information?.current?.humidity} %
                </p>

            </div>
            <div className={style.container} style={{maxWidth:"45%",width:'100%',aspectRatio:'3/2'}}>
                <DetailsTitle>
                    <SpeedIcon/> pressure
                </DetailsTitle>
                <hr/>
                <p className={style.bigger__text}>
                     {selectedCity?.information?.current?.pressure} hPa
                </p>
            </div>
            <div className={style.container} style={{maxWidth:"45%",width:'100%',aspectRatio:'3/2'}}>
                <DetailsTitle>
                    <VisibilityIcon/> visibility
                </DetailsTitle>
                <hr/>
                <p className={style.bigger__text}>
                     {selectedCity?.information?.current?.visibility / 1000} km
                </p>
            </div>
            <div className={style.container} style={{maxWidth:"45%",width:'100%',aspectRatio:'3/2'}}>
                <DetailsTitle>
                    <ThermostatAutoIcon/> Atmospheric temperature
                </DetailsTitle>
                <hr/>
                <p className={style.bigger__text}>
                     {selectedCity?.information?.current?.dew_point }°
                </p>
            </div>

            <div className={style.container} style={{maxWidth:"100%",width:"100%"}}>

                <DetailsTitle>
                    <CalendarMonthIcon/> Weekly forecast
                </DetailsTitle>
                <hr/>
                <div style={{display: 'flex',flexDirection:"column",gap:'20px'}}>
                    {
                        selectedCity?.information?.daily?.map(item=>{
                            const day = new Intl.DateTimeFormat("en-US",  { weekday: "long" }).format(new Date(item?.dt * 1000))
                            return (
                                <div style={{display:"flex",fontSize:'20px',alignItems:'center',flexDirection:"row",justifyContent:"space-between"}}>
                                   <p style={{flexBasis:'140px'}}>{day}</p>
                                    <img src={`http://openweathermap.org/img/wn/${selectedCity.information?.current?.weather[0].icon}@2x.png`} alt="weather icon" />
                                    <div style={{textAlign:'start',flexBasis:'140px'}}>
                                     min   { item.temp.min}°
                                    </div>
                                    <div style={{textAlign:'start',flexBasis:'140px'}}>
                                     max   { item.temp.max}°
                                    </div>

                                </div>


                            )
                        })
                    }
                </div>

            </div>



        </section>
    )
}
export default Details;