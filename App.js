import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
    Button,
    StyleSheet,
    Text,
    View,
    Pressable,
    FlatList,
    ScrollView,
    Alert,
} from "react-native";
import Formulario from "./components/Formulario";
import Paciente from "./components/Paciente";
import InformacionPaciente from "./components/InformacionPaciente";

export default function App() {
    const [modalVisible, setModalVisible] = useState(false);
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});
    const [modalPaciente, setModadlPaciente] = useState(false);

    const nuevaCita = () => {
        setModalVisible(!modalVisible);
    };
    // Editar paciente
    const editarPaciente = (id) => {
        const pacienteEditar = pacientes.filter(
            (paciente) => paciente.id === id
        );
        setPaciente(pacienteEditar[0]);
    };

    const pacienteEliminar = (id) => {
        Alert.alert(
            "Deseas el eliminar el paciente?",
            "Un paciente eliminado no se puede recuperar",
            // cuando requerimos preguntar generamos un arreglo de 2 botones, el primero es negar y el segundo para confirmar
            [
                {
                    text: "Cancelar",
                },
                {
                    text: "Si, Eliminar",
                    onPress: () => {
                        const pacientesActualizados = pacientes.filter(
                            (paciente) => paciente.id !== id
                        );
                        setPacientes(pacientesActualizados);
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.titulo}>
                    Administrador de Citas
                    <Text style={styles.tituloBold}> Veterinaria</Text>
                </Text>
                <Pressable style={styles.btnNuevaCita} onPress={nuevaCita}>
                    <Text style={styles.btnTextNuevaCita}> Nueva Cita</Text>
                </Pressable>
                {/* Listado de Pacientes */}
                {pacientes.length > 0 ? (
                    <View style={styles.listadoPacientes}>
                        <Text style={styles.noPacientes}>
                            Listado de Pacientes
                        </Text>
                        {/* Utilizamos FlatList es un componente que nos permite renderizar una lista de elementos */}
                        <FlatList
                            style={styles.pacientes}
                            // date: es props son los datos que va a renderizar
                            data={pacientes}
                            // keyExtractor: es una funcion que nos permite identificar cada elemento de la lista
                            keyExtractor={(item) => item.id}
                            // renderItem: es una funcion que nos permite renderizar cada elemento de la lista
                            //Es obligatorio usar la palabra reservada "item porque es el elemento que se va a renderiza
                            renderItem={({ item }) => {
                                console.log(item);
                                return (
                                    <Paciente
                                        key={item.id}
                                        item={item}
                                        setModalVisible={setModalVisible}
                                        editarPaciente={editarPaciente}
                                        pacienteEliminar={pacienteEliminar}
                                        setModadlPaciente={setModadlPaciente}
                                        setPaciente={setPaciente}
                                    />
                                );
                            }}
                        />
                    </View>
                ) : (
                    <Text style={styles.noPacientes}>No hay pacientes</Text>
                )}
                <Formulario
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    nuevaCita={nuevaCita}
                    pacientes={pacientes}
                    setPacientes={setPacientes}
                    paciente={paciente}
                    setPaciente={setPaciente}
                />
                <InformacionPaciente
                    modalPaciente={modalPaciente}
                    setModadlPaciente={setModadlPaciente}
                    paciente={paciente}
                    setPaciente={setPaciente}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F4F6",
    },
    titulo: {
        fontSize: 30,
        color: "#374151",
        fontWeight: "600",
        textAlign: "center",
        marginTop: 50,
    },
    tituloBold: {
        fontSize: 30,
        textTransform: "uppercase",
        color: "#6D28D9",
        fontWeight: "900",
        textAlign: "center",
    },
    btnNuevaCita: {
        backgroundColor: "#6D28D9",
        padding: 15,
        marginTop: 20,
        borderRadius: 10,
        marginHorizontal: 30,
    },
    btnTextNuevaCita: {
        textAlign: "center",
        color: "#fff",
        fontSize: 20,
        textTransform: "uppercase",
        fontWeight: "bold",
    },
    listadoPacientes: {
        marginTop: 5,
        marginHorizontal: 20,
    },
    noPacientes: {
        fontSize: 20,
        marginTop: 40,
        marginHorizontal: 20,
        fontWeight: "600",
        textAlign: "center",
    },
    pacientes: {
        fontSize: 20,
        marginVertical: 10,
        fontWeight: "600",
        textAlign: "center",
    },
});
