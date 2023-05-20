import React from "react"
import {NavigationContainer} from '@react-navigation/native'
import AppNavigator from "./app/navigation/AppNavigator"
import { AppProvider } from "./app/context/AudioProvider";

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AppProvider>
  );
}
/* audiolist- needs to obtain music information (music name, artist name, songlength, music pic) from the songs in assets/songs folder
              play/pause and like button for each song
              when the song is clicked, the song starts playing or gets paused
              when like button is clicked it gets added to the favorites json file along with information
   
   player-    play/pause button functionality need to be added.
              like/unlike button need to be configured
              play next/previous button need to be configured

   favorites- play/pause and unlike button for each song
*/
