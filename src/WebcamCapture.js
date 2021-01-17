import { Close, RadioButtonUnchecked } from '@material-ui/icons'
import React, { useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Webcam from 'react-webcam'
import { resetCameraImage, setCameraImage } from './features/cameraSlice'
import './WebcamCapture.css'

const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: 'user',
}

function WebcamCapture() {
    const webcamRef = useRef(null)
    const dispatch = useDispatch()
    const history = useHistory()

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot()
        dispatch(setCameraImage(imageSrc))
        history.push("/preview")
    }, [dispatch, history])

    const close = () => {
        dispatch(resetCameraImage)
        history.replace("/chats")
    }

    return <div className="webcamCapture">
        <Webcam
            audio = {false}
            height = {videoConstraints.height}j
            ref = {webcamRef}
            screenshotFormat ='image/jpeg'
            videoConstraints = {videoConstraints}
        />

        <Close
            className = 'webcamCapture__closeButton'
            onClick = {close}
        />

        <RadioButtonUnchecked 
            className = 'webcamCapture__button'
            onClick={capture}
            fontSize='large'
        />
    </div>
}

export default WebcamCapture