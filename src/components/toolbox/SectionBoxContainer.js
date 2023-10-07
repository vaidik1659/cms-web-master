import { useState } from "react"
import React from 'react'
import CreateIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

/**
 * The container of section design tools including save section and delete section
 * @param {*} props 
 * @returns 
 */


function SectionBoxContainer(props) {
    const [openSectionBox, setOpenSectionBox] = useState(false)
    const onClickSectionBox = () => {
        setOpenSectionBox(!openSectionBox);
    }
    return (
        <React.Fragment>
            <div className="sectionBox-outer-container box-container">
                <button className="toolbox-button section-box-button button-top" onClick={props.onSaveClick}>
                    <CreateIcon className="section-box-icon" />
                    Save Section
                </button>
                <button className="toolbox-button section-box-button delete-button" onClick={props.onDeleteClick}>
                    <DeleteOutlineIcon className="section-box-icon" />
                    Delete Section
                </button>
            </div>
            {openSectionBox && props.children}
        </React.Fragment>
    )
}

export default SectionBoxContainer