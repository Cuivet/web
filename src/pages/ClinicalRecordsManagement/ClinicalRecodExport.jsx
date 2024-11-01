import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import CUIVET_logo from "../../assets/img/png/logo2.png";
import paw_logo from "../../assets/img/png/paw.png";


const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 30,
    },
    header: {
        position: 'fixed',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        paddingBottom: 10,
        borderBottomWidth: 0.25,
        borderBottomColor: 'black',
        marginTop: 8,
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 20,
        height: 'auto',
    },
    cuivetText: {
        fontSize: 10,
        marginLeft: 5,
    },
    footer: {
        position: 'fixed',
        marginTop: 'auto',
        paddingTop: 3,
        borderTopWidth: 0.25,
        borderTopColor: 'black',
        marginBottom: 2,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    footerText: {
        fontSize: 7,
    },
    centerText: {
        fontSize: 16,
        textAlign: 'center',
        flex: 1,
        marginLeft: 50,
        marginRight: 50,
    },
    infoTitle: {
        fontSize: 14,
        margin: 10,
        padding: 5,
        backgroundColor: '#5b2569', 
        textAlign: 'center',
        borderRadius: 5,
        color: 'white', 
        fontWeight: 'bold',
    },
    infoSubTitle: {
        fontSize: 14,
        backgroundColor: '#e9c4f2',  // Mantener el fondo
        color: '#5b2569', 
        fontWeight: 'bold',
        margin: 10,
        padding: 5,
        // Eliminar margin y padding
        // width: 'auto', // No necesitas esto ya que el ancho se ajusta automáticamente
        alignSelf: 'flex-start', // Esto se aplica al contenedor, no al estilo del texto
    },
    infoStep: {
        fontSize: 12,
        margin: 5,
        padding: 3,
        backgroundColor: '#5b2569', 
        textAlign: 'left',
        borderRadius: 5,
        color: 'white', 
        fontWeight: 'bold',
        alignSelf: 'flex-start',
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
    },
    detailText: {
        fontSize: 10,
        marginRight: 5,
        borderBottomWidth: 1, // Grosor de la línea de subrayado 
        borderBottomColor: '#5b2569', // Color de la línea de subrayado width: '100%',
    },
    detailTextBD: {
        fontSize: 10,
        marginRight: 5,
    },
    detailValue: {
        fontSize: 10,
        marginRight: 5,
    },
    thickLine: {
        height: 2,             // Altura de la línea gruesa
        backgroundColor: '#5b2569', // Color de la línea
        marginVertical: 5,     // Espacio arriba y abajo de la línea
    },
    visitText: {
        fontSize: 15,
        color: '#5b2569',  // Color del texto
        textAlign: 'left', // Centra el texto
        marginVertical: 5,  // Espaciado vertical para el texto
        fontWeight: 'bold',
    },
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
// Crear el componente Footer
const Header = () => ( 
<View style={styles.header}> 
    <Text>FICHA CLÍNICA</Text> 
    <View style={styles.rightContainer}> 
        <Image src={CUIVET_logo} style={styles.logo} /> 
        <Text style={styles.cuivetText}>CUIVET</Text> 
    </View> 
</View> ); 

const Footer = ({ formattedDate }) => ( 
<View style={styles.footer}> 
    <Text style={styles.footerText}>Fecha de emisión: {formattedDate}</Text> 
</View> );

const VisitList = ({ visits }) => (
    <React.Fragment>
        {visits.map((visit, index) => (
            <View key={visit.id}>
                <Text style={styles.infoSubTitle}>VISITA {index + 1} - {formatDate2(visit.createdAt)}</Text>
                <Text style={styles.detailTextBD}>    Control: {visit.control || "(No se ingresó)"}</Text>
                <View style={styles.thickLine} />
            </View>
        ))}
    </React.Fragment>
);


const ClinicalRecordExport = ({ petName, clinicalRecord }) => {
    const date = new Date();
    const formattedDate = formatDate(date);
    const perrito = 'https://firebasestorage.googleapis.com/v0/b/cuivet-5596d.appspot.com/o/pets%2FMon%20Oct%2028%202024%2017%3A26%3A48%20GMT-0300%20(hora%20est%C3%A1ndar%20de%20Argentina)?alt=media&token=3e0637db-d130-4ab3-8337-98ece9f668c1';
    
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
            <Header />
            
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
                        {clinicalRecord.pet.photo ? ( 
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
                            </View> )}
                    
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
                                    {/* <Text style={styles.detailTextBD}>{clinicalRecord.pet.spicie}</Text> */}
                                </View>
                                <View style={styles.detailTextContainer}>
                                    <Text style={styles.detailText}>Raza:</Text>
                                    <View style={styles.detailLine} />
                                </View>
                                <View style={styles.detailTextContainer}>
                                    <Text style={styles.detailText}>Color pelaje:</Text>
                                    <View style={styles.detailLine} />
                                </View>
                                <View style={styles.detailTextContainer}>
                                    <Text style={styles.detailText}>Largo pelaje:</Text>
                                    <View style={styles.detailLine} />
                                </View>
                                <View style={styles.detailTextContainer}>
                                    <Text style={styles.detailText}>Tamaño:</Text>
                                    <View style={styles.detailLine} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.thickLine} />
                <VisitList visits={clinicalRecord.visits} />
                <View>
                    <Text style={styles.infoStep}>ANAMNESIS</Text>
                    <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableTotalCol}>
                            <View style={styles.detailTextContainer}>                            
                                <Text style={styles.detailText}>Lesiones expuestas:</Text>
                                </View>
                        </View>
                        
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailText}>Pulso: </Text>
                                <View style={styles.detailLine} />
                            </View>
                        </View>
                        <View style={styles.tableCol}>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailText}>Estado de mascota: </Text>
                                <View style={styles.detailLine} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableTotalCol}>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailText}>Observación: </Text>
                                <View style={styles.detailLine} />
                            </View>
                        </View>
                    </View>


                    
                </View>
                <View style={styles.thickLine} />
                <Text style={styles.infoStep}>EXÁMEN FÍSICO</Text>
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
                                <View style={styles.detailLine} />
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
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailText}>Diagnostico presuntivo: </Text>
                                <View style={styles.detailLine} />
                            </View>
                        </View>                        
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableTotalCol}>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailText}>Diagnostico diferencial: </Text>
                                <View style={styles.detailLine} />
                            </View>
                        </View>
                    </View>
                    </View>   
                    <View style={styles.thickLine} />
                    <Text style={styles.infoStep}>DIAGNÓSTICO FINAL</Text>
                    <View style={styles.table}>
                    <View style={styles.tableRow}>
                       
                        <View style={styles.tableTotalCol}>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailText}>Diagnostico Final: </Text>
                                <View style={styles.detailLine} />
                            </View>
                        </View>                        
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableTotalCol}>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailText}>Observación: </Text>
                                <View style={styles.detailLine} />
                            </View>
                        </View>
                    </View>
                    </View> 
                    <View style={styles.thickLine} />  
                    <Text style={styles.infoStep}>TRATAMIENTO</Text>
                    <View style={styles.table}>
                    <View style={styles.tableRow}>
                       
                        <View style={styles.tableCol}>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailText}>Tipo de tratamiento: </Text>
                                <View style={styles.detailLine} />
                            </View>
                        </View>
                        <View style={styles.tableCol}>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailText}>Nombre del tratamiento: </Text>
                                <View style={styles.detailLine} />
                            </View>
                        </View>                                
                    </View>
                    <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailText}>Intervalo: </Text>
                                <View style={styles.detailLine} />
                            </View>
                        </View>
                        <View style={styles.tableCol}>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailText}>Duración: </Text>
                                <View style={styles.detailLine} />
                            </View>
                        </View>       
                    </View>
                    <View style={styles.tableRow}>
                       
                        <View style={styles.tableTotalCol}>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailText}>Droga: </Text>
                                <View style={styles.detailLine} />
                            </View>
                        </View>                        
                    </View>
                    </View> 
                    <View style={styles.thickLine} />  
                    <Text style={styles.infoStep}>PRONÓSTICO</Text>
                    <View style={styles.table}>
                    <View style={styles.tableRow}>
                       
                        <View style={styles.tableCol}>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailText}>Observación: </Text>
                                {clinicalRecord.prognosis && clinicalRecord.prognosis.observation && ( 
                                <Text style={styles.detailTextBD}>{clinicalRecord.prognosis.observation}</Text> )}
                            </View>
                        </View>
                                                   
                    </View>
                    <View style={styles.thickLine} />  
                    </View> 
                      
                </View>
                {/* <View style={styles.footer}>
                    <Text style={styles.footerText}>Fecha de emisión: {formattedDate}</Text>
                </View> */}
              <Footer formattedDate={formattedDate} />  
            </Page>
        </Document>
    );
};

export default ClinicalRecordExport;
