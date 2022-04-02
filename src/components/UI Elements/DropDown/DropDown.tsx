import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

import './DropDown.css'

export interface PROPS {
    title: string;
    data: DATA[];
}

export interface DATA {
    name: string;
    link: string;
}

const DropDown = (props: PROPS) => {
    let title;
    if(props.title === 'User'){title = <FaUserCircle /> }
  return (
    <div className="dropdown">
        <button className="dropbtn">{title ? title : props.title}
            <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
            {props.data.map(x => { return <a key={x.name} href={x.link}>{x.name}</a> } ) }
        </div>
    </div>
  )
}

export default DropDown