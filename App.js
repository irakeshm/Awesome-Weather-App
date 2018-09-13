import React, { Component } from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {fetchWeather} from './WeatherAPI'
import Highlight from 'react-native-highlight-words'

const iconNames= {
  Default: 'md-time',
  Clear: 'md-sunny',
  Rain: 'md-rainy',
  ThunderStorm:'md-thunderstorm',
  Clouds:'md-cloudy',
  Snow:'md-snow',
  Drizzle:'md-umbrella',
  Haze: 'md-cloudy-night',
}

const phrases= {
  Default: {
    title:"Fetching the Awesome Weather",
    subtitle:"Be Patient, You're witnessing a miracle",
    highlight: "Awesome",
    color:"#636363",
    background:"#9C9C9C"
  },
  Clear: {
    title:"It's Awesome Amaze Balls",
    subtitle:"Rock that Shit!",
    highlight: "Awesome",
    color:"#E32500",
    background:"#FFD017"
  },
  Rain: {
    title:"Rain Rain Go Away",
    subtitle:"Stay inside and Code All Day!",
    highlight: "Away",
    color:"#004A96",
    background:"#2F343A"
  },
  ThunderStorm:{
    title:"Awesome Thunder Strike",
    subtitle:"Unplug those Devices",
    highlight: "Thunder",
    color:"#FBFF46",
    background:"#020202"
  },
  Clouds:{
    title:"Cloud Storage limit Reached",
    subtitle:"error: 5000 - Cirrucolumus!",
    highlight: "Storage",
    color:"#0044FF",
    background:"#939393"
  },
  Snow:{
    title:"Brain Awesome Freeze",
    subtitle:"You're not support to eat it!",
    highlight: "Freeze",
    color:"#021D4C",
    background:"#15A678"
  },
  Drizzle:{
    title:"Meh... Don't even ask",
    subtitle:"What did I Just Say!",
    highlight: "Don't",
    color:"#B3F6E4",
    background:"#1FBB68"
  },
  Haze:{
    title:"It's Hazy Outside",
    subtitle:"I am Lazy inside!",
    highlight: "Hazy",
    color:"#B3F6E4",
    background:"#1FBB68"
  }
}
export default class App extends Component {

  componentWillMount(){
    this.state={
      temp:0,
      weather:'Default'
    }
  }

  componentDidMount(){
    this.getLocation()

  }
  getLocation(){
    navigator.geolocation.getCurrentPosition(
      (posData)=> fetchWeather(posData.coords.latitude, posData.coords.longitude)
      .then(res => this.setState({
        temp:Math.round(res.temp-273.15),
        weather:res.weather,
      })),
      (error)=>alert(error),
      {timeout:10000}
      )

  }

  componentWillReceiveProps()
  {
    this.getLocation()
  }
  render() {
    return (
      <View style={[styles.container, {backgroundColor:phrases[this.state.weather].background}]}>
      <StatusBar hidden={true}/>
        <View style={styles.header}>
          <Icon name={iconNames[this.state.weather]} size={80} color={'white'}></Icon>
          <Text style={styles.temp}>{this.state.temp}°</Text>
          </View>
          <Text style={styles.weather}>{this.state.weather}</Text>

          <View style={styles.body}>
            <Highlight
              style={styles.title}
              highlightStyle={{color: phrases[this.state.weather].color}}
              searchWords={[phrases[this.state.weather].highlight]}
              textToHighlight={phrases[this.state.weather].title}/>
            <Text style={styles.subtitle}>{phrases[this.state.weather].subtitle}</Text>
          </View>
        </View>
    );
  }
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#FFD017'
  },
  header:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    flex:1,
    //backgroundColor:'#66CDAA'
  },
  temp:{
    fontFamily:'sans-serif-thin',
    fontSize:45,
    color:'white'
  },
  title:{
    fontFamily:'normal',
    fontSize:70,
    color:'white',
    marginBottom:5,

  },
  subtitle:{
    fontFamily:'sans-serif-thin',
    fontSize:16,
    color:'white'
  },
  body:{
    alignItems:'flex-start',
    justifyContent:'flex-end',
    flex:5,
    //backgroundColor:'#6495ED',
    margin:10
  },
  weather:{
    fontFamily:'sans-serif-thin',
    fontSize:20,
    color:'white',
    textAlign:'justify',
    marginLeft: 60
  }
})
