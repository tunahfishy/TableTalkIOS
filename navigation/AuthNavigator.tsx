import { getAuth } from 'firebase/auth';
import React, { useState, useEffect, createContext } from 'react'
import { auth } from '../firebase';
import SignInStack from './SignInStack'
import SignOutStack from './SignOutStack'

export const AuthContext = createContext(null)

export default function AuthNavigator() {
    const [initializing, setInitializing] = useState(true)
    const [user, setUser] = useState(null)
    console.log('user:', user)
  
    // Handle user state changes
    function onAuthStateChanged(result) {
      setUser(result)
      console.log('user state changing')
      if (initializing) setInitializing(false)
    }
  
    useEffect(() => {
      const authSubscriber = auth.onAuthStateChanged(onAuthStateChanged)
  
      // unsubscribe on unmount
      console.log('subscriber')
      return authSubscriber
    }, [])
  
    if (initializing) {
      return null
    }
  
    return user ? (
      <AuthContext.Provider value={user}>
        <SignInStack />
      </AuthContext.Provider>
    ) : (
      <SignOutStack />
    )
  }