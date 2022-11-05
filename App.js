import React,{Component, useState} from "react";
import{
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList
  

} from "react-native"



export default class App extends Component{

  constructor(){
    super();
    this.state={
      loader: false,
      DATA : []
  
    }
  }

  getData(){
    this.setState({loader:true})
    fetch('https://api.sampleapis.com/coffee/hot')
    .then((response)=> response.json())
    .then((response)=>{
      if(response.length>0){
        this.setState({DATA : response})

      }
      this.setState({loader : false})
      console.log('your response is :',response)
    })
    .catch((error)=>{
      this.setState({loader : false})
      console.log('ERROR IS :',error)
    })
  }

componentDidMount(){
  this.getData()
}

  render(){
    

    const renderItem = ({item})  => (
      <View style={styles.itemcontainer}>
        <Text>{item.title}</Text>
        <Text>{item.descriptionf}</Text>
      </View>
      
    )
    return(
      <View style={styles.container}>
        <ActivityIndicator size={50} color='blue' animating={this.state.loader}/>
        <Text onPress={()=> this.getData()}>
          WELCOME
        </Text>
        <FlatList style={{width:'95%',marginTop:10}}
         data={this.state.DATA}
         renderItem={renderItem}/>
        
      </View>
    )
  }
}

const styles= StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },

  itemcontainer:{
    width:'100%',
    padding: 10,
    backgroundColor:'grey',
    elevation:4,
    marginBottom:10
  }
})