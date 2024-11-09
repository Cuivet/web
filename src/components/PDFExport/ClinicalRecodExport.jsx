import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image,Font } from '@react-pdf/renderer';
import CUIVET_logo from "../../assets/img/png/logo2.png";
import paw_logo from "../../assets/img/png/paw.png";
import RobotoFont from '../../assets/fonts/Roboto/Roboto-Regular.ttf'; 
import RobotoBold from '../../assets/fonts/Roboto/Roboto-Bold.ttf'; 

Font.register({
    family: 'Roboto',
    src: RobotoFont,
  });
Font.register({
   family: 'Roboto-Bold',
   src: RobotoBold,  // Fuente Roboto-Bold
});

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 30,
        fontFamily: 'Roboto',
    },
    header: {
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        flexDirection: 'row', // Cambiado a fila para alinear elementos
        justifyContent: 'space-between', // Espaciado entre el logo y el título
        alignItems: 'center', // Alinear elementos al centro verticalmente
    },
    leftContainer: {
        flexDirection: 'column', // Mantener el contenido en columna
    },
    rowContainer: {
        flexDirection: 'column', // Alinear filas en columna
        marginBottom: 10, // Espacio entre las filas y el logo
    },
    rightContainer: {
        flexDirection: 'row', // Alinear logo y texto en fila
        alignItems: 'center', // Centrar verticalmente
        marginLeft: 'auto', // Empujar el contenedor a la derecha
    },
    logo: {
        width: 50, // Ancho del logo
        height: 50, // Alto del logo
        marginRight: 5, // Espacio entre logo y texto
    },
    cuivetText: {
        fontSize: 12,
        color: '#5b2569',
        fontFamily: 'Roboto',
    },
    rowHeader: {
        flexDirection: 'row', // Alinear elementos en fila
        justifyContent: 'flex-start', // Alinear a la izquierda
        marginVertical: 3, // Espacio vertical entre filas
    },
    detailTextHeader: {
        fontSize: 10,
        textDecorationLine: 'underline',
        fontWeight: 'bold', // Negrita
        fontFamily: 'Roboto-Bold',
    },
    detailTextHeaderBD: {
        fontSize: 10,
        fontWeight: 'bold', // Negrita
        fontFamily: 'Roboto',
    },
    headerTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#5b2569',
        marginBottom: 5, // Espacio debajo del título
        fontFamily: 'Roboto-Bold',
    },
    content: {
        paddingBottom: 40, // Espacio para el footer
      },
    footer: {
         marginTop: 8,
         paddingTop: 3,
         borderTopWidth: 0.25,
         borderTopColor: 'black',
        marginBottom: 2,
        justifyContent: 'flex-start',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: 'center',
        padding: 10,
        fontSize: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 28,   // Margen de aproximadamente 1 cm a la izquierda
        paddingRight: 28,
        fontFamily: 'Roboto',
        
    },
    footerText: {
        fontSize: 8,
        color: '#000',
        fontFamily: 'Roboto',
    },
    footerPage:{
        position: 'absolute',
        bottom: 10,
        right: 20,
        fontSize: 8,
        color: '#000',
      },
 
    infoTitle: {
        fontSize: 12,
        margin: 10,
        padding: 5,
        backgroundColor: '#5b2569', 
        textAlign: 'center',
        borderRadius: 5,
        color: 'white', 
        fontWeight: 'bold',
        fontFamily: 'Roboto',
    },
    infoSubTitle: {
        fontSize: 12,
        backgroundColor: '#e9c4f2',  // Mantener el fondo
        color: '#5b2569', 
        fontWeight: 'bold',
        margin: 8,
        padding: 3,
        borderRadius: 5,
        alignSelf: 'flex-start', // Esto se aplica al contenedor, no al estilo del texto
        fontFamily: 'Roboto-Bold',
    },
    infoSubTitleStep: {
        fontSize: 11,
         marginVertical: 2, // Ajustado para reducir separación vertical 
        color: '#5b2569', // Color personalizado 
        fontWeight: 'bold', // Negrita 
        marginLeft: 5, // Asegúrate de que 'left' esté en minúsculas 
        textAlign: 'left', 
        marginTop: 0,
        fontFamily: 'Roboto',
    },
    infoStep: {
        fontSize: 12,
        marginVertical: 2,
        padding: 3,
        backgroundColor: '#5b2569', 
        textAlign: 'left',
        borderRadius: 5,
        color: 'white', 
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        fontFamily: 'Roboto',
    },
    infoStep2: {
        fontSize: 12,
        margin: 2,
        padding: 3,
        backgroundColor: '#5b2569', 
        textAlign: 'left',
        borderRadius: 5,
        color: 'white', 
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        fontFamily: 'Roboto',
    },
    table: {
        display: 'table',
        width: 'auto',
        margin: 10,
    },
    tableRow: {
        flexDirection: 'row',
        width: '100%',
    },
    tableTotalCol: {
        width: '100%',
        paddingHorizontal: 5,
    },
    tableCol: {
        width: '50%',
        paddingHorizontal: 5,
    },
    tableFourCol: {
        width: '25%',
        paddingHorizontal: 5,
    },
    tableCell: {
        margin: 5,
        fontSize: 10,
    },
    photoBox: {
        // estilos del cuadro de foto
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderWidth: 1,
        borderColor: '#000',
    },
    photoImage: {
        width: 100,  // Ajusta el ancho según sea necesario
        height: 100, // Ajusta la altura según sea necesario
        objectFit: 'cover', // Recorta la imagen si es necesario
    },
    detailsContainer: {
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center',
    },
    detailColumnContainer: {
        flexDirection: 'row',
        flex: 1,
        marginLeft: 10,
    },
    detailColumn: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
    },
    detailTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        fontFamily: 'Roboto',
    },
    detailText: {
        fontSize: 10,
        marginRight: 5,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Bold',
        // borderBottomWidth: 1, // Grosor de la línea de subrayado 
        // borderBottomColor: '#5b2569', // Color de la línea de subrayado width: '100%',
    },
    detailTextControl: {
        fontSize: 10,
        marginRight: 5,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Bold',
        marginLeft:76,
    },
    detailTextBD: {
        fontSize: 10,
        marginRight: 5,
        fontFamily: 'Roboto',
    },
    detailValue: {
        fontSize: 10,
        marginRight: 5,
        fontFamily: 'Roboto',
    },
    thickLine: {
        height: 2,             // Altura de la línea gruesa
        backgroundColor: '#5b2569', // Color de la línea
        marginVertical: 5,     // Espacio arriba y abajo de la línea
    },
    visitText: {
        fontSize: 12,
        color: '#5b2569',  // Color del texto
        textAlign: 'left', // Centra el texto
        marginVertical: 5,  // Espaciado vertical para el texto
        fontWeight: 'bold',
        fontFamily: 'Roboto',
    },

    questionText: {
        fontSize: 10,
        marginRight: 5,
        marginBottom: 8,
        fontFamily: 'Roboto-Bold',
        marginLeft: 20
    },
    bullet: {
        width: 5,
        height: 5,
        borderRadius: 4, // Crea un círculo
        backgroundColor: '#5b2569', // Color de la viñeta
        marginRight: 8, // Espaciado entre viñeta y texto
    },
    itemContainer: {
        flexDirection: 'row', // Alinea horizontalmente viñeta y texto
        alignItems: 'center', // Centra verticalmente los elementos
        marginBottom: 5, // Espaciado entre ítems
    },
   
    responseText: { fontSize: 10, marginBottom: 10 , marginLeft: 25 ,fontFamily: 'Roboto'},
    row: { flexDirection: 'row', alignItems: 'flex-start' },
});

