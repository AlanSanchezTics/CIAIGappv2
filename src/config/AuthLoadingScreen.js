import React,{Component} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  View,
  Image,
  Text
} from 'react-native';


export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
      }

      _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        const readIntro = await AsyncStorage.getItem('ShowRealApp');
        /*const bandera = await AsyncStorage.getItem('bandera');
        if(bandera==null){
          if(userToken!=null){
            AsyncStorage.clear();
            AsyncStorage.setItem('bandera',"1");
            this.props.navigation.navigate('Auth');
          }else{
            this.props.navigation.navigate(userToken ? 'App' : 'Auth');
          }
        }else{
          this.props.navigation.navigate(userToken ? 'App' : 'Auth');
        }*/
        this.props.navigation.navigate(readIntro ? (userToken ? 'App' : 'Auth') : 'Intro');
      };

      render() {
        return (
            <View style={{flex:1,backgroundColor: '#3A79F7',}}>
              <View style={styles.logoContainer}>
                <Image style={styles.Logo}
                  source={require('../resources/user.png')}
                />
                <Text style={{fontSize: 20,fontWeight: 'bold',color:'#fff', marginTop: 10,}}>CIAIG</Text>
                <Text style={{fontSize: 15,fontWeight: 'bold',color:'#fff', marginTop: 5, paddingBottom:10}}>Control integral del Alumno</Text>
                <ActivityIndicator size="large" color="#0000ff"/>
                <Text style={{fontSize: 20,fontWeight: 'bold',color:'#fff', marginTop: 10,}}>Espera un momento...</Text>
              </View>
          </View>
        );
      }
}
const styles = StyleSheet.create({
  logoContainer:{
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  Logo:{
    width: 90,
    height:90
  },
});