import { TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from 'react-native-vector-icons'

export default function PlayButton(props) {
    return (
        <TouchableOpacity onPress={props.onPress} >
            <Ionicons name={props.state} size={props.size} color="#333e6a"/>
        </TouchableOpacity>
    )
}


