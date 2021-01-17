import { Avatar } from '@material-ui/core'
import { StopRounded } from '@material-ui/icons'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ReactTimeago from 'react-timeago'
import './Chat.css'
import { selectImage } from './features/appSlice'
import { db } from './firebase'

function Chat({ id, username, timestamp, read, imageUrl, profilePic }) {
    const dispatch = useDispatch()
    const history = useHistory()

    const open = () => {
        if (!read) {
            dispatch(selectImage(imageUrl))

            // Update the data in firebase
            db.collection('posts').doc(id).set({
                read: true,
            },
            {merge: true}
            )
        history.push('/chats/view')
        }
    }

    return (
        <div className="chat" onClick={open}>
            <Avatar src={profilePic} className="chat__avatar"/>
            <div className="chat__info">
                <h4>{username}</h4>
                {/* Use react time ago to show the timestamp on the chat */}
                <p>
                    {!read && "Tap to view -"}{""} <ReactTimeago date = {new Date(timestamp?.toDate()).toUTCString()} />
                </p>
            </div>

            {!read && <StopRounded className="chat__readIcon" />}
        </div>
    )
}

export default Chat