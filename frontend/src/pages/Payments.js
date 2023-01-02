import React from 'react'
import StripeContainer from '../components/StripeContainer'
import { useAuthContext } from "../hooks/useAuthContext"
import { UnAuthorized } from './UnAuthorized'

export default function Payments() {
  const {user} = useAuthContext()
  return (
    <div>
      { user &&
      <StripeContainer/>
      }
      { !user &&
        <UnAuthorized/>
      }
    </div>
  )
}