const formatDate = (date) => {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = String(date.getFullYear());
    return dd + "/" + mm + "/" + yyyy;
};

const formatDate2 = (dateString) => { 
    const date = new Date(dateString); 
    const dd = String(date.getDate()).padStart(2, '0'); const mm = String(date.getMonth() + 1).padStart(2, '0'); 
    const yyyy = String(date.getFullYear()); 
    return `${dd}/${mm}/${yyyy}`; };

const getAgeContent = (birth) => { 
        const today = new Date(); 
        const birthDate = new Date(birth); 
        let years = today.getFullYear() - birthDate.getFullYear(); // Ajustar los meses si la fecha de nacimiento es más tarde en el año 
        const monthDiff = today.getMonth() - birthDate.getMonth(); 
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
             years--; } 
             if (years > 0) 
             { return years === 1 ? "1 año" : `${years} años`; } 
        else { 
            const months = today.getMonth() - birthDate.getMonth() + (12 * (today.getFullYear() - birthDate.getFullYear())); 
            return months === 1 ? "1 mes" : `${months} meses`; } 
        };

    const getSpecie = (petRace, species) => {
        // Comprueba si petRace existe
        if (petRace) {
            // Busca la especie que coincida con el specieId de la raza
            const specie = species.find(specie => specie.id === petRace.specieId);
            return specie ? specie.name : "Especie no encontrada"; // Retorna el nombre de la especie o un mensaje si no se encuentra
        }
        return "Raza no encontrada"; // Si no hay petRace
    };
        
