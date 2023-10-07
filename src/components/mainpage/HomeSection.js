import React from 'react'
import { Link } from 'react-router-dom'
/**
 * Showing all the page a user has created.
 * 
 * @param {*} props 
 * @returns 
 */
function HomeSection(props) {
    return (
        <div>
            <h1>{props.id}</h1>
            <Link to={`/create/${props.id}`} state={{ obj: props.obj }}>Edit</Link>
        </div>
    )
}

export default HomeSection