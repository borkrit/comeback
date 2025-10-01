import Search from "@/components/Search/Search";
import CityList from "@/components/CityLists/CityLists";
import {Grid} from "@mui/material";

export default function Home() {

    return (
        <Grid container spacing={2} rowSpacing={3} style={{flexDirection:'column'}}>
            <Grid size={12} style={{padding:'10px',textAlign:"center", backgroundColor:'rgb(0 0 0 / 35%)'}}>
                <p style={{textTransform:'uppercase',fontWeight:'bold'}}>Weather application</p>
            </Grid>
            <Grid style={{padding:'10px',marginInline:'auto',marginTop:'auto',maxWidth:'700px',width:'100%'}} size={7}  >
                <Search/>
            </Grid>
            <Grid style={{padding:'10px',marginInline:'auto',marginTop:'auto',maxWidth:'700px',width:'100%'}} size={7} >
                <CityList/>
            </Grid>
        </Grid>

    );
}
