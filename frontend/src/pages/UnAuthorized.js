import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

export const UnAuthorized = () => {
    const { user } = useAuthContext()
  return (
    <div>{!user && <div className='error'>Anuthorized to be here</div>}</div>
  )
}
