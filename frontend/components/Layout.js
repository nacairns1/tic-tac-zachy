import {Footer} from "./Footer"
import {NavBar} from "./NavBar"

const Layout = ({props, children}) => {

    return (
        <>
        <NavBar/>
        {children}
        <Footer />
        </>
    )
}

module.exports = {Layout};