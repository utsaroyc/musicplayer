import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useContext, useState } from "react";
import { Entypo } from "react-native-vector-icons";
import Slider from "@react-native-community/slider";
import { loaded_songs } from "C:/Users/ADMIN/OneDrive/Documents/expo app/app1/songs.json";
import PlayButton from "./PlayButton";
import { Audio } from "expo-av";
import { AppContext } from "../context/AudioProvider";

const songinfo = loaded_songs;
const dev_height = Dimensions.get("window").height;
const dev_width = Dimensions.get("window").width;
const sound = new Audio.Sound();

const Player = () => {
  const [isAlreadyPlay, setisAlreadyPlay] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(0);
  // const [inprogress, setInprogress] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false);
  const [isboolean, setIsboolean] = useState(false);
  // const [sound,setSound] = useState()

  // const changeTime = async (seconds) => {
  //     // 50 / duration
  //     let seektime = (seconds / 100) * duration
  //     setTimeElapsed(seektime)
  //     audioRecorderPlayer.seekToPlayer(seektime)
  // }

  const urls= [
    url1= require("../songs/Chase.mp3")
  ]

  const startMusic = async () => {
    await sound.loadAsync(
      require("../songs/Nightcall.mp3"),
      {
        shouldPlay: false,
      },
      false
    );
    setIsLoaded(true);
  };

  const loadAudio = async (currentTrack) => {
    try {
      // await sound.loadAsync(
      //     loaded_songs[currentTrack].song_url);
      // // const { durationMillis } = await sound.getStatusAsync();
      // // setDuration(durationMillis);
      await sound.unloadAsync();
      await sound.loadAsync(
        loaded_songs[currentTrack].song_url,
        {
          shouldPlay: false,
        },
        false
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
    });
    // sound.loadAsync(loaded_songs[currentTrack].song_url, {shouldPlay:false}, false)
    // loadAudio();
    startMusic();
    // return () => {
    //     sound.unloadAsync();
    // }
  }, []);

  const { addFav } = useContext(AppContext);

  const handleSeek = async (value) => {
    try {
      await sound.setPositionAsync(value);
      setPosition(value);
    } catch (error) {
      console.log(error);
    }
  };

  const updatePosition = async () => {
    const { positionMillis } = await sound.getStatusAsync();
    setPosition(positionMillis);
  };

  useEffect(() => {
    const interval = setInterval(updatePosition, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatTime = (time) => {
    const mins = Math.floor(time / 60000);
    const secs = ((time % 60000) / 1000).toFixed(0);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const onStartPress = async () => {
    // setInprogress(true)
    try {
      if (isAlreadyPlay) {
        await sound.pauseAsync();
        setisAlreadyPlay(false);
      } else {
        await sound.playAsync();
        setisAlreadyPlay(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // audioRecorderPlayer.addPlayBackListener(async (e) => {
  // if (e.currentPosition === e.duration) {
  // audioRecorderPlayer.stopPlayer();
  // }
  // let percent = Math.round(
  // (Math.floor(e.currentPosition) / Math.floor(e.duration)) * 100,
  // );
  // setTimeElapsed(e.currentPosition);
  // setPercent(percent);
  // setDuration(e.duration);
  // })

  // const onForward = async () => {

  //     // onStopPress().then(async () => {
  //     // await onStartPress()
  //     // })
  // }
  let songs =[
    {
        "id": 1,
        "songname": "Nightcall",
        "artistname": "Kavinsky",
        "songlength": "260",
        "songpic_url": "https://i.scdn.co/image/ab67616d00001e02d6d8c2eaa1f9031b62f7a3f7",
        "song_url": require('../songs/Nightcall.mp3')
    },
    {
        "id": 2,
        "songname": "Into It",
        "artistname": "Chase Atlantic",
        "songlength": "216",
        "songpic_url": "https://i.scdn.co/image/ab67616d00001e025a0c2870f4f309e382d1fad6",
        "song_url": require('../songs/Chase.mp3')
    },
    {
        "id": 3,
        "songname": "DNA.",
        "artistname": "Kendrick Lamar",
        "songlength": "285",
        "songpic_url": "https://i.scdn.co/image/ab67616d00001e028b52c6b9bc4e43d873869699",
        "song_url": require('../songs/kendrick-lamar-dna.mp3')
    },
    {
        "id": 4,
        "songname": "comethru",
        "artistname": "Jeremy Zucker",
        "songlength": "180",
        "songpic_url": "https://i.scdn.co/image/ab67616d00001e02cb16227d90152c2a5022bba1",
        "song_url": require('../songs/comethru.mp3')
    },
    {
        "id": 5,
        "songname": "Dakota",
        "artistname": "Sterephonics",
        "songlength": "297",
        "songpic_url": "https://i.scdn.co/image/ab67616d00001e02ecdb914ea9cbbb31c5a6b71b",
        "song_url": require('../songs/Dakota.mp3')
    },
    {
        "id": 6,
        "songname": "Less Than Zero",
        "artistname": "The Weeknd",
        "songlength": "211",
        "songpic_url": "https://i.scdn.co/image/ab67616d00001e024ab2520c2c77a1d66b9ee21d",
        "song_url": require('../songs/LessThanZero.mp3')
    },
    {
        "id": 7,
        "songname": "Comfortably Numb",
        "artistname": "Pink Floyd",
        "songlength": "569",
        "songpic_url": "https://i.scdn.co/image/ab67616d00001e025d48e2f56d691f9a4e4b0bdf",
        "song_url": "require('../songs/ComfortablyNumb.mp3')"
    },
    {
        "id": 8,
        "songname": "Middle of Nowhere",
        "artistname": "Vancouver Sleep Clinic",
        "songlength": "402",
        "songpic_url": "https://i.scdn.co/image/ab67616d00001e02c5fa2d070500d42ca54a8dc0",
        "song_url": "require('../songs/MiddleOfNowhere.mp3')"
    },
    {
        "id": 9,
        "songname": "Hotel California",
        "artistname": "Eagles",
        "songlength": "391",
        "songpic_url": "https://i.scdn.co/image/ab67616d00001e024637341b9f507521afa9a778",
        "song_url": "require('../songs/HotelCalifornia.mp3')"
    },
    {
        "id": 10,
        "songname": "Creepin'",
        "artistname": "Metro Boomin (feat. The Weeknd, 21 Savage)",
        "songlength": "207",
        "songpic_url": "https://i.scdn.co/image/ab67616d00001e0213e54d6687e65678d60466c2",
        "song_url": "require('../songs/Creeping.mp3')"
    },
    {
        "id": 11,
        "songname": "G.O.M.D",
        "artistname": "J. Cole",
        "songlength": "301",
        "songpic_url": "https://i.scdn.co/image/ab67616d00001e02c6e0948bbb0681ff29cdbae8",
        "song_url": "require('../songs/GOMD.mp3')"
    },
    {
        "id": 12,
        "songname": "I Feel It Coming",
        "artistname": "The Weeknd",
        "songlength": "269",
        "songpic_url": "https://i.scdn.co/image/ab67616d00001e024718e2b124f79258be7bc452",
        "song_url": "require('../songs/IFeelItComing.mp3')"
    },
    {
        "id": 13,
        "songname": "SLOW DANCING IN THE DARK",
        "artistname": "Joji",
        "songlength": "219",
        "songpic_url": "https://i.scdn.co/image/ab67616d00001e0260ba1d6104d0475c7555a6b2",
        "song_url":"require('../songs/SlowDancingInTheDark.mp3')"
    },
    {
        "id": 14,
        "songname": "I Lost a Friend",
        "artistname": "Finneas",
        "songlength": "225",
        "songpic_url": "https://i.scdn.co/image/ab67616d00001e02bab3095cab659556941c2fc7",
        "song_url": "require('../songs/ILostAFriend.mp3')"
    },
    {
        "id": 15,
        "songname": "The Messenger",
        "artistname": "Linkin Park",
        "songlength": "181",
        "songpic_url": "https://i.scdn.co/image/ab67616d00001e02ca5e606335bea5cf5bbdbea3",
        "song_url": "require('../songs/TheMessenger.mp3')"
    }
]
console.log(currentTrack,"out")
  const onForward = async () => {
    //   setIsLoading(true);
    //   try {
    //     await sound.stopAsync();
    //     await sound.unloadAsync();
    //     const newSound = new Audio.Sound();
    //     await newSound.loadAsync(require('../songs/comethru.mp3'));
    //     await newSound.playAsync();
    //     setisAlreadyPlay(true)
    //     setIsLoading(false);
    //   } catch (error) {
    //     console.log(error);
    //     setIsLoading(false);
    //   }
    try {
      console.log(currentTrack,songs.length)
      if (currentTrack <= songs.length - 1){
          console.log(currentTrack, "inside")
          setCurrentTrack(currentTrack => currentTrack + 1)
      }
      else{
          setCurrentTrack(0)
      }
      // let curr_track = loaded_songs[currentTrack];
      // let current_index = loaded_songs.indexOf(curr_track) + 1;
      // if (current_index === loaded_songs.length) {
      //   setCurrentTrack(1);
      // } else {
      //   setCurrentTrack((currentTrack) => currentTrack + 1);
      // }
      if (isLoaded) {
        console.log(currentTrack, "..")
        await sound.stopAsync();
        setisAlreadyPlay(false);
        await sound.unloadAsync();
        setIsLoaded(false);
      }
      // console.log(loaded_songs[currentTrack].song_url)
      // let song = require(""+this.loaded_songs[currentTrack].song_url)
      // console.log(song, "...........")
      await sound.unloadAsync()
        await sound.loadAsync(
          songs[currentTrack].song_url,
          {
            shouldPlay: false,
          },
          false
        )
      console.log(currentTrack);
    } catch (error) {
      console.log(error, ".9");
    }
  };

const isForwardHandle = async() => {
  
}

  useEffect(()=>{
    setIsboolean(!isboolean)
  },[currentTrack])


  const onBackward = async () => {
    // setIsLoading(true);
    // try {
    //     await sound.stopAsync(); // Stop the current sound
    //     await sound.unloadAsync(); // Unload it from memory
    //     const newSound = new Audio.Sound(); // Create a new sound object
    //     await newSound.loadAsync(require('../songs/TheMessenger.mp3')); // Load the previous song
    //     await newSound.playAsync(); // Play the new song
    //     setisAlreadyPlay(true)
    //     setIsLoading(false);
    //     }
    // catch (error) {
    //     console.log(error);
    //     setIsLoading(false);
    //     }
    if (currentTrack > 0) {
      setCurrentTrack(currentTrack - 1);
    } else {
      setCurrentTrack(loaded_songs.length - 1);
    }
  };
  //     let curr_track = loaded_songs[current_track];

  //     let current_index = loaded_songs.indexOf(curr_track);

  //     if (current_index === 0) {
  //     setCurrentTrack(15);
  //     } else {
  //     setCurrentTrack((current_track) => current_track - 1);
  //     }
  //     onStopPress().then(async () => {
  //     await onStartPress();
  //     });
  // }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainbar}>
        <Text style={styles.now_playing}>Now Playing</Text>
      </View>

      <View style={styles.music_logo}>
        <Image
          style={styles.image_view}
          source={{ uri: loaded_songs[currentTrack].songpic_url }}
        />
      </View>

      <View style={styles.name_of_song_View}>
        <Text style={styles.name_of_song_Text1}>
          {loaded_songs[currentTrack].songname}
        </Text>
        <Text style={styles.name_of_song_Text2}>
          {loaded_songs[currentTrack].artistname}
        </Text>
      </View>

      <View style={styles.slider_view}>
        <Text style={styles.slider_time}>{formatTime(position)}</Text>
        <Slider
          style={styles.slider_style}
          minimumValue={0}
          maximumValue={duration}
          minimumTrackTintColor="#333e6a"
          maximumTrackTintColor="#333e6a"
          thumbTintColor="#333e6a"
          value={position}
          // onSlidingStart={setIsSeeking(true)}
          // onSlidingComplete={async (value) => {
          //     await sound.setPositionAsync(value);
          //     setPosition(value);
          //     setIsSeeking(false)
          // }}
          onValueChange={handleSeek}
          // value={percent}
          // onValueChange={(seconds) => changeTime(seconds)}
        />
        <Text style={styles.slider_time}>{formatTime(duration)}</Text>
      </View>

      <View style={styles.functions_view}>
        <Entypo
          name="shuffle"
          size={24}
          color="#333e6a"
          style={{ marginLeft: "9%" }}
        />
        <TouchableOpacity
          onPress={() => onBackward()}
          style={{ marginLeft: "12%" }}
        >
          <Entypo name="controller-fast-backward" size={24} color="#333e6a" />
        </TouchableOpacity>
        <View style={{ marginLeft: "12%" }}>
          {!isAlreadyPlay ? (
            <PlayButton
              onPress={() => onStartPress()}
              state="play-circle"
              size={50}
            />
          ) : (
            <PlayButton
              onPress={() => onStartPress()}
              state="pause-circle"
              size={50}
            />
          )}
        </View>
        <TouchableOpacity
          onPress={() => onForward()}
          style={{ marginLeft: "12%" }}
        >
          <Entypo name="controller-fast-forward" size={24} color="#333e6a" />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => addFav()}>  */}
        <Entypo
          name="heart-outlined"
          size={24}
          color="#333e6a"
          style={{ marginLeft: "9%" }}
          onPress={() => addFav(songinfo.item)}
        />
        {/* when liked: <Entypo name="heart" size={24} color="#333e6a" style={{marginLeft:"9%"}}/> */}
        {/* </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: dev_height,
    width: dev_width,
  },

  mainbar: {
    height: "15%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  now_playing: {
    fontSize: 19,
  },

  music_logo: {
    height: "25%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  image_view: {
    height: "100%",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },

  name_of_song_View: {
    height: "15%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  name_of_song_Text1: {
    fontSize: 19,
    fontWeight: "500",
  },

  name_of_song_Text2: {
    color: "#808080",
    marginTop: "4%",
  },

  slider_view: {
    height: "10%",
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },

  slider_style: {
    height: "70%",
    width: "60%",
  },

  slider_time: {
    fontSize: 15,
    margin: "5%",
    color: "#808080",
  },

  functions_view: {
    flexDirection: "row",
    height: "10%",
    width: "100%",
    alignItems: "center",
  },
});

export default Player;
