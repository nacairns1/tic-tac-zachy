import NavBar from "./NavBar"

export default Layout = ({props, children}) => {

    return (
        <>
        <NavBar/>
        {children}
        </>
    )
}
