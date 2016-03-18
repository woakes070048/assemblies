'use strict';
import React from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import NavigationBar from 'react-native-navbar';
import _ from 'underscore';

let {
  AppRegistry,
  StyleSheet,
  Text,
  Animated,
  Easing,
  Image,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Navigator,
} = React;

class Message extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      translateAnim: new Animated.Value(1),
    }
  }
  // componentDidMount() {
  //    Animated.timing(          // Uses easing functions
  //      this.state.translateAnim,    // The value to drive
  //      {toValue: 1},           // Configuration
  //    ).start();                // Don't forget start!
  // }
  render(){
    let {message} = this.props;
    return (
      <Animated.View
        style={{
           opacity: 1,
           transform: [{
             translateY: this.state.translateAnim.interpolate({
               inputRange: [0, 1],
               outputRange: [150, 0]
             }),
           }],
         }}
      >
        <View style={styles.container}>
          <TouchableOpacity onPress={()=>{
            let {user} = this.props;
            this.props.navigator.push({
              name: 'Profile',
              user: user,
              username: message.senderName,
              avatar: message.senderAvatar,
            })
          }}>
            <Image
              style={styles.icon}
              source={{uri: message.senderAvatar}}
            />
          </TouchableOpacity>
          <View style={styles.messageBox}>
            <View style={styles.row}>
              <Text style={styles.author}>{message.senderName}</Text>
              <Text style={styles.sent}>{moment(new Date(parseInt(message.createdAt))).fromNow()}</Text>
            </View>
            <View style={styles.messageView}>
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
          </View>
        </View>
      </Animated.View>
    )
  }
}
let styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 10,
  },
  icon: {
    marginTop: 10,
    marginLeft: 13,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  messageBox: {
    flex: 1,
    alignItems: 'stretch',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 2,
    marginTop: 10
  },
  messageView: {
    backgroundColor: 'white',
    flex: 1,
    paddingRight: 15
  },
  messageText: {
    fontSize: 16,
    fontWeight: '300',
  },
  author:{
    fontSize: 12,
    fontWeight: '700'
  },
  sent:{
    fontSize: 12,
    fontWeight: '300',
    color: '#9B9B9B',
    marginLeft: 10,
    color: '#9B9B9B',
    fontWeight: '300',
    marginLeft: 10
  }
})
module.exports = Message;
