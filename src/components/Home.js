import React,{useState} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import PostItem from './PostItem';

import { useNavigation } from '@react-navigation/native';

import { connect } from "react-redux";
import { saveWord } from "../actionCreators/actions";
  
const ScreenHome = (props) => {

  const navigation = useNavigation();

  const {posts} = props;

  return(
    <View style={{ flex: 1}}>
      <Button onPress={()=> navigation.navigate("Add")} title="Add post"/>
      {!(typeof posts !== 'undefined' && posts.length > 0) ?
      <Text style={{fontSize:30, textAlign:"center"}}>There are no posts yet</Text>
      :
        <FlatList
          data={posts}
          renderItem={({item})=>(<PostItem item={item}/>)}
          keyExtractor={item => item.id}
        />
      }
    </View>
  )
}

const mapStateToProps = (state) => ({
  posts: state.posts
})

export default connect(mapStateToProps, null)(ScreenHome);