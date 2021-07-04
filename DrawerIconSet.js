import React,{useState} from 'react';
import { View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function DrawerIcon ({val}) {
    if(val==1){
        return <View flexDirection="row"><Text>이름순</Text><Ionicons name="arrow-down-outline" size={17} /></View>
    }else if(val==2){
        return <View flexDirection="row"><Text>이름역순</Text><Ionicons name="arrow-up-outline" size={17} /></View>
    }else{
        return <View flexDirection="row"><Text>할인많은순</Text><Ionicons name="arrow-down-outline" size={17} /></View>
    }
    // else{
    //     return <View flexDirection="row"><Text></Text><Ionicons name="arrow-up-outline" size={17} /></View>
    // }
}
