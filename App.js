import React from "react"
import {NavigationContainer} from '@react-navigation/native'
import AppNavigator from "./app/navigation/AppNavigator"
import { AppProvider } from "./app/context/AppProvider";

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AppProvider>
  );
}

