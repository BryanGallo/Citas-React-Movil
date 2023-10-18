import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import formatearFecha from "../helpers/formatearFecha.js";
const Paciente = ({
    item,
    setModalVisible,
    editarPaciente,
    pacienteEliminar,
    setModadlPaciente,
    setPaciente,
}) => {
    const { id, nombre, date } = item;
    return (
        <Pressable
            onPress={() => {
                setModadlPaciente(true);
                setPaciente(item);
            }}
        >
            <View style={styles.contenedor}>
                <Text style={styles.label}>Paciente:</Text>
                <Text style={styles.texto}>{nombre}</Text>
                <Text style={styles.fecha}>{formatearFecha(date)}</Text>
                <View style={styles.contenedorBotones}>
                    <Pressable
                        style={[styles.btn, styles.btnEditar]}
                        onPress={() => {
                            setModalVisible(true);
                            editarPaciente(id);
                        }}
                    >
                        <Text style={styles.btnTexto}>Editar</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.btn, styles.btnEliminar]}
                        onPress={() => {
                            pacienteEliminar(id);
                        }}
                    >
                        <Text style={styles.btnTexto}>Eliminar</Text>
                    </Pressable>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
    },
    label: {
        color: "#374151",
        textTransform: "uppercase",
        fontWeight: "700",
    },
    texto: {
        color: "#6D28D9",
        fontSize: 20,
        fontWeight: "600",
    },
    fecha: { color: "#374151" },
    contenedorBotones: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 15,
    },
    btn: {
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    btnEditar: {
        backgroundColor: "#F59e0b",
    },
    btnTexto: {
        textTransform: "uppercase",
        fontWeight: "600",
        fontSize: 12,
        color: "#fff",
    },
    btnEliminar: {
        backgroundColor: "#EF4444",
    },
});

export default Paciente;