// Crear el componente Footer
const Header = ({ clinicalRecord }) => (
    <View style={styles.header}>
        {/* Contenedor para el título y la información del veterinario y clínica */}
        <View style={styles.leftContainer}>
            <Text style={styles.headerTitle}>FICHA CLÍNICA {clinicalRecord.id}</Text>
            <View style={styles.rowContainer}>
                <View style={styles.rowHeader}>
                    <Text style={styles.detailTextHeader}>Veterinario: </Text>
                    <Text style={styles.detailTextHeaderBD}>
                        {clinicalRecord.veterinaryData.person.name} {clinicalRecord.veterinaryData.person.lastName}{' '}
                        <Text style={styles.detailTextHeader}>MP:</Text> {clinicalRecord.veterinaryData.tutor.mp}
                    </Text>
                </View>
                <View style={styles.rowHeader}>
                    <Text style={styles.detailTextHeader}>Clínica: </Text>
                    <Text style={styles.detailTextHeaderBD}>{clinicalRecord.vet.name}</Text>
                </View>
            </View>
        </View>

        {/* Contenedor para el logo y texto adicional alineado a la derecha */}
        <View style={styles.rightContainer}>
            <Image source={{ uri: CUIVET_logo }} style={styles.logo} />
            <Text style={styles.cuivetText}>CUIVET</Text>
        </View>
    </View>
);

const Footer = ({ formattedDate }) => (
    <View style={styles.footer} fixed>
      <Text style={styles.footerText}>Fecha de emisión: {formattedDate}</Text>
    </View>
  );

  
const VisitList = ({ visits }) => (
    <React.Fragment>
        {visits.map((visit, index) => (
            <View key={visit.id}>
                <Text style={styles.infoSubTitle}>VISITA {index + 1} - {formatDate2(visit.createdAt)}</Text>
                <Text style={styles.detailTextBD}>
                    <Text style={styles.detailTextControl}>Control: </Text>
                    {visit.control || "(No se ingresó)"}
                </Text>
                <View style={styles.thickLine} />
            </View>
        ))}
    </React.Fragment>
);

const bodyCondition = (bodyCondition)=> {
    if (bodyCondition === 1) return "Muy Flaco";
    if (bodyCondition === 2) return "Flaco";
    if (bodyCondition === 3) return "Normal";
    if (bodyCondition === 4) return "Exceso de Peso";
    if (bodyCondition === 5) return "Obeso";
    
    // Valor por defecto si no coincide con los casos esperados
    return "Condición no especificada";
}

const drugName =  (drugID,drugs) => {
    for (let i = 0; i < drugs.length; i++) {
        if (drugID === drugs[i].id) {
          return drugs[i].name;
        }
      }
      // Valor por defecto si no coincide con los casos esperados
      return "Condición no especificada";
}

const getTreatmentOptionName = (treatmentOptionId, treatmentOptions) => {
    // Verificar si treatmentOptions es un array válido
    if (!Array.isArray(treatmentOptions) || treatmentOptions.length === 0) {
        return "Tratamiento desconocido"; // Devuelve un valor por defecto si está vacío o indefinido
    }
    for (let option of treatmentOptions) {
        if (option.id === treatmentOptionId) {
            return option.name;
        }
    }
    return "Tratamiento desconocido"; // Valor por defecto si no se encuentra coincidencia
};

