import React,{useState} from 'react';
import { View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function DrawerIcon ({val}) {
    if(val==1){
        return <View flexDirection="row"><Text allowFontScaling={false} >이름순</Text></View>
    }else if(val==2){
        return <View flexDirection="row"><Text allowFontScaling={false} >이름역순</Text></View>
    }else{
        return <View flexDirection="row"><Text allowFontScaling={false} >할인금액순</Text></View>
    }
}
