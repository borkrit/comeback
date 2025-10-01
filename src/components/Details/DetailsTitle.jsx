
const DetailsTitle = ({children}) => {
    return (
        <>
            <p style={{textAlign:"start",textTransform:'capitalize',paddingStart:'10px',paddingBottom:'10px',fontSize:'20px',display: 'flex',gap:'10px',alignItems:'center',color:'#ffffffad'    }}>
                {
                    children
                }
            </p>
        </>
    )
}
export default DetailsTitle;