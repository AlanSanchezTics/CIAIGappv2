import React, { Component } from 'react'
import { Text, Image, Dimensions, View, ScrollView, StyleSheet } from 'react-native';
import { Button, List, ListItem, Left, Body, Right, Card } from 'native-base';
import ImageZoom from 'react-native-image-pan-zoom';
import Modal from 'react-native-modalbox';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class PagoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: false,
      swipeToClose: true,
    }
  }
  render() {

    return (
      <ScrollView>
        <View style={{ backgroundColor: "#FFF", flex: 1 }}>
          <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 25, color: "#000" }}>Indira Gandhi</Text>
          <Text style={{ textAlign: "center", fontStyle: "italic", color: "#000" }}>“Un buen principio para un futuro brillante”</Text>
          <Text style={{ textAlign: "center", fontSize: 9, color: "#000" }}>MATERNAL, PREESCOLAR Y PRIMARIA</Text>
          <Text style={{ textAlign: "center", fontSize: 9, color: "#000" }}>RFC: KMC040813KC1</Text>
          <Text style={{ textAlign: "center", fontSize: 9, color: "#000" }}>JAMAICA 1505 / GUAYAQUIL 505, COL. LAZARO CARDENAS</Text>
          <Text style={{ textAlign: "center", fontSize: 9, color: "#000" }}>TELS. 222-35-48 Y 222-01-96</Text>
          <Text style={{ textAlign: "center", fontSize: 9, color: "#000" }}>PUERTO VALLARTA JAL. C.P 48330</Text>
          <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 25, marginTop: 8, color: "#000" }}>Control de Pagos 2018 - 2019</Text>
          <Image
            style={{ resizeMode: "stretch", width: Dimensions.get('window').width, height: 200 }}
            source={require("../../resources/calendario.png")} />
          <List>
            <ListItem itemDivider>
              <Text>Opciones</Text>
            </ListItem>
            <ListItem onPress={() => { this.refs.modalDatos.open() }}>
              <Left>
                <MaterialIcons name="attach-money" size={20} color="green" />
                <Text style={{ color: "#000" }}>Datos de pago</Text>
              </Left>
              <Body />
              <Right>
                <MaterialIcons name="chevron-right" size={18} />
              </Right>
            </ListItem>
            <ListItem onPress={() => { this.refs.ModalInstrucciones.open() }}>
              <Left>
                <MaterialIcons name="description" size={20} color="blue" />
                <Text style={{ color: "#000" }}>Instrucciones de Pago</Text>
              </Left>
              <Body />
              <Right>
                <MaterialIcons name="chevron-right" size={18} />
              </Right>
            </ListItem>
            <ListItem itemDivider>
              <Text>Versión 2.01 Colegio Indira Gandhi® derechos Reservados©</Text>
            </ListItem>
          </List>
          <Modal style={[styles.modal, styles.modal3]} position={"center"} ref={"modalDatos"} isDisabled={this.state.isDisabled}>
            <Card style={{ justifyContent: "center", alignItems: "center", paddingHorizontal: 20 }}>
              <Image
                style={{ resizeMode: "stretch", width: 200, height: 87 }}
                source={require("../../resources/banco.png")}
              />
              <Text style={{ textAlign: "center", color: "#000", fontWeight: "bold" }}>KINDER MADAM CURIE DE PUERTO VALLARTA AC</Text>
              <Text style={{ color: "#000" }}>Sucursal <Text style={{ fontWeight: "bold" }}>442</Text></Text>
              <Text style={{ color: "#000" }}>N° de cuenta <Text style={{ fontWeight: "bold" }}>92-00188714-7</Text></Text>
              <Text style={{ color: "#000" }}>CLABE <Text style={{ fontWeight: "bold" }}>014375920018871475</Text></Text>
            </Card>
          </Modal>
          <Modal swipeToClose={this.state.swipeToClose} ref={"ModalInstrucciones"}>
            <ScrollView>
              <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 30, color: "#000", fontWeight: "bold", textAlign: "center" }}>Instrucciones de Pago</Text>
                <Text style={{ color: "#000", fontWeight: "bold" }}><MaterialIcons name="school" size={25} color="black" />COLEGIO</Text>
                <Text style={{ color: "#000" }}>En la administración, presente su tarjetón para hacer su pago en efectivo o tarjeta de crédito/débito.</Text>
                <Text style={{ color: "#000", fontWeight: "bold" }}><MaterialIcons name="account-balance" size={25} color="black" />BANCO</Text>
                <Text style={{ color: "#000" }}>Presente esta tarjeta en cualquier sucursal Santander indicándole al cajero la cantidad tomando en cuenta la fecha de su pago. Conserve su ficha y presente en la oficina del colegio para la emisión de su factura.</Text>
                <Text style={{ color: "#000", fontWeight: "bold" }}><MaterialIcons name="compare-arrows" size={25} color="black" />TRANSFERENCIA</Text>
                <Text style={{ color: "#000" }}>Tome en cuenta la fecha de su pago y envié el comprobante ese mismo día para emisión de su factura al correo: <Text style={{ color: "blue", fontWeight: "bold" }}>colegioindiragandhiprimaria@gmail.com</Text></Text>
                <Text style={{ color: "#000", fontWeight: "bold", textAlign: "center", fontSize: 20 }}>Importante</Text>
                <Text style={{ color: "#000" }}><MaterialIcons name="chevron-right" size={15} />Favor de realizar su pago por la cantidad que corresponde según la fecha, como se indica en la tabla superior.</Text>
                <Text style={{ color: "#000" }}><MaterialIcons name="chevron-right" size={15} />Efectué sus pagos de manera consecutiva sin saltar meses.</Text>
                <Text style={{ color: "#000" }}><MaterialIcons name="chevron-right" size={15} />Solo se depositan y facturan inscripciones y colegiaturas.</Text>
              </View>
            </ScrollView>
          </Modal>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal3: {
    height: 300,
    width: Dimensions.get("window").width,
    paddingVertical: 20,
    paddingHorizontal: 5,
    backgroundColor: "#F2F2F2"
  },
});