const typeTreatmentName = (typeTreatmentId, selectedTreatmentTypeId) => {
    // Verificar si selectedTreatmentTypeId es un array válido
    if (!Array.isArray(selectedTreatmentTypeId) || selectedTreatmentTypeId.length === 0) {
        return "Condición no especificada"; // Devuelve un valor por defecto si está vacío o indefinido
    }
    for (let type of selectedTreatmentTypeId) {
        if (type.id === typeTreatmentId) {
            return type.name;
        }
    }
    return "Condición no especificada"; // Valor por defecto si no se encuentra coincidencia
};



const ClinicalRecordExport = ({ petName, clinicalRecord ,questions,races,petRace, species,petHairColor,petHairLenght,petSize,
                                drugs,drugTypes,treatmentOptions,selectedTreatmentTypeId}
                                ) => {
    const date = new Date();
    const formattedDate = formatDate(date);
    const perrito = "https://firebasestorage.googleapis.com/v0/b/cuivet-5596d.appspot.com/o/pets%2FMon%20Oct%2028%202024%2017%3A26%3A48%20GMT-0300%20(hora%20est%C3%A1ndar%20de%20Argentina)?alt=media&token=3e0637db-d130-4ab3-8337-98ece9f668c1";
    const { anamnesis } = clinicalRecord || {};
    const { anamnesisItems = [] } = anamnesis || {};
    const { presumptiveDiagnosis } = clinicalRecord || {};
    const { presumptiveDiagnosisItems = [] } = presumptiveDiagnosis || {};



    const renderVisits = (visits) => (
        <>
            {visits.map((visit, index) => (
                <View key={visit.id}>
                    <View style={styles.thickLine} />
                    <Text style={styles.infoSubTitle}>VISITA {index + 1} - {formatDate(visit.createdAt)}</Text>

                    <Text style={styles.detailText}>Fecha de Visita: {formatDate(visit.createdAt)}</Text>
                    <Text style={styles.detailText}>Control: {visit.control || "Sin Control"}</Text>
                </View>
            ))}
        </>
    );
    return (
        <Document>
            <Page style={styles.page}>
            <Header clinicalRecord = {clinicalRecord} />
            
                <View>
                    <Text style={styles.infoTitle}>INFORMACIÓN DEL TUTOR</Text>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailText}>Nombre y Apellido:</Text>
                                <Text style={styles.detailTextBD}>{clinicalRecord.tutorData.person.name} {clinicalRecord.tutorData.person.lastName}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.tableCol}>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailText}>DNI:</Text>
                                <Text style={styles.detailTextBD}>{clinicalRecord.tutorData.person.dni}</Text>
                                
                            </View>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailText}>Teléfono:</Text>
                                <Text style={styles.detailTextBD}>{clinicalRecord.tutorData.person.phone}</Text>
                            </View>
                        </View>
                        <View style={styles.tableCol}>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailText}>Dirección: </Text>
                                <Text style={styles.detailTextBD}>{clinicalRecord.tutorData.person.address}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.infoTitle}>INFORMACIÓN DE LA MASCOTA</Text>
                    <View style={styles.detailsContainer}> 
                        {/* {clinicalRecord.pet.photo ? ( 
                            <View style={styles.photoBox}> 
                                <Image 
                                    style={styles.photoImage} 
                                    src = {perrito}
                                    // src={{ uri: clinicalRecord.pet.photo }} 
                                /> 
                            </View> 
                        ) : ( 
                            <View style={styles.photoBox}> 
                                <Image style={styles.photoImage} 
                                src={paw_logo} /> 
                            </View> )} */}
                    
                        <View style={styles.detailColumnContainer}>
                            <View style={styles.detailColumn}>
                                <View style={styles.detailTextContainer}>
                                    <Text style={styles.detailText}>Nombre: </Text>
                                    <Text style={styles.detailTextBD}>{clinicalRecord.pet.name}</Text>
                                </View>
                                <View style={styles.detailTextContainer}>
                                    <Text style={styles.detailText}>Fecha de nacimiento:</Text>
                                    <Text style={styles.detailTextBD}>{formatDate2(clinicalRecord.pet.birth)}</Text>
                                </View>
                                <View style={styles.detailTextContainer}>
                                    <Text style={styles.detailText}>Edad:</Text>
                                    <Text style={styles.detailTextBD}>{getAgeContent(clinicalRecord.pet.birth)}</Text>
                                </View>
                                <View style={styles.detailTextContainer}>
                                    <Text style={styles.detailText}>Sexo:</Text>
                                    <Text style={styles.detailTextBD}>{clinicalRecord.pet.isMale ? 'Macho' : 'Hembra'}</Text>
                                </View>
                                <View style={styles.detailTextContainer}>
                                    <Text style={styles.detailText}>Tiene chip:</Text>
                                    <Text style={styles.detailTextBD}>{clinicalRecord.pet.haveChip ? 'Si' : 'No'}</Text>
                                </View>
                            </View>

                            <View style={styles.detailColumn}>
                                <View style={styles.detailTextContainer}>
                                    <Text style={styles.detailText}>Especie:</Text>
                                    <Text style={styles.detailTextBD}>{getSpecie(petRace, species)}</Text>
                                    
                                </View>
                                <View style={styles.detailTextContainer}>
                                    <Text style={styles.detailText}>Raza:</Text>
                                    {petRace ? (
                                      <>
                                        <Text style={styles.detailTextBD}>{petRace.name}</Text>
                                      </>
                                    ) : (
                                      <Text style={styles.detailTextBD}>Raza desconocida</Text>
                                    )}
                                </View>
                                <View style={styles.detailTextContainer}>
                                    <Text style={styles.detailText}>Color pelaje:</Text>
                                    {petHairColor ? (
                                      <>
                                        <Text style={styles.detailTextBD}>{petHairColor.name}</Text>
                                      </>
                                    ) : (
                                      <Text style={styles.detailTextBD}>Sin color ingresado</Text>
                                    )}
                                </View>
                                <View style={styles.detailTextContainer}>
                                    <Text style={styles.detailText}>Largo pelaje:</Text>
                                    {petHairLenght ? (
                                      <>
                                        <Text style={styles.detailTextBD}>{petHairLenght.name}</Text>
                                      </>
                                    ) : (
                                      <Text style={styles.detailTextBD}>Sin largo ingresado</Text>
                                    )}
                                </View>
                                <View style={styles.detailTextContainer}>
                                    <Text style={styles.detailText}>Tamaño:</Text>
                                    {petSize ? (
                                      <>
                                        <Text style={styles.detailTextBD}>{petSize.name}</Text>
                                      </>
                                    ) : (
                                      <Text style={styles.detailTextBD}>Sin tamaño ingresado</Text>
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.thickLine} />
                <VisitList visits={clinicalRecord.visits} />
                <View>
                    <Text style={styles.infoStep}>ANAMNESIS</Text>
                    {questions.map((question) => {
                        // Busca el `anamnesisItem` con el mismo `id` que `question.id`
                        const anamnesisItem = anamnesisItems.find(
                            (item) => item.id === question.id
                        );
                        
                        // Verifica si se encontró el anamnesisItem y sus respuestas
                        const booleanResponse = anamnesisItem ? anamnesisItem.booleanResponse : null;
                        const textResponse = anamnesisItem ? anamnesisItem.textResponse : null;
                        
                        // Determina el texto a mostrar según el valor de booleanResponse
                        let responseText;
                        
                        if (booleanResponse === 0) {
                            // Si booleanResponse es 0 (SI), muestra la respuesta y el texto asociado si existe
                            responseText = textResponse ? `    SI - ${textResponse}` : "    SI  ";
                        } else if (booleanResponse === 1) {
                            // Si booleanResponse es 1 (NO), muestra "NO"
                            responseText = "    NO";
                        } else {
                            // Si no hay respuesta (ni booleanResponse ni textResponse), muestra "Sin respuesta"
                            responseText = "    Sin respuesta";
                        }

                        return (
                            <React.Fragment key={question.id}>
                            <View style={styles.row}></View>
                            <Text style={styles.questionText}>
                                {`${question.id} - ${question.question}`}
                            </Text>
                            <Text style={styles.responseText}>
                                {responseText}
                            </Text>
                        </React.Fragment>
                    );
                })}
                    {/* <View style={styles.table}>
                
                </View> */}
                    
                <View style={styles.thickLine} />
                <Text style={styles.infoStep}>EXAMEN FÍSICO</Text>
                    <View style={styles.table}>
                    
                    <View style={styles.tableRow}>
                       
                        <View style={styles.tableFourCol}>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailText}>Temperatura: </Text>
                                {clinicalRecord.physicalExam && clinicalRecord.physicalExam.temperature && ( 
                                <Text style={styles.detailTextBD}>{clinicalRecord.physicalExam.temperature} °C</Text> )}
                            </View>
                        </View>
                        <View style={styles.tableFourCol}>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailText}>Peso: </Text>
                                {clinicalRecord.physicalExam && clinicalRecord.physicalExam.weight && ( 
                                <Text style={styles.detailTextBD}>{clinicalRecord.physicalExam.weight} Kg</Text> )}
                            </View>
                        </View>
                        <View style={styles.tableFourCol}>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailText}>Pulso: </Text>
                                {clinicalRecord.physicalExam && clinicalRecord.physicalExam.pulse && ( 
                                <Text style={styles.detailTextBD}>{clinicalRecord.physicalExam.pulse} lpm</Text> )}
                            </View>
                        </View>
                        <View style={styles.tableFourCol}>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailText}>Mucosa: </Text>
                                {clinicalRecord.physicalExam && clinicalRecord.physicalExam.mucousMembrane && ( 
                                <Text style={styles.detailTextBD}>{clinicalRecord.physicalExam.mucousMembrane}</Text> )}
                            </View>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableTotalCol}>

                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailText}>Condición corporal:</Text>
                                {clinicalRecord.physicalExam && clinicalRecord.physicalExam.bodyCondition && ( 
                                <Text style={styles.detailTextBD}>{bodyCondition(clinicalRecord.physicalExam.bodyCondition)}</Text>)}
                                
                            </View>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailText}>Observación:</Text>
                                {clinicalRecord.physicalExam && clinicalRecord.physicalExam.observation && ( 
                                <Text style={styles.detailTextBD}>{clinicalRecord.physicalExam.observation}</Text> )}
                            </View>
                        </View>
                        
                    </View>
                    </View>
                    <View style={styles.thickLine} />
                    <Text style={styles.infoStep}>DIAGNÓSTICO PRESUNTIVO</Text>
                    <View style={styles.table}>
                    <View style={styles.tableRow}>
                       
                        <View style={styles.tableTotalCol}>
                        {presumptiveDiagnosisItems.length > 0 ? (
                            presumptiveDiagnosisItems.map(item => (
                                <View key={item.id} style={styles.itemContainer}>
                                    <View style={styles.bullet} /> {/* Viñeta */}
                                    <Text style={styles.detailTextBD}>{item.observation}</Text>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.detailTextBD}>No hay diagnósticos presuntivos disponibles.</Text>
                        )}
                        </View>                        
                    </View>
                    </View>   
                    <View style={styles.thickLine} />
                    <Text style={styles.infoStep}>DIAGNÓSTICO FINAL</Text>
                    <View style={styles.table}>
                    <View style={styles.tableRow}>
                       
                        <View style={styles.tableTotalCol}>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailText}>Diagnóstico Final: </Text>
                                {clinicalRecord.diagnosis && clinicalRecord.diagnosis.diagnosisItems && clinicalRecord.diagnosis.diagnosisItems.length > 0 && (
                                    clinicalRecord.diagnosis.diagnosisItems.map(item => (
                                        <Text key={item.id} style={styles.detailTextBD}>
                                            {item.diagnosisResult}
                                        </Text>
                                    ))
                                )}
                            </View>
                        </View>                        
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableTotalCol}>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailText}>Observación: </Text>
                                {clinicalRecord.diagnosis && clinicalRecord.diagnosis.diagnosisItems && clinicalRecord.diagnosis.diagnosisItems.length > 0 && (
                                    clinicalRecord.diagnosis.diagnosisItems.map(item => (
                                        <Text key={item.id} style={styles.detailTextBD}>
                                            {item.observation}
                                        </Text>
                                    ))
                                )}
                            </View>
                        </View>
                    </View>
                    </View> 
                    <View style={styles.thickLine} />  
                    <Text style={styles.infoStep2}>TRATAMIENTO</Text>
                    <View style={styles.table}>
                       
        {clinicalRecord.diagnosis && clinicalRecord.diagnosis.diagnosisItems && clinicalRecord.diagnosis.diagnosisItems.length > 0 && (
            clinicalRecord.diagnosis.diagnosisItems.map(diagnosisItem => (
                <View key={diagnosisItem.id} style={styles.diagnosisContainer}>
                    
                    {/* Acceder a diagnosisItem.diagnosisItemTreatments en lugar de clinicalRecord.diagnosis.diagnosisItem.diagnosisItemTreatments */}
                    {diagnosisItem.diagnosisItemTreatments && diagnosisItem.diagnosisItemTreatments.length > 0 ? (
                         diagnosisItem.diagnosisItemTreatments.map((treatment, index) => (
                            <View key={treatment.id} style={styles.table}>
                                <View style={styles.tableRow}>
                                    {/* Usar el índice del map para mostrar el número de tratamiento */}
                                    <Text style={styles.infoSubTitleStep}>Tratamiento N° {index + 1}</Text>
                                </View>
                                {/* Fila 1: Tipo de tratamiento y Nombre del tratamiento */}
                                <View style={styles.tableRow}>
                                    <View style={styles.tableTotalCol}>
                                        <View style={styles.detailTextContainer}>
                                            <Text style={styles.detailText}>Tipo de tratamiento:</Text>
                                            <Text style={styles.detailTextBD}>
                                            {typeTreatmentName(treatment.treatmentOptionId, selectedTreatmentTypeId)}
                                            </Text>
                                            <View style={styles.detailLine} />
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.tableRow}>
                                    <View style={styles.tableCol}>
                                        <View style={styles.detailTextContainer}>
                                            <Text style={styles.detailText}>Nombre del tratamiento:</Text>
                                            <Text style={styles.detailTextBD}>
                                                {getTreatmentOptionName(treatment.treatmentOptionId, treatmentOptions)}
                                            </Text>
                                            <View style={styles.detailLine} />
                                        </View>
                                        
                                    </View>
                                    <View style={styles.tableCol}>
                                        <View style={styles.detailTextContainer}>
                                            <Text style={styles.detailText}>Droga:</Text>
                                            <Text style={styles.detailTextBD}>{drugName(treatment.drugId,drugs)}</Text>
                                            <View style={styles.detailLine} />
                                        </View>
                                    </View>
                                    
                                </View>
                                
                                {/* Fila 2: Intervalo y Duración */}
                                <View style={styles.tableRow}>
                                    <View style={styles.tableCol}>
                                        <View style={styles.detailTextContainer}>
                                            <Text style={styles.detailText}>Intervalo:</Text>
                                            <Text style={styles.detailTextBD}>{treatment.frecuencyInterval} horas</Text>
                                            <View style={styles.detailLine} />
                                        </View>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <View style={styles.detailTextContainer}>
                                            <Text style={styles.detailText}>Duración:</Text>
                                            <Text style={styles.detailTextBD}>{treatment.frecuencyDuration} días</Text>
                                            <View style={styles.detailLine} />
                                        </View>
                                    </View>
                                </View>

                                {/* Fila 3: Droga */}
                                
                            </View>
                            ))
                    ) : (
                        /* Si no hay tratamientos, muestra un mensaje alternativo o deja el campo vacío */
                        <Text style={styles.noTreatmentText}>Sin tratamientos asignados</Text>
                    )}
                </View>
            ))
        )}
                    </View> 
                    <View style={styles.thickLine} />  
                    <Text style={styles.infoStep}>PRONÓSTICO</Text>
                    <View style={styles.table}>
                    <View style={styles.tableRow}>
                       
                        <View style={styles.tableTotalCol}>
                            <View style={styles.detailTextContainer}>
                                {clinicalRecord.prognosis && clinicalRecord.prognosis.observation && ( 
                                <Text style={styles.detailTextBD}>{clinicalRecord.prognosis.observation}</Text> )}
                            </View>
                        </View>
                                                   
                    </View>

                    </View> 
                    {/* <View style={styles.thickLine} />   */}
                </View>
                <Footer formattedDate={formattedDate} />
                <Text
                  style={styles.footerPage}
                  render={({ pageNumber, totalPages }) => `Página ${pageNumber} de ${totalPages}`}
                  fixed
                />
            </Page>
        </Document>
    );
};

export default ClinicalRecordExport;
