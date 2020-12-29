import React,{useState} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { connect } from "react-redux";
import { saveWordReducer } from "../actionCreators/actions";

const Post = ({item, onUpdate}) => {
    return(
      <TouchableOpacity onPress={()=> onUpdate(item.id)}>
        <View style={{padding: 10, borderWidth:1,borderColor:"red"}}>
          <Text>id: {item.id}</Text>
          <Text>title: {item.title}</Text>
          <Text>body: {item.body}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  
const Screen0 = (props) => {

  const navigation = useNavigation();

  const {saveWord,
    word} = props;

  const [posts, setPosts] = useState([])

  const addWord = () => {
    saveWord(Date.now());
    setTimeout(()=>{ navigation.navigate("Screen1")} , 1000)
  }

  const fetchPosts = async () => {
    try {
      const posts = await fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json());
      setPosts(posts);
    }
    catch (error) {
      console.error(error)
    }
  }

  const postPost = async () => {
    const request = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
      }),
    };

    fetch('https://jsonplaceholder.typicode.com/posts', request)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((json) => {
      alert(JSON.stringify(json));
      setPosts([json, ...posts])
    })
    .catch((error)=>console.error(error));
  }

  const putPost = async (id) => {
    const request = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        title: 'foo updated',
        body: 'bar updated',
        userId: 1,
      }),
    };

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, request)
    .then((response) => response.json())
    .then((json) => {
      alert(JSON.stringify(json));
      const newPosts = [...posts].map(item => item.id === id ? json : item);
      setPosts(newPosts);
    })
    .catch((error)=>console.error(error));
  }

  const deletePost= (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    })
    .then(response => {
      const newPosts = posts.filter((item) => item.id !== id);
      setPosts(newPosts);
      return response.json();
    })
    .then(json=>console.log(json));
  }

  React.useEffect(() => {
    fetchPosts();
  }, [])

  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity
        onPress={addWord}
        style={{height:50, justifyContent:'center',backgroundColor: "#88DDFF", fontSize: 30}}
      >
        <Text>Add word</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={postPost}
        style={{height:50, justifyContent:'center',backgroundColor: "#DDDDDD", fontSize: 30}}
      >
        <Text>Add post</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={()=>putPost(2)}
        style={{height:50, justifyContent:'center', backgroundColor: "#00eeff", fontSize: 30}}
      >
        <Text>Update post</Text>
      </TouchableOpacity>

      <Button onPress={()=>deletePost(2)} title="delete 2nd"/>
      
      <View
        style={{height:50, justifyContent:'center', fontSize: 30}}
      >
        <Text>Word: {word}</Text>
      </View>

      {posts &&
        <FlatList
          data={posts}
          renderItem={({item})=>(<Post item={item} onUpdate={putPost}/>)}
          keyExtractor={item => String(item.id)}
        />
      }
    </View>
  )
}

const mapDispatchToProps = (dispatch) => ({
  saveWord: (word) => dispatch(saveWordReducer(word))
})

const mapStateToProps = (state) => ({
  word: state.word
})

export default connect(mapStateToProps, mapDispatchToProps)(Screen0);