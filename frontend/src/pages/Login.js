import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
// import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const { email, password} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isLoading, isSuccess, message, isError} = useSelector(state=>state.auth)
    

    useEffect(() => {
        if(isError){
            console.log(message)
        }

        if(user || isSuccess){
            navigate('/')
        }

        dispatch(reset())
    }, [isError, isSuccess, user, navigate, dispatch])

    const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]:e.target.value
    }))
}

const onSubmit = (e) => {
    e.preventDefault()
    const userData = {email, password}
    dispatch(login(userData))
}

if(isLoading){
    return <Spinner />
}

  return (
    <>
    <section className="heading">
        <h1>
            <FaSignInAlt /> Login
        </h1>
        <p>Please log in to get support</p>
    </section>
    <section className="form">
        <form onSubmit={onSubmit}>
            
            <div className="form-group">
                <input 
                    type="email"
                    required
                    name="email"
                    value={email}
                    id="email"
                    onChange={onChange}
                    className= "form-control"
                    placeholder="Enter your email"
                />
            </div>
            <div className="form-group">
                <input 
                    type="password"
                    required
                    name="password"
                    value={password}
                    id="password"
                    onChange={onChange}
                    className= "form-control"
                    placeholder="Enter password"
                />
            </div>
          
            <div className="form-group">
                 <button className="btn btn-block">Submit</button>
            </div>
           

        </form>

    </section>

    </>
  )
}

export default Login