import React, {Component} from 'react'
import {createMaterialTopTabNavigator} from "react-navigation"
import TareasEs from "./TareasEs"
import TareasEn from "./TareasEn"
import TareasCom from "./TareasCom"
import TareasMus from './TareasMus'
import TareasEF from './TareasEF'

export default createMaterialTopTabNavigator({
  Español:TareasEs,
  Ingles: TareasEn,
  Computación: TareasCom,
  Musica: TareasMus,
  Deportes:TareasEF
})
