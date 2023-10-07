import React from 'react'

/**
 * A container for tools just for hover to show function
 * @param {} props 
 * @returns 
 */
function ToolContainer(props) {
  return (
    <React.Fragment>
      {props.show && props.children}
    </React.Fragment>
  )
}

export default ToolContainer