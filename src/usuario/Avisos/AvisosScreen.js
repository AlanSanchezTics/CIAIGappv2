import {createMaterialTopTabNavigator} from "react-navigation"
import AvisosGrupales from './AvisosGrupales'
import AvisosPersonales from './AvisosPersonales'
import AvisosGenerales from './AvisosGenerales'
import AvisosNivel from "./AvisosNivel"

export default createMaterialTopTabNavigator({
  General: AvisosGenerales,
  Nivel: AvisosNivel,
  Grupo: AvisosGrupales,
  Personal: AvisosPersonales
});