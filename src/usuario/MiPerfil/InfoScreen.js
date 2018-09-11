import React, { Component } from 'react'
import { Text, View, ScrollView, AsyncStorage, ActivityIndicator, RefreshControl, Alert, TouchableOpacity } from 'react-native'
import { Card, List, ListItem } from 'react-native-elements';
import ServerURL from "../../config/ServerURL";
import Moment from 'moment';
import 'moment/locale/es';
import { Thumbnail, Container, Content } from 'native-base';
export default class InfoScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      refreshing: false,
      lostConexion: false,
      data: [],
    }
  }
  _Onrefresh() {
    this.setState({ refreshing: true, isLoading: true, lostConexion: false });
    this.getData();
    this.setState({ refreshing: false });
  }
  getData = async () => {
    let id = await AsyncStorage.getItem("userToken");
    fetch(`${ServerURL}/cPanel/AlumnosPanel/getDatosApp.php`, {
      method: 'post',
      header: {
        "Accept": "application/json",
        "content-type": "application/json",
      }, body: JSON.stringify({
        idAlumno: id
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.nivel == 1) {
          responseJson.nivel = "Preescolar";
        } else if (responseJson.nivel == 2) {
          responseJson.nivel = "Primaria";
        }
        this.setState({
          isLoading: false,
          data: responseJson
        });
        global.foto = responseJson.foto;
        global.nivel = responseJson.nivel;
      })
      .catch((error) => {
        Alert.alert("Error de conexion", "ocurrio un problema con tu conexion a internet. Intenta mas tarde")
        this.setState({ lostConexion: true, isLoading: false })
      });
  }
  componentDidMount() {
    this.getData()
  }
  logOut = async () => {
    await AsyncStorage.clear();
    global.name = "";
    global.grupo = "";
    global.grado = "";
    global.foto = "";
    global.token = "";
    global.idgrupo = "";
    global.nivel = "";
    AsyncStorage.setItem("ShowRealApp", "true");
    this.props.navigation.navigate('AuthLoading');
  }
  render() {
    Moment.locale('es');
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    if (this.state.lostConexion) {
      return (
        <Container>

          <Content padder refreshControl={<RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._Onrefresh.bind(this)} />}>
            <Text style={{ color: "rgba(0,0,0,0.5)", fontSize: 40, fontWeight: "bold", textAlign: "center" }}>Sin conexion a Internet</Text>
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
              <TouchableOpacity style={{ borderWidth: 1, borderRadius: 5, borderColor: "grey" }} onPress={this._Onrefresh.bind(this)}>
                <Text style={{ margin: 10 }}>Recargar</Text>
              </TouchableOpacity>
            </View>
          </Content>
        </Container>
      );
    }
    return (
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: "rgba(240, 240, 240, 0.185)" }}>
          <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center", color: "#000" }}>Colegio Indira Gandhi</Text>
          <Text style={{ fontFamily: "Monotype Corsiva", textAlign: "center", color: "#000", fontStyle: "italic" }}>"Un buen principio para un futuro brillante"</Text>
          <Text style={{ color: "#D0D0D0", textAlign: "center" }}>Ciclo escolar 2018-2019</Text>
          <View style={{ alignItems: "center" }}>
            <Thumbnail large source={{ uri: this.state.data.foto }} style={{ marginVertical: 10 }} />
            <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center", color: "#000" }}>{this.state.data.name} {this.state.data.A_paterno} {this.state.data.A_materno}</Text>
          </View>
          <Card title="Grupo">
            <Text style={{ fontSize: 16, textAlign: "center", color: "#000" }}>{this.state.data.grado}°{global.grupo}</Text>
          </Card>
          <Card title="Telefono">
            <Text style={{ fontSize: 16, textAlign: "center", color: "#000" }}>{this.state.data.telefono}</Text>
          </Card>
          <Card title="Correo">
            <Text style={{ fontSize: 16, textAlign: "center", color: "#000" }}>{this.state.data.correo}</Text>
          </Card>
          <Card title="Nivel">
            <Text style={{ fontSize: 16, textAlign: "center", color: "#000" }}>{this.state.data.nivel}</Text>
          </Card>
          <Card title="Fecha de ingreso">
            <Text style={{ fontSize: 16, textAlign: "center", color: "#000" }}>{Moment(this.state.data.fechaI).format('LL')}</Text>
          </Card>
          <List>
            <ListItem
              title="Cerrar Sesión"
              titleContainerStyle={{ alignItems: "center" }}
              titleStyle={{ fontWeight: "bold", color: "blue" }}
              onPress={this.logOut} />
          </List>
        </View>
      </ScrollView>
    )
  }
}