import Cart from "@/components/Cart/Cart";

const Page = ()=>{
    return (
        <div className="page">
            details
            {
                Array(5).fill(0).map((item,i)=>{
                    return <Cart key={i} />
                })
            }
        </div>
    )
}
export default Page;