import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Modal,
    TextInput,
    ScrollView,
    Button,
    Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Paciente from "./Paciente";

const Formulario = ({
    modalVisible,
    setModalVisible,
    nuevaCita,
    setPacientes,
    pacientes,
    paciente,
    setPaciente,
}) => {
    const [nombre, setNombre] = useState("");
    const [propietario, setPropietario] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    // const [fecha, setFecha] = useState(new Date());
    // const [hora, setHora] = useState("");
    const [sintomas, setSintomas] = useState("");

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);

    // const onChange = (event, selectedDate) => {
    //     const currentDate = selectedDate;
    //     setShow(false);
    //     setDate(currentDate);
    // };

    useEffect(() => {
        if (Object.keys(paciente).length > 0) {
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setTelefono(paciente.telefono);
            setDate(paciente.date);
            setSintomas(paciente.sintomas);
        }
    }, [paciente]);

    const handleCita = () => {
        if ([nombre, propietario, email, date, sintomas].includes("")) {
            // recibe 3 argumentos 1 encabezado 2 cuerpo 3 texto del boton
            // Hay que importart ALERT propio de react
            Alert.alert("Error", "Existe campos vacios", [
                {
                    text: "OK",
                },
                // {
                //     text: "Oki 2",
                // },
            ]);
            return;
        }

        const nuevoPaciente = {
            nombre,
            propietario,
            email,
            telefono,
            date,
            sintomas,
        };

        //Revisar si es un registro nuevo o edicion
        if (paciente.id) {
            //Editando
            nuevoPaciente.id = paciente.id;
            const pacientesActualizados = pacientes.map((pacienteState) => {
                return pacienteState.id === nuevoPaciente.id
                    ? nuevoPaciente
                    : pacienteState;
            });

            setPacientes(pacientesActualizados);
            setPaciente({});
        } else {
            //Nuevo Registro
            nuevoPaciente.id = Date.now();

            setPacientes([...pacientes, nuevoPaciente]);
        }

        console.log(nuevoPaciente);

        setModalVisible(!modalVisible);

        setNombre("");
        setPropietario("");
        setEmail("");
        setTelefono("");
        setDate(new Date());
        setSintomas("");
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode("date");
    };

    // const showTimepicker = () => {
    //     showMode("time");
    // };
    return (
        <Modal animationType="slide" visible={modalVisible}>
            <View style={styles.container}>
                <ScrollView>
                    <View>
                        
                        <Text style={styles.titulo}>
                        {paciente.id ? 'Editar' : 'Nueva' } 
                            <Text style={styles.tituloBold}> Cita</Text>
                        </Text>
                    </View>
                    <View>
                        <Pressable
                            style={styles.btnCancelar}
                            onPress={() => {
                                setPaciente({});
                                setModalVisible(!modalVisible);
                                setNombre("");
                                setPropietario("");
                                setEmail("");
                                setTelefono("");
                                setDate(new Date());
                                setSintomas("");
                            }}
                        >
                            <Text style={styles.btnCancelarTexto}>
                                X Cancelar
                            </Text>
                        </Pressable>
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.label}>Nombre Paciente</Text>
                        <TextInput
                            style={styles.input}
                            value={nombre}
                            placeholder="Nombre Paciente"
                            placeholderTextColor={"#666"}
                            onChangeText={setNombre}
                        />
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.label}>Nombre Propietario</Text>
                        <TextInput
                            style={styles.input}
                            value={propietario}
                            placeholder="Nombre Propietario"
                            placeholderTextColor={"#666"}
                            onChangeText={setPropietario}
                        />
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.label}>Email Propietario</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            placeholder="Email"
                            placeholderTextColor={"#666"}
                            keyboardType="email-address"
                            onChangeText={setEmail}
                        />
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.label}>Teléfono Propietario</Text>
                        <TextInput
                            style={styles.input}
                            value={telefono}
                            placeholder="Teléfono Propietario"
                            placeholderTextColor={"#666"}
                            keyboardType="phone-pad"
                            maxLength={10}
                            onChangeText={setTelefono}
                        />
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.label}>Fecha de Alta</Text>
                        <Text style={styles.input} onPress={showDatepicker}>
                            {" "}
                            {date.toLocaleDateString()}
                        </Text>
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                onChange={(event, selectedDate) => {
                                    const currentDate = selectedDate || date;
                                    setShow(false);
                                    setDate(currentDate);
                                }}
                            />
                        )}
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.label}>Síntomas</Text>
                        <TextInput
                            style={[styles.input, styles.sintomasInput]}
                            value={sintomas}
                            placeholder="Síntomas Paciente"
                            placeholderTextColor={"#666"}
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={setSintomas}
                        />
                    </View>
                    <View>
                        <Pressable
                            style={styles.btnNuevaCita}
                            onPress={handleCita}
                        >
                            <Text style={styles.btnNuevaCitaTexto}>
                                {paciente.id ? "Editar Paciente" : "Agregar Paciente"}
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#6D28D9",

        // alignItems: "center",
        // justifyContent: "center",
    },
    titulo: {
        fontSize: 30,
        color: "white",
        fontWeight: "600",
        textAlign: "center",
        marginTop: 25,
    },
    tituloBold: {
        fontWeight: "900",
    },
    btnCancelar: {
        marginTop: 20,
        backgroundColor: "#5827A4",
        marginHorizontal: 30,
        marginVertical: 30,
        padding: 10,
        borderRadius: 10,
        // borderWidth: 2,
        borderColor: "#fff",
    },
    btnCancelarTexto: {
        textAlign: "center",
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 16,
    },
    campo: {
        marginTop: 10,
        marginHorizontal: 30,
    },
    label: {
        color: "white",
        marginBottom: 10,
        marginTop: 15,
        fontSize: 20,
        fontWeight: "600",
    },
    input: {
        backgroundColor: "#FFF",
        padding: 10,
        borderRadius: 10,
    },
    sintomasInput: {
        height: 100,
    },
    btnNuevaCita: {
        marginTop: 20,
        backgroundColor: "#F59e0b",
        marginHorizontal: 30,
        marginVertical: 30,
        padding: 15,
        borderRadius: 10,
        // borderWidth: 2,
        // borderColor: "#fff",
    },
    btnNuevaCitaTexto: {
        textTransform: "uppercase",
        textAlign: "center",
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 16,
    },
});
export default Formulario;
