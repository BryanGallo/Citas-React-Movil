import React from "react";
import {
    Text,
    Modal,
    View,
    StyleSheet,
    ScrollView,
    Pressable,
} from "react-native";
import formatearFecha from "../helpers/formatearFecha.js";

const InformacionPaciente = ({
    modalPaciente,
    setModadlPaciente,
    paciente,
    setPaciente,
}) => {
    const { id, nombre, propietario, date, sintomas, telefono, email } =
        paciente;

    return (
        <Modal visible={modalPaciente} animationType="fade">
            <View style={styles.container}>
                <ScrollView>
                    <View>
                        <Text style={styles.titulo}>
                            Información
                            <Text style={styles.tituloBold}> Paciente</Text>
                        </Text>
                    </View>
                    <View>
                        <Pressable
                            style={styles.btnCerrar}
                            onPress={() => {
                                setModadlPaciente(!modalPaciente);
                                setPaciente({});
                            }}
                        >
                            <Text style={styles.btnCerrarTexto}>Cerrar</Text>
                        </Pressable>
                    </View>
                    <View style={styles.contenido}>
                        <View style={styles.campo}>
                            <Text style={styles.label}>Nombre Paciente:</Text>
                            <Text style={styles.valor}>{nombre}</Text>
                        </View>
                        <View style={styles.campo}>
                            <Text style={styles.label}>
                                Nombre Propietario:
                            </Text>
                            <Text style={styles.valor}>{propietario}</Text>
                        </View>
                        <View style={styles.campo}>
                            <Text style={styles.label}>Fecha de Alta:</Text>
                            <Text style={styles.valor}>
                                {formatearFecha(date)}
                            </Text>
                        </View>
                        <View style={styles.campo}>
                            <Text style={styles.label}>Teléfono:</Text>
                            <Text style={styles.valor}>{telefono}</Text>
                        </View>
                        <View style={styles.campo}>
                            <Text style={styles.label}>Email:</Text>
                            <Text style={styles.valor}>{email}</Text>
                        </View>
                        <View style={styles.campo}>
                            <Text style={styles.label}>Sintomas:</Text>
                            <Text style={styles.valor}>{sintomas}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F59E0B",
        flex: 1,
    },
    titulo: {
        fontSize: 30,
        color: "#FFF",
        fontWeight: "600",
        textAlign: "center",
        marginTop: 50,
    },
    tituloBold: {
        fontSize: 30,
        textTransform: "uppercase",
        color: "#fff",
        fontWeight: "900",
        textAlign: "center",
    },
    btnCerrar: {
        marginTop: 20,
        backgroundColor: "#E06900",
        marginHorizontal: 30,
        marginVertical: 30,
        padding: 10,
        borderRadius: 10,
        // borderWidth: 2,
        borderColor: "#fff",
    },
    btnCerrarTexto: {
        textAlign: "center",
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 16,
        textTransform: "uppercase",
    },
    contenido: {
        backgroundColor: "#fff",
        marginHorizontal: 30,
        borderRadius: 10,
        padding: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,

        elevation: 24,
    },
    campo: {
        marginBottom: 10,
    },
    label: {
        textTransform: "uppercase",
        color: "#374151",
        marginBottom: 5,
        fontSize: 13,
        fontWeight: "600",
    },
    valor: {
        color: "#334155",
        fontSize: 20,
        fontWeight: "600",
    },
});

export default InformacionPaciente;
