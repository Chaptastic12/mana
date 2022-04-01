import React from 'react'

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
  return (
    <div className="dropdown">
        <button className="dropbtn">{props.title}
            <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
            {props.data.map(x => { return <a key={x.name} href={x.link}>{x.name}</a> } ) }
        </div>
    </div>
  )
}

export default DropDown