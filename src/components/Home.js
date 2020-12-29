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
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import { connect } from "react-redux";
  
const ScreenHome = (props) => {

  const navigation = useNavigation();
  const {posts} = props;

  return(
    <View style={{ flex: 1}}>
      <Button onPress={()=> navigation.navigate("Add")} title="Add post"/>
      {!(typeof posts !== 'undefined' && posts.length > 0) ?
      <Text style={{fontSize:30, textAlign:"center"}}>There are no posts yet</Text>
      :
      <>
        <FlatList
          data={posts}
          renderItem={({item})=>(<PostItem item={item}/>)}
          keyExtractor={item => item.id}
        />
        <MapView
          style={{height:300, width:'100%'}}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: posts[0].location.latitude,
            longitude: posts[0].location.longitude,
            latitudeDelta: 0.0921,
            longitudeDelta: 0.0440,
          }}
          showsUserLocation={true}
          >
          {posts.map((post, index) => <Marker
              coordinate={{latitude: post.location.latitude, longitude: post.location.longitude}}
              key={index}
              title="Accident"
              onCalloutPress={()=>navigation.navigate("Post", {post: post})}
              description={post.title}
            />)}
        </MapView>
      </>
      }
    </View>
  )
}

const mapStateToProps = (state) => ({
  posts: state.posts
})

export default connect(mapStateToProps, null)(ScreenHome);