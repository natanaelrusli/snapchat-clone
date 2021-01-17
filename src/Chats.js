import { Avatar } from '@material-ui/core'
import { ChatBubble, RadioButtonUnchecked, Search } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Chat from './Chat'
import './Chats.css'
import { selectUser } from './features/appSlice'
import { resetCameraImage } from './features/cameraSlice'
import { auth, db } from './firebase'

function Chats() {
    const [posts, setPosts] = useState([])
    const user = useSelector(selectUser)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        // Firebase Listener
        db.collection('posts')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => 
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
                }))
            )
        )
    }, [])

    const takePic = () => {
        dispatch(resetCameraImage())
        history.push("/")
    }

    return (
        <div className="chats">
            <div className="chats__header">
                <Avatar 
                    className="chats__avatar"
                    onClick={() => auth.signOut()} 
                    src={user.profilePic}
                />
                <div className="chats__search">
                    <Search className="chats__searchIcon"/>
                    <input type="text" placeholder="Friends"/>
                </div>
                <ChatBubble className="chats__chatIcon"/>
            </div>

            <div className="chats__posts">
                {posts.map(({id, data : { profilePic, username, timestamp, imageUrl, read }}) => (
                    <Chat
                        key={id}
                        id={id}
                        username={username}
                        timestamp={timestamp}
                        imageUrl={imageUrl}
                        read={read}
                        profilePic={profilePic}
                    />
                ))}
            </div>

            <RadioButtonUnchecked
                className="chats__takePicIcon"
                onClick={takePic}
                fontSize="large"
            />
        </div>
    )
}

export default Chats
