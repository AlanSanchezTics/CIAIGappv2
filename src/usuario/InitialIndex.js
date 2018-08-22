import React, { Component } from 'react'
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from "react-navigation";
import InfoScreen from "./MiPerfil/InfoScreen.js";
import AvisosScreen from './Avisos/AvisosScreen.js';
import TareasScreen from "./Tareas/TareasScreen.js";
import CalificacionesScreen from "./Calificaciones/CalificacionesScreen.js";
import PagosScreen from "./Pagos/PagoScreen.js";
import LoginScreen from '../Auth/LoginScreen.js';
import IntroScreen from '../Auth/IntroScreen';
import AuthLoadingScreen from '../config/AuthLoadingScreen.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Image} from "react-native";
const App = createBottomTabNavigator({
    Perfil: InfoScreen,
    Avisos:AvisosScreen,
    Tareas : TareasScreen,
    Calificaciones: CalificacionesScreen,
    Pagos: PagosScreen
},{
    lazy: true,
    animationEnabled: true,
    swipeEnabled:true,
    backBehavior: 'initialRoute',
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'Perfil') {
            iconName = `ios-contact${focused ? '' : '-outline'}`;
          } else if (routeName === 'Avisos') {
            iconName = `ios-notifications${focused ? '' : '-outline'}`;
          }else if( routeName === 'Pagos') {
              iconName = `ios-calendar${focused ? '': '-outline'}`;
          }else if(routeName === 'Tareas'){
              iconName = `ios-bookmarks${focused ? '' : '-outline'}`;
          }else if(routeName === 'Calificaciones'){
            iconName = `ios-ribbon${focused ? '' : '-outline'}`;
        }
        
          return <Ionicons name={iconName} size={25} color={tintColor} />;
        },
        
      }),
});

const AuthStack = createStackNavigator({
  Login:LoginScreen
  },
  {headerMode:"none"}
);
const introStack = createStackNavigator({
  Intro:IntroScreen
  },
  {headerMode:"none"}
);
const AppStack = createStackNavigator({
  App: App
},{
  navigationOptions: ({navigation}) => ({
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#3A79F7',
      alignContent: "space-between"
    },
  })
})
export default createSwitchNavigator({
  Auth: AuthStack,
  App: AppStack,
  AuthLoading: AuthLoadingScreen,
  Intro: introStack
},{
  initialRouteName:"AuthLoading"
});

class LogoTitle extends Component {
  render() {
    return (
        <Image
          source={require('../resources/LogoTitle.png')}
          style={{ width: 98, height: 35, marginLeft: 15}}
        />
    );
  }
}