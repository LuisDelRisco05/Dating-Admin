import { useState } from "react";
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text } from "react-native"
import { Form, Patient } from "./src/components";



const App = () => {

  const [ form, setForm ] = useState(false);
  const [ patients, setPatients ] = useState([]);
  const [ editPatient, setEditPatient ] = useState({});

  

  return (

    <SafeAreaView style={ styles.container }>
      <Text style={ styles.title }>dating Administrator {''}
        <Text style={ styles.titleVeterinary }>veterinary</Text>
      </Text>

      <Pressable 
        style={ styles.btn } 
        onPress={ () => setForm(true) }
      >
        <Text style={ styles.btnText }>New Date</Text>
      </Pressable>

      {patients.length === 0 

        ? <Text style={ styles.noPatients}>No patients yet</Text> 

        : <FlatList
            style={ styles.flatList }
            data={ patients } //La info 
            keyExtractor={ (item) =>  item.id } //Itera por cada uno
            renderItem={ ({ item }) => {
              
              return(

                <Patient 
                  item={ item } 
                  patients={ patients } 
                  setPatients={ setPatients }
                  setForm={ setForm } 
                  setEditPatient={ setEditPatient } 
                  
                />

            )}} //El componente que se va a mostrar
          />

      }

      <Form 
        form={ form } 
        setForm={ setForm } 
        patients={ patients } 
        setPatients={ setPatients } 
        editPatient={ editPatient }
        setEditPatient={ setEditPatient }
      />

    </SafeAreaView>
    
  )
}

export default App;

const styles = StyleSheet.create({
    container:{
      backgroundColor: '#483D8B',
      flex: 1,
    },
    title:{
      color: 'white',
      fontSize: 30,
      fontWeight: '400',
      marginTop: 20,
      textAlign: 'center',
    },
    titleVeterinary:{
      fontWeight:'800',
    },
    btn: {
      backgroundColor: '#0B62E0',
      borderRadius: 10,
      marginHorizontal: 50,
      marginTop: 2,
      marginTop: 20,
      padding: 10,
    },
    btnText:{
      color: '#FFF',
      fontSize:18,
      fontWeight: '900',
      textAlign: 'center',
      textTransform: 'uppercase'
    },
    noPatients:{
      textAlign: 'center',
      marginTop: 30,
      fontSize: 15,
      color: '#FFF',
      fontWeight: '600'
    },
    flatList:{
      backgroundColor: '#010025',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      marginHorizontal: 15,
      marginTop: 30,
      opacity: 0.8

    }
})