const formatearFecha = (date) => {
    const nuevaFecha = new Date(date);
    const opciones = {
        year: "numeric",
        month: "long",
        weekday: "long",
        day: "numeric",
    };

    return nuevaFecha.toLocaleDateString("es-ES", opciones);
};

export default formatearFecha;
