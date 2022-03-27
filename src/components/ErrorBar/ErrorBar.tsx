import React from 'react'
import './ErrorBar.css';

export interface Props {
    errorMsg: React.ReactNode;
}

const ErrorBar = (props: Props) => {
  return (
    <div className='ErrorBar'>{props.errorMsg}</div>
  )
}

export default ErrorBar