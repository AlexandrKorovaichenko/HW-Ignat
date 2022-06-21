import React, { MouseEventHandler } from 'react'
import { AffairType } from './HW2'

type AffairPropsType = {
    // key не нужно типизировать
    affair: AffairType
    deleteAffairCallback: (_id: number) => void
}

function Affair(props: AffairPropsType) {

    const idElement = props.affair._id;
    const deleteCallback = () => {
        props.deleteAffairCallback(idElement);
    }

    return (
        <div>
            <span>{props.affair.name}</span> 
            <button key={props.affair._id} onClick = {deleteCallback}> X </button>
        </div>
    )
}

export default Affair
