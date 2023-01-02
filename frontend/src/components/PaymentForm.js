import React,{useState} from 'react'
import {CardElement,useElements,useStripe} from "@stripe/react-stripe-js"
import axios from "axios"
import {  useNavigate } from 'react-router-dom'

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}


export default function PaymentForm() {

    const [success,setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const params = new URLSearchParams(window.location.search);
    const course_id = params.get('courseId');
    const amount = params.get('amount');
    const navigate = useNavigate();
    const {Rcourse} = localStorage.getItem("course");
    console.log(Rcourse);
    const toNavigate = () => {
        navigate('/');
      }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })
    
    if(!error){
        try {
            const {id} = paymentMethod
            const response = await axios.post("http://localhost:4000/api/payments/payment",{
                amount: 1000,
                id
            })

            if(response.data.success){
                console.log("Succesfull Payment")
                setSuccess(true)
                toNavigate()
            }


        } catch (error) {
            console.log("Error",error)
            console.log("R:"+Rcourse)

        }
    } else {
        console.log(error.message)
        console.log("R:"+Rcourse)
    }
}
  
    return (
    <>
    {
        !success ? 
        <form onSubmit={handleSubmit}>
            <div><center>Amount: {amount}</center></div>
            <fieldset className='FormGroup'>
                
                <div className='FormRow'>
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button className='stripe_button'>Pay</button>
        </form>
        :
        <div>
            <h2>Payment Done</h2>
        </div>
    }
      
    </>
  )
}
