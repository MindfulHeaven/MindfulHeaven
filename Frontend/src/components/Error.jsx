import { useRouteError } from "react-router-dom"

function Error() {
    const error = useRouteError()
    const { status, statusText } = error
    return (
        <div id='error'>
            <h1>Opps!!!</h1>
            <h1>Someting Went Wrong</h1>
            <h1>{`${status} : ${statusText}`}</h1>
        </div>
    )
} 

export default Error