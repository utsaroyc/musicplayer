import { StyleSheet, Text, View, Image, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { Entypo } from "react-native-vector-icons"
import { songs }  from "./songs"
import { AppContext } from '../context/AppProvider'
import { isAlreadyPlay } from "../screens/Player";
import PlayButton from "./PlayButton";


const AudioList = () => {

    const {addFav} = useContext(AppContext);
    
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={songs}
                renderItem={(songinfo) => {
                    return (
                        <View style={styles.eachsong}>
                            <View style={styles.to_play}>
                                <Image style={styles.sm_thumbnail} source={{uri: songinfo.item.songpic_url}}/>
                                <View style={styles.info}>
                                    <Text style={styles.songnames}>{songinfo.item.songname}</Text>
                                    <Text>{songinfo.item.artistname}</Text>
                                </View>
                                <View >
                                    <View style={styles.PlayButton}>
                                        {!isAlreadyPlay ? 
                                            (<PlayButton onPress={() => onStartPress()} state="play" size={20}/>) : 
                                            (<PlayButton onPress={() => onStartPress()} state="pause" size={20}/>) }
                                    </View>
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => addFav(songinfo.item)}>
                                    <Entypo name="heart-outlined" size={20} color="#333e6a" />
                                </TouchableOpacity>
                                {/* when liked: <Entypo name="heart" size={24} color="#333e6a" /> */}
                            </View>
                        </View>
                    )
                }}
            />                
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 15
    },
    eachsong:{
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    songnames:{
        fontWeight: 'bold'
    },
    sm_thumbnail:{
        borderRadius: 20,
        width: 50,
        height: 50
    },
    to_play:{
        width: '92%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    info:{
        marginLeft: '4%',
        width: '72%'
    },
    PlayButton:{
        width: '100%'
    }
})

export default AudioList


