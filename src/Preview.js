import { AttachFile, Close, Create, Crop, MusicNote, Note, Send, TextFields, Timer } from '@material-ui/icons'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { resetCameraImage, selectCameraImage } from './features/cameraSlice'
import { v4 as uuid } from 'uuid'
import './Preview.css'
import { db, storage } from './firebase'
import firebase from 'firebase'
import { selectUser } from './features/appSlice'

function Preview() {
    const cameraImage = useSelector(selectCameraImage)
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(selectUser)

    useEffect(() => {
        if (!cameraImage) {
            history.replace("/")
        }
    }, [cameraImage, history])

    const closePreview =() => {
        dispatch(resetCameraImage)
        history.replace("/")
    }

    const sendPost = () => {
        const id = uuid()
        const uploadTask = storage
            .ref(`posts/${id}`)
            .putString(cameraImage, 'data_url')

        uploadTask.on('state_changed', null, 
        // Error Function
        (error) => {
            console.log(error)
        }, 
        // Complete Function
        () => {
            storage.ref('posts').child(id).getDownloadURL().then((url) => {
                db.collection('posts').add({
                    imageUrl: url,
                    username: user.username,
                    read: false,
                    profilePic: user.profilePic,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                })

                history.replace('/chats')
            })
        }

        )
    }

    return (
        <div className="preview">
            <Close className="preview__close" onClick={closePreview}/>
            <div className="preview__toolbarRight">
                <TextFields />
                <Create />
                <Note />
                <MusicNote />
                <AttachFile />
                <Crop />
                <Timer />
            </div>
            <img src={cameraImage} alt=""/>
            <div onClick={sendPost} className="preview__footer">
                <h2>Send Now</h2>
                <Send fontSize="small" className="preview__sendIcon"/>
            </div>
        </div>
    )
}

export default Preview
