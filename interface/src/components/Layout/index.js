import Footer from "../Footer"
import AppNav from "../Header"
function Layout({ children }) {


    return (

        <div className={"bg-[url('/A_black_image.jpg.webp')]   w-fullflex flex-col  justify-between  bg-fixed"} >
            <AppNav />
            {children}
            <Footer />
        </div>
    )

}


export default Layout