import React from 'react'

import './Modal.css'

export interface Props {
    children: React.ReactNode;
    width?: string;
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = (props: Props) => {
  return (
    <div className='Modal__Backdrop'>
        <div className={`Modal ${props.width} `}>
            { props.children }
        </div>
    </div>
  )
}

export default Modal