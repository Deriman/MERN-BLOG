import { Button } from "flowbite-react"
import { AiFillGoogleCircle } from 'react-icons/ai'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase.js'
import { useDispatch } from "react-redux"
import { signInSuccess } from "../redux/user/userSlice.js"
import { useNavigate } from "react-router-dom"

const OAuth = () => {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            // console.log(resultsFromGoogle)
            const result = await fetch('/api/v1/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL
                })
            })
            const data = await result.json()
            if (result.ok) {
                dispatch(signInSuccess(data))
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Button type="button" gradientDuoTone="pinkToOrange" outline onClick={handleGoogleClick}>
            <AiFillGoogleCircle className="h-6 w-6 mr-2" />
            Continue with Google
        </Button>
    )
}

export default OAuth
