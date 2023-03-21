import Footer from "../Footer"
import AppNav from "../Header"
function Layout({children}){


return(

    <div className={ "bg-[url('/bg.gif')]   w-fullflex flex-col  justify-between  bg-fixed"} >
    <AppNav/> 
    {children}
    <Footer/>
    </div>
)

}


export default  Layout