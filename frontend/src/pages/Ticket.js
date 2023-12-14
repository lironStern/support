import {useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {getTicket, reset, closeTicket} from '../features/tickets/ticketSlice'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

function Ticket() {
    const {ticket, isError, isSuccess, isLoading, message } = useSelector((state) => state.tickets)

    const navigate = useNavigate()
    const params = useParams()
    const {ticketId} = useParams()
    const dispatch = useDispatch()


    useEffect(() => {
        if(isError){
            console.log(message)
        }

        dispatch(getTicket(ticketId))
    }, [isError, message, dispatch])

    const onCloseTicket = () => {
        dispatch(closeTicket(ticketId))
        console.log("ticket close")
        navigate('/tickets')
    }

    if(isLoading){
        return <Spinner />
    }

    if(isError){
        return <h3>Something went Wrong</h3>
    }


    return (
        <div className="ticket-page">
            <header className="ticket-header">
                <BackButton url="/tickets"/>
                <h2>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>{ticket.status}</span>
                </h2>
                <h3>Date Submitted: {new Date(ticket.createdAt).toDateString('en-US')}</h3>
                <h3>Product: {ticket.product}</h3>
                <hr />
                <div className="ticket-desc">
                    <h3>Description of Issue</h3>
                    <p>{ticket.description}</p>
                </div>
            </header>
            {ticket.status !== 'closed' && (<button className="btn btn-block btn-danger" onClick={onCloseTicket}>Close Ticket</button>)}
         </div>
      )
    }
    
    
    export default Ticket
    