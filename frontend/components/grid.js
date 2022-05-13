const Grid = (props) => {
    return (

    <div className="grid grid-rows-3 grid-cols-3 gap-4 mx-auto h-5/6 py-5"> {props.children}</div>

    )
}

export default Grid;