import React from 'react'
import { Comment } from '../../models/models';

import './Comment.css';

export interface Props {
    comment: Comment
}
const CommentDiv = (props: Props) => {
  return (<div style={{paddingBottom: '20px'}}>
    <div className='CommentDiv'>
        <div className='CommentDiv__Author'>Posted by: { props.comment.author.username }</div>
        <div className='CommentDiv__Comment' style={{ whiteSpace: 'pre-line' }}>{ props.comment.comment }</div>
        <hr />
        <div className='CommentDiv__Date'>Created on: { props.comment.createdDate }</div>
    </div>
    </div>)
}

export default CommentDiv