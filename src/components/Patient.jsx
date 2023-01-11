import { Alert, Pressable, StyleSheet, Text, View } from "react-native";


export const Patient = ({ item, patients, setPatients, setForm, setEditPatient }) => {

    const { name, date  } = item;

    const FormatDate = date => {
        
        const newDate = new Date( date );
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }

        return newDate.toLocaleDateString('en-EN', options);

    }

    const handleEdit = item => {
        setEditPatient( item );
        setForm( true );
        

    };

    const handleDelete = item => {

        Alert.alert(
            'Do you wish to delete?',
            'Cannot be recovered',
            [
                { text: 'Cancel'},
                { text: 'Yes, Delete', onPress: () => {

                    const deletePacient = patients.filter( pat => pat.id !== item.id );
                    setPatients(deletePacient);

                }}
            ]
            
        )

    }

  return (
    
        <View style={ styles.container }>

            <Text style={ styles.textLabel }>Patient:</Text>
            <Text style={ styles.textItem }>{ name }</Text>

            <Text style={ styles.textDate }>{ FormatDate(date) }</Text>

            <View style={ styles.containerBtn }>

                <Pressable style={ styles.bntEdit } onPress={ () => handleEdit(item) }>
                    <Text style={ styles.textBtn}>Edit</Text>
                </Pressable>

                <Pressable style={ styles.btnDelete } onPress={ () => handleDelete(item) }>
                    <Text style={ styles.textBtn}>Delete</Text>
                </Pressable>

            </View>

        </View>
    
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0B62E0',
        margin: 20,
        borderRadius: 10,
        padding: 7,     
    },
    textLabel:{
        color: '#FFF',
        fontWeight: '700',
        fontSize: 14
    },
    textItem: {
        color: '#FFF',
        fontWeight: '700',
        fontSize: 17
    },
    textDate: {
        color: '#FFF',
        fontWeight: '700',
        fontSize: 12
    },
    containerBtn:{
        flexDirection: 'row',
        justifyContent:'flex-end',
        marginTop: 5
    },
    bntEdit: {
        marginHorizontal: 30,
        backgroundColor: '#FF8C00',
        paddingHorizontal: 20,
        paddingVertical: 3,
        borderRadius: 3      
    },
    btnDelete:{
        marginEnd: 10,
        backgroundColor: '#DC143C',
        paddingHorizontal: 20,
        paddingVertical: 3,
        borderRadius: 3 
    },
    textBtn:{
        color: '#FFF',
        fontWeight: '700'
    },
})
