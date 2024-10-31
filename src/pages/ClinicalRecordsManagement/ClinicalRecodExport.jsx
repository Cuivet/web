import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import CUIVET_logo from "../../assets/img/png/logo2.png";

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
        width: '3cm',
        height: '3cm',
        borderWidth: 1,
        borderColor: '#000',
        margin: 10,
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
    },
    detailValue: {
        fontSize: 10,
        marginRight: 5,
    },
    detailLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#e9c4f2',
        marginLeft: 5,
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
  

const ClinicalRecordExport = ({ petname, clinicalRecord }) => {
    const date = new Date();
    const formattedDate = formatDate(date);
    const { tutorData } = clinicalRecord;
    return (
        <Document>
            <Page style={styles.page}>
            <Header />
                {/* <View style={styles.header}>
                    <Text style={styles.centerText}>FICHA CLÍNICA</Text>
                    <View style={styles.rightContainer}>
                        <Image src={CUIVET_logo} style={styles.logo} />
                        <Text style={styles.cuivetText}>CUIVET</Text>
                    </View>
                </View> */}
                <View>
                    <Text style={styles.infoTitle}>INFORMACIÓN DEL TUTOR</Text>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailText}>Nombre y Apellido:</Text>
                                {/* <Text style={styles.detailValue}>{tutorData.person.name} {tutorData.person.lastName}</Text> */}
                                <View style={styles.detailLine} />
                            </View>
                        </View>
                        <View style={styles.tableCol}>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailText}>DNI:</Text>
                                {/* <Text>{tutorData.person.dni}</Text> */}
                                {/* <View style={styles.detailLine} /> */}
                            </View>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailText}>Teléfono:</Text>
                                <View style={styles.detailLine} />
                            </View>
                        </View>
                        <View style={styles.tableCol}>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailText}>Dirección: </Text>
                                <View style={styles.detailLine} />
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.infoTitle}>INFORMACIÓN DE LA MASCOTA</Text>
                    <View style={styles.detailsContainer}>
                        <View style={styles.photoBox}>
                            <Text>Foto</Text>
                        </View>
                        <View style={styles.detailColumnContainer}>
                            <View style={styles.detailColumn}>
                                <View style={styles.detailTextContainer}>
                                    <Text style={styles.detailText}>Nombre:</Text>
                                    <View style={styles.detailLine} />
                                </View>
                                <View style={styles.detailTextContainer}>
                                    <Text style={styles.detailText}>Fecha de nacimiento:</Text>
                                    <View style={styles.detailLine} />
                                </View>
                                <View style={styles.detailTextContainer}>
                                    <Text style={styles.detailText}>Edad:</Text>
                                    <View style={styles.detailLine} />
                                </View>
                                <View style={styles.detailTextContainer}>
                                    <Text style={styles.detailText}>Sexo:</Text>
                                    <View style={styles.detailLine} />
                                </View>
                            </View>

                            <View style={styles.detailColumn}>
                                <View style={styles.detailTextContainer}>
                                    <Text style={styles.detailText}>Especie:</Text>
                                    <View style={styles.detailLine} />
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
                <View style={styles.thickLine} />  {/* Línea gruesa debajo */}
                <Text style={styles.infoSubTitle}>VISITAS</Text>
                <View>
                    <Text style={styles.infoStep}>ANAMNESIS</Text>
                    <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableTotalCol}>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailText}>Lesiones expuestas:</Text>
                                <View style={styles.detailLine} />
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
                <Text style={styles.infoStep}>EXÁMEN FÍSICO</Text>
                    <View style={styles.table}>
                    
                    <View style={styles.tableRow}>
                       
                        <View style={styles.tableFourCol}>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailText}>Temperatura: </Text>
                                <View style={styles.detailLine} />
                            </View>
                        </View>
                        <View style={styles.tableFourCol}>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailText}>Peso: </Text>
                                <View style={styles.detailLine} />
                            </View>
                        </View>
                        <View style={styles.tableFourCol}>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailText}>Pulso: </Text>
                                <View style={styles.detailLine} />
                            </View>
                        </View>
                        <View style={styles.tableFourCol}>
                            <View style={styles.detailTextContainer}>
                                <Text style={styles.detailText}>Mucosa: </Text>
                                <View style={styles.detailLine} />
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
                                <View style={styles.detailLine} />
                            </View>
                        </View>
                        
                    </View>
                    </View>
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
