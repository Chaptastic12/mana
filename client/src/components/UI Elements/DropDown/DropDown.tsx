import React from 'react'
import { Link } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import { AiOutlineDown } from 'react-icons/ai'

import './DropDown.css'

export interface PROPS {
    title: string;
    data: DATA[];
}

export interface DATA {
    name: string;
    link: string;
    useButton: boolean;
    onClick: () => void;
}

const DropDown = (props: PROPS) => {
    let title;
    if(props.title === 'User'){title = <><FaUserCircle /><AiOutlineDown /></> }
  return (
    <div className="dropdown">
        <button className="dropbtn">{title ? title : props.title}
            <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
            {props.data.map(x => { 
                if(x.useButton){
                    return <button key={x.name} onClick={() => x.onClick()}> {x.name} </button>
                } else {
                    return <Link key={x.name} to={x.link}>{x.name}</Link> 
                }
            } ) }
        </div>
    </div>
  )
}

export default DropDown