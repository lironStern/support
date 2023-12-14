import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {reset, getTickets} from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import TicketItem from '../components/TicketItem'

function Tickets() {
 const {isSuccess, isError, isLoading, message, tickets} = useSelector((state) => state.tickets)

 const dispatch = useDispatch()

 useEffect(() => {
    return () => {
        if(isSuccess){
        dispatch(reset())
        }
    }
 }, [dispatch, isSuccess])

 useEffect(() => {
        dispatch(getTickets())
    
 }, [dispatch])

if(isLoading){
  return <Spinner/>
}

  return (
    <>
      <BackButton url="/" />
        <h1>Tickets</h1>
        <div className='tickets'>
          <div  className='ticket-headings'>
            <div>Date</div>
            <div>Product</div>
            <div>Status</div>
            <div></div>
          </div>
            {tickets.map((item) => (
              <TicketItem  key={item._id} ticket={item}/>
            ))}
        </div>
    </>
  )
}

export default Tickets