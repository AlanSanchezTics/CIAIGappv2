import React, { Component } from 'react'
import { StyleSheet, Text, View, AsyncStorage, RefreshControl, Alert, TouchableOpacity } from 'react-native'
import ServerURL from "../../config/ServerURL";
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { Thumbnail, Container, Content, Spinner } from 'native-base';
export default class CalificacionesScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      refreshing: false,
      lostConexion: false,
      tableHead: [],
      tableTitle: [],
      tableData: [],
      isEmpty: false
    }
  }
  _Onrefresh() {
    this.setState({ refreshing: true, isLoading: true, lostConexion: false });
    this.componentDidMount();
    this.setState({ refreshing: false });
  }
  componentDidMount() {
    this.getData();
  }
  getData = async () => {
    let id = await AsyncStorage.getItem("userToken");
    fetch(`${ServerURL}/dPanel/Calificaciones/getCalificaciones.php`, {
      method: 'post',
      header: {
        "Accept": "application/json",
        "content-type": "application/json",
      }, body: JSON.stringify({
        idAlumno: id,
        nivel: global.nivel
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson == null) {
          this.setState({
            isEmpty: true,
            isLoading: false
          })
        } else {
          const tablaDinamica = [];
          let arregloTemporal = [];
          switch (global.nivel) {
            case "Primaria":
              responseJson.forEach(element => {
                arregloTemporal.push(element.name);
                arregloTemporal.push(element.p1);
                arregloTemporal.push(element.p2);
                arregloTemporal.push(element.p3);
                arregloTemporal.push(element.p4);
                arregloTemporal.push(element.p5);
                tablaDinamica.push(arregloTemporal);
                arregloTemporal = [];
              });
              break;

            case "Preescolar":
              responseJson.forEach(element => {
                arregloTemporal.push(element.name);
                switch (element.Sep) {
                  case "0":
                    arregloTemporal.push("N/A");
                    break;
                  case "1":
                    arregloTemporal.push("R");
                    break;
                  case "2":
                    arregloTemporal.push("B");
                    break;
                  case "3":
                    arregloTemporal.push("MB");
                    break;
                  case "4":
                    arregloTemporal.push("E");
                    break;

                }
                switch (element.Oct) {
                  case "0":
                    arregloTemporal.push("N/A");
                    break;
                  case "1":
                    arregloTemporal.push("R");
                    break;
                  case "2":
                    arregloTemporal.push("B");
                    break;
                  case "3":
                    arregloTemporal.push("MB");
                    break;
                  case "4":
                    arregloTemporal.push("E");
                    break;

                }
                switch (element.Nov) {
                  case "0":
                    arregloTemporal.push("N/A");
                    break;
                  case "1":
                    arregloTemporal.push("R");
                    break;
                  case "2":
                    arregloTemporal.push("B");
                    break;
                  case "3":
                    arregloTemporal.push("MB");
                    break;
                  case "4":
                    arregloTemporal.push("E");
                    break;

                }
                switch (element.Dic) {
                  case "0":
                    arregloTemporal.push("N/A");
                    break;
                  case "1":
                    arregloTemporal.push("R");
                    break;
                  case "2":
                    arregloTemporal.push("B");
                    break;
                  case "3":
                    arregloTemporal.push("MB");
                    break;
                  case "4":
                    arregloTemporal.push("E");
                    break;

                }
                switch (element.Ene) {
                  case "0":
                    arregloTemporal.push("N/A");
                    break;
                  case "1":
                    arregloTemporal.push("R");
                    break;
                  case "2":
                    arregloTemporal.push("B");
                    break;
                  case "3":
                    arregloTemporal.push("MB");
                    break;
                  case "4":
                    arregloTemporal.push("E");
                    break;

                }
                switch (element.Feb) {
                  case "0":
                    arregloTemporal.push("N/A");
                    break;
                  case "1":
                    arregloTemporal.push("R");
                    break;
                  case "2":
                    arregloTemporal.push("B");
                    break;
                  case "3":
                    arregloTemporal.push("MB");
                    break;
                  case "4":
                    arregloTemporal.push("E");
                    break;

                }
                switch (element.Mar) {
                  case "0":
                    arregloTemporal.push("N/A");
                    break;
                  case "1":
                    arregloTemporal.push("R");
                    break;
                  case "2":
                    arregloTemporal.push("B");
                    break;
                  case "3":
                    arregloTemporal.push("MB");
                    break;
                  case "4":
                    arregloTemporal.push("E");
                    break;

                }
                switch (element.Abr) {
                  case "0":
                    arregloTemporal.push("N/A");
                    break;
                  case "1":
                    arregloTemporal.push("R");
                    break;
                  case "2":
                    arregloTemporal.push("B");
                    break;
                  case "3":
                    arregloTemporal.push("MB");
                    break;
                  case "4":
                    arregloTemporal.push("E");
                    break;

                }
                switch (element.May) {
                  case "0":
                    arregloTemporal.push("N/A");
                    break;
                  case "1":
                    arregloTemporal.push("R");
                    break;
                  case "2":
                    arregloTemporal.push("B");
                    break;
                  case "3":
                    arregloTemporal.push("MB");
                    break;
                  case "4":
                    arregloTemporal.push("E");
                    break;

                }
                switch (element.Jun) {
                  case "0":
                    arregloTemporal.push("N/A");
                    break;
                  case "1":
                    arregloTemporal.push("R");
                    break;
                  case "2":
                    arregloTemporal.push("B");
                    break;
                  case "3":
                    arregloTemporal.push("MB");
                    break;
                  case "4":
                    arregloTemporal.push("E");
                    break;

                }
                tablaDinamica.push(arregloTemporal);
                arregloTemporal = [];
              });
              break;
          }
          this.setState({ tableData: tablaDinamica });
          const encabezadoDinamica = [];
          responseJson.forEach(element => {
            arregloTemporal.push(element.name);
            encabezadoDinamica.push(arregloTemporal);
            arregloTemporal = [];
          });
          this.setState({
            tableTitle: encabezadoDinamica,
            isLoading: false
          });
          switch (global.nivel) {
            case "Primaria":
              this.setState({
                tableHead: ['Materia', 'I', 'II', 'III', 'IV', 'V']
              })
              break;
            case "Preescolar":
              this.setState({
                tableHead: ['Campo', 'Sep', 'Oct', 'Nov', 'Dic', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun']
              })
              break;
          }
        }
      })
      .catch((error) => {
        Alert.alert("Error de conexion", "ocurrio un problema con tu conexion a internet. Intenta mas tarde. id:" + id + "nivel:" + global.nivel)
        console.error(error);
        this.setState({
          lostConexion: true,
          isLoading: false
        })
      });
  }
  render() {

    if (this.state.isLoading) {
      return (
        <Container>
          <Content padder>
            <Spinner color='blue' />
          </Content>
        </Container>
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
    } else if (this.state.isEmpty) {
      return (
        <Container>
          <Content padder refreshControl={<RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._Onrefresh.bind(this)} />}>
            <Text style={{ color: "rgba(0,0,0,0.5)", fontSize: 40, fontWeight: "bold", textAlign: "center" }}>El docente aun no sube calificaciones</Text>
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
              <TouchableOpacity style={{ borderWidth: 1, borderRadius: 5, borderColor: "grey" }} onPress={this._Onrefresh.bind(this)}>
                <Text style={{ margin: 10 }}>Recargar</Text>
              </TouchableOpacity>
            </View>
          </Content>
        </Container>
      );
    }
    switch (global.nivel) {
      case "Preescolar":
        return (
          <Content refreshControl={<RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._Onrefresh.bind(this)} />}>
            <View style={{ flex: 1, backgroundColor: "rgb(255, 255, 255)" }}>
              <Text style={{ fontWeight: "bold", fontSize: 30, textAlign: "center", color: "#000" }}>Colegio Indira Gandhi</Text>
              <Text style={{ fontStyle: "italic", textAlign: "center", color: "#000", }}>"Un buen principio para un futuro brillante"</Text>
              <Text style={{ textAlign: "center", color: "#000" }}>PRIMARIA: CCT 14PPR0561N</Text>
              <Text style={{ color: "#D0D0D0", textAlign: "center" }}>Ciclo escolar 2018-2019</Text>
              <View style={{ alignItems: "center" }}>
                <Thumbnail large source={{ uri: global.foto }} style={{ marginVertical: 10 }} />
                <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center", color: "#000" }}>{global.name}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 15, color: "#000" }}>{global.grado}°{global.grupo} {global.nivel}</Text>
              </View>
              <Content style={{ backgroundColor: "#FFF" }}>
                <Text style={{ fontSize: 25, textAlign: "center", fontWeight: "bold", color: "#000" }}>Calificaciones Del periodo</Text>
                <View style={styles.container}>
                  <Table style={{ marginBottom: 50 }}>
                    <Row data={this.state.tableHead} flexArr={[1, 1 / 4, 1 / 4, 1 / 4, 1 / 4, 1 / 4, 1 / 4, 1 / 4, 1 / 4, 1 / 4, 1 / 4]} style={styles.head} textStyle={styles.text} />
                    <Rows data={this.state.tableData} style={styles.row} flexArr={[1, 1 / 4, 1 / 4, 1 / 4, 1 / 4, 1 / 4, 1 / 4, 1 / 4, 1 / 4, 1 / 4, 1 / 4]} textStyle={styles.text} />
                  </Table>
                </View>
              </Content>
            </View>
          </Content>
        )
        break;

      case "Primaria":
        return (
          <Content refreshControl={<RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._Onrefresh.bind(this)} />}>
            <View style={{ flex: 1, backgroundColor: "rgb(255, 255, 255)" }}>
              <Text style={{ fontWeight: "bold", fontSize: 30, textAlign: "center", color: "#000" }}>Colegio Indira Gandhi</Text>
              <Text style={{ fontStyle: "italic", textAlign: "center", color: "#000" }}>"Un buen principio para un futuro brillante"</Text>

              <Text style={{ color: "#D0D0D0", textAlign: "center" }}>Ciclo escolar 2018-2019</Text>
              <View style={{ alignItems: "center" }}>
                <Thumbnail large source={{ uri: global.foto }} style={{ marginVertical: 10 }} />
                <Text style={{ fontWeight: "bold", fontSize: 20, color: "#000" }}>{global.name}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 15, color: "#000" }}>{global.grado}°{global.grupo} {global.nivel}</Text>
              </View>
              <Content style={{ backgroundColor: "#FFF" }}>
                <Text style={{ fontSize: 25, textAlign: "center", fontWeight: "bold", color: "#000" }}>Calificaciones Del periodo</Text>
                <View style={styles.container}>
                  <Table style={{ marginBottom: 50 }}>
                    <Row data={this.state.tableHead} flexArr={[1, 1 / 3, 1 / 3, 1 / 3, 1 / 3, 1 / 3]} style={styles.head} textStyle={styles.text} />
                    <Rows data={this.state.tableData} style={styles.row} flexArr={[1, 1 / 3, 1 / 3, 1 / 3, 1 / 3, 1 / 3]} textStyle={styles.text} />
                  </Table>
                </View>
              </Content>
            </View>
          </Content>
        )
        break;
    }
  }
}

const styles = StyleSheet.create({
  container: { flex: 5, padding: 1, paddingTop: 30, backgroundColor: '#fff' },
  head: { backgroundColor: '#3A79F7' },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#FFF' },
  row: { height: 80, },
  text: { textAlign: 'center', fontWeight: "bold", color: "#000" }
});