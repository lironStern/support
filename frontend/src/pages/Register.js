import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {FaUser} from 'react-icons/fa'
// import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'


function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })

    const {name, email, password, password2} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isLoading, isSuccess, message, isError} = useSelector(state=>state.auth)

useEffect(() => {
    if(isError){
        console.log(message)
    }
    //Redirect when logged in
    if(user || isSuccess){
        navigate('/')
    }

    dispatch(reset())

}, [isError, user, isSuccess, dispatch, navigate])



const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]:e.target.value
    }))
}

const onSubmit = (e) => {
    e.preventDefault()

    if(password!==password2){
        console.log("password do not match")
    }else{
        const userData = {name, email, password}
        dispatch(register(userData))
    }
}

if(isLoading){
    return <Spinner/>
}

  return (
    <>
    <section className="heading">
        <h1>
            <FaUser />Register
        </h1>
        <p>Please create an account</p>
    </section>
    <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input 
                    type="text"
                    required
                    name="name"
                    value={name}
                    id="name"
                    onChange={onChange}
                    className= "form-control"
                    placeholder="Enter your name"
                />
            </div>
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
                <input 
                    type="password"
                    required
                    name="password2"
                    value={password2}
                    id="password2"
                    onChange={onChange}
                    className= "form-control"
                    placeholder="Confirm password"
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

export default Register