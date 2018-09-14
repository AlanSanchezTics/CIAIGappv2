import React, { Component } from 'react';
import { AsyncStorage, Alert, RefreshControl, View, TouchableOpacity } from "react-native";
import Moment from 'moment';
import 'moment/locale/es';
import ServerURL from "../../config/ServerURL"
import { Container, Body, Content, Text, Card, CardItem, Spinner, List } from "native-base";

export default class AvisosPersonales extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            isEmpty: true,
            refreshing: false,
            lostConexion: false, 
            dataSource:[]
        }
    }
    _Onrefresh() {
        this.setState({ refreshing: true, isLoading: true, lostConexion: false,dataSource:[] });
        this.componentDidMount();
        this.setState({ refreshing: false });
    }
    getData = async () => {
        let id = await AsyncStorage.getItem("userToken");

        fetch(`${ServerURL}/cPanel/AvisosPanel/AvisosPersonales.php`, {
            method: "post",
            header: {
                "Accept": "application/json",
                "content-type": "application/json",
            },
            body: JSON.stringify({
                idAlumno: id
                //idAlumno:global.id
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson != null) {
                    this.setState({
                        isLoading: false,
                        isEmpty: false,
                        dataSource: responseJson
                    })
                } else {
                    this.setState({
                        isLoading: false
                    })
                }
            })
            .catch((error) => {
                Alert.alert("Error de conexion", "ocurrio un problema con tu conexion a internet. Intenta mas tarde")
                this.setState({ lostConexion: true, isLoading: false });
            });

    }
    componentDidMount() {
        this.getData()
    }

    render() {
        Moment.locale('es');
        if (this.state.isLoading) {
            return (
                <Container>

                    <Content padder>
                        <Spinner />
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
                        <View style={{justifyContent:"center",alignItems:"center", flex:1}}>
                            <TouchableOpacity style={{borderWidth:1, borderRadius:5,borderColor:"grey"}} onPress={this._Onrefresh.bind(this)}>
                                <Text style={{margin:10}}>Recargar</Text>
                            </TouchableOpacity>
                        </View>
                    </Content>
                </Container>
            );
        }
        if (this.state.isEmpty) {
            return (
                <Container>

                    <Content padder refreshControl={<RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._Onrefresh.bind(this)} />}>
                        <Text style={{ color: "rgba(0,0,0,0.5)", fontSize: 40, fontWeight: "bold", textAlign: "center" }}>No hay Avisos por el momento...</Text>
                        <View style={{justifyContent:"center",alignItems:"center", flex:1}}>
                            <TouchableOpacity style={{borderWidth:1, borderRadius:5,borderColor:"grey"}} onPress={this._Onrefresh.bind(this)}>
                                <Text style={{margin:10}}>Recargar</Text>
                            </TouchableOpacity>
                        </View>
                    </Content>
                </Container>
            );
        }
        return (
            <Container>

                <Content padder refreshControl={<RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._Onrefresh.bind(this)} />}>
                    <List
                        dataArray={this.state.dataSource}
                        renderRow={(rowData) =>
                            <Card>
                                <CardItem header bordered>
                                    <Body>
                                        <Text style={{ fontWeight: "bold" }}>{rowData.titulo}</Text>
                                        <Text note>{Moment(rowData.fechaEm).format('LL')}</Text>
                                    </Body>
                                </CardItem>
                                <CardItem>
                                    <Body>
                                        <Text>{rowData.descripcion}</Text>
                                    </Body>
                                </CardItem>
                                <CardItem footer bordered>
                                    <Text>para el {Moment(rowData.fechaAC).format('LL')}</Text>
                                </CardItem>
                            </Card>
                        }
                    />
                </Content>
            </Container>
        );

    }
}
