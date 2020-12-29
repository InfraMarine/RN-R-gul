import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';


const PostItem = ({item, onUpdate}) => {
  
  const navigation = useNavigation();

  return(
    <TouchableOpacity onPress={()=> navigation.navigate("Post", {post: item})}>
      <View style={{padding: 10, margin: 10, borderWidth:1, borderColor:"red"}}>
        <Text>{item.title}</Text>
        <Text>latitude: {item.location.latitude}</Text>
        <Text>longitude: {item.location.longitude}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default PostItem;
