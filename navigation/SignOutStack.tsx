import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AuthScreen from '../pages/AuthScreen'

const Stack = createStackNavigator()

export default function SignOutStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Login" component={AuthScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}