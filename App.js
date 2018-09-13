/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { AsyncStorage, View, Dimensions } from "react-native";
import InitialIndex from "./src/usuario/InitialIndex.js";
import OneSignal from 'react-native-onesignal';
import Moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';
import 'moment/locale/es';
import Modal from 'react-native-modalbox';
import { Container, Card, CardItem, Body, Text, Button} from 'native-base';
global.name = "";
global.grupo = "";
global.grado = "";
global.foto = "";
global.token = "";
global.idgrupo = "";
global.nivel = "";
OneSignal.inFocusDisplaying(1);
export default class App extends Component {
  state = {
    modalVisible: false,
    rowData: []
  }
  componentWillMount() {
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    this.setState({
      modalVisible: false,
      rowData: [],
      isDisabled: false,
      swipeToClose: true,
    })
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onOpened = ({ notification }) => {
    this.refs.ModalNotification.open();
    this.setState({
      rowData: notification.payload.additionalData
    });
  }

  onIds(device) {
    global.token = device.userId;
    AsyncStorage.setItem("TokenID",global.token);
  }
  getData = async () => {
    global.name = await AsyncStorage.getItem("name");
    global.grado = await AsyncStorage.getItem("grado");
    global.grupo = await AsyncStorage.getItem("grupo");
    global.idgrupo = await AsyncStorage.getItem("grupoToken");
    global.token = await AsyncStorage.getItem("TokenID");
  }
  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <Container>
        <Modal
          style={{ backgroundColor: "#F2F2F2",}} ref={"ModalNotification"} swipeToClose={this.state.swipeToClose}>
          <Button transparent style={{width:25,height:25, alignItems:"center", justifyContent:"center"}} onPress={() => {this.refs.ModalNotification.close();}}>
            <Ionicons name="ios-arrow-back" size={25} color="#000"/>
          </Button>
          <Card>
            <CardItem header bordered>
              <Body>
                <Text style={{ fontWeight: "bold" }}>{this.state.rowData.Title}</Text>
                <Text note>{Moment(this.state.rowData.FechaI).format('LL')}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>{this.state.rowData.body}</Text>
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <Text>para el {Moment(this.state.rowData.FechaF).format('LL')}</Text>
            </CardItem>
          </Card>
        </Modal>
        <InitialIndex />
      </Container>
    );
  }
}