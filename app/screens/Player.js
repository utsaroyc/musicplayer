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
import { songs } from "./songs";
import PlayButton from "./PlayButton";
import { Audio } from "expo-av";
import { AppContext } from "../context/AppProvider";

const songinfo = songs;
const dev_height = Dimensions.get("window").height;
const dev_width = Dimensions.get("window").width;
const sound = new Audio.Sound();

const Player = () => {
  const [isAlreadyPlay, setisAlreadyPlay] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // const [sound,setSound] = useState()
  // const [inprogress, setInprogress] = useState(false)
  // const changeTime = async (seconds) => {
  //     // 50 / duration
  //     let seektime = (seconds / 100) * duration
  //     setTimeElapsed(seektime)
  //     audioRecorderPlayer.seekToPlayer(seektime)
  // }

  const loadAudio = async () => {
    try {
      await sound.loadAsync(
        songs[currentTrack].song_url,
        {
          shouldPlay: false,
        },
        false
      );
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
    });
    loadAudio();
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

  // await sound.loadAsync(
  //     loaded_songs[currentTrack].song_url);
  // // const { durationMillis } = await sound.getStatusAsync();
  // // setDuration(durationMillis);
  const updatePosition = async () => {
    const { positionMillis } = await sound.getStatusAsync();
    setPosition(positionMillis);
  };

  // useEffect(() => {
  //   const interval = setInterval(updatePosition, 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = (time % 60).toFixed(0);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const onStartPress = async () => {
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

  const onForward = async () => {
    try {
      console.log(currentTrack);
      if (currentTrack <= songs.length - 1) {
        setCurrentTrack((currentTrack) => currentTrack + 1);
      } else {
        setCurrentTrack(0);
      }
      console.log(currentTrack);
      if (isLoaded) {
        await sound.stopAsync();
        setisAlreadyPlay(false);
        await sound.unloadAsync();
        setIsLoaded(false);
      }
      await sound.unloadAsync();
      await sound.loadAsync(
        songs[currentTrack].song_url,
        {
          shouldPlay: false,
        },
        false
      );
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(()=>{
  //   setIsboolean(!isboolean)
  // },[currentTrack])

  const onBackward = async () => {
    if (currentTrack > 0) {
      setCurrentTrack(currentTrack - 1);
    } else {
      setCurrentTrack(songs.length - 1);
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
          source={{ uri: songs[currentTrack].songpic_url }}
        />
      </View>

      <View style={styles.name_of_song_View}>
        <Text style={styles.name_of_song_Text1}>
          {songs[currentTrack].songname}
        </Text>
        <Text style={styles.name_of_song_Text2}>
          {songs[currentTrack].artistname}
        </Text>
      </View>

      <View style={styles.slider_view}>
        <Text style={styles.slider_time}>{formatTime(position)}</Text>

        <Slider
          style={styles.slider_style}
          minimumValue={0}
          maximumValue={songs[currentTrack].songlength}
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

        <Text style={styles.slider_time}>
          {formatTime(songs[currentTrack].songlength)}
        </Text>
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
