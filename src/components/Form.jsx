import { useEffect, useState } from "react";
import { Alert, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import DatePicker from "react-native-date-picker";


export const Form = ({ form, setForm, patients, setPatients, editPatient, setEditPatient }) => {

  // const [ id, setId ] = useState('')
  // const [ patientName, setPatient ] = useState('');
  // const [ ownerName, setOwnerName ] = useState('');
  // const [ ownerEmil, setOwnerEmil ] = useState('');
  // const [ ownerPhone, setOwnerPhone ] = useState('');
  // const [ symptoms, setSymptomst ] = useState('');
  // const [ date, setDate ] = useState(new Date());

  const [ patient, setPatient ] = useState({
    id: '',
    name: '',
    owner: '',
    email: '',
    phone: '',
    symptoms: '',
    date: new Date()
  });

  const { id, name, owner, email, phone, symptoms, date } = patient;

  const onChange = (field, value) => {
    setPatient({
      ...patient,
      [field]: value
    })
  }

  useEffect(() => {
    
    
    if( Object.keys(editPatient).length > 0 ) {
      console.log('si hay algo');
      setPatient({
        id: editPatient.id,
        name: editPatient.name,
        owner: editPatient.owner,
        email: editPatient.email,
        phone: editPatient.phone,
        symptoms: editPatient.symptoms,
        date: editPatient.date
      });

      
    }else {
      console.log('no hay nada');
    }
  }, [editPatient]);

  const resetPatient = () => {
    setPatient({
      id: '',
      name: '',
      owner: '',
      email: '',
      phone: '',
      symptoms: '',
      date: new Date(),
    });
   
    setForm(false);
  }
  


  const handleDate = () => {


    //* Validar

    if( [ name, owner, email, phone, symptoms, date ].includes('') ) {

      Alert.alert(
        'Error',
        'All fields are required',
        [{ text: 'I get it!'}]
      )

      return;

    }

    // Revisar si es un registro nuevo o edicion
    // const newPatient = {
    //   patientName, 
    //   ownerName, 
    //   ownerEmil, 
    //   ownerPhone, 
    //   symptoms,
    //   date
    // }

    if(id){
      //editando
  

      const updatePatients = patients.map( pati => (
        pati.id === patient.id ? patient : pati
      )) 

      console.log('probando!!',updatePatients);

      setPatients(updatePatients);
      setEditPatient({});

    } else {
      //nuevo
      patient.id = Date.now()
      setPatients([...patients, patient]);

    } 


    //* Reset
    resetPatient();

  }

  return (
        <Modal
            animationType="slide"
            visible={ form }
        >
          <SafeAreaView style={ styles.container }>

            <ScrollView>

              <View style={ styles.containerTop}>
                <Text style={ styles.title }>{editPatient ? 'Edit' : 'New'} Date</Text>

                <Pressable
                  onPress={ () => {
                    setForm(false);
                    resetPatient();
                    setEditPatient({});
                  }}
                  style={ styles.ContainerBtnClose }
                >
                  <Text style={ styles.btnClose }>X</Text>
                </Pressable>
              </View>
              
              <View style={ styles.conteinerInput }>

                <Text style={ styles.textLabel }>Patient Name</Text>

                <TextInput
                  placeholder='Patient Name'
                  style={ styles.textInput }
                  value={ name }
                  onChangeText={ value => onChange('name', value) }
                />

              </View>  

              <View style={ styles.conteinerInput }>

                <Text style={ styles.textLabel }>Owner Name</Text>

                <TextInput
                  placeholder='Owner Name'
                  style={ styles.textInput }
                  value={ owner }
                  onChangeText={ value => onChange('owner', value) }
                />

              </View>  

              <View style={ styles.conteinerInput }>

                <Text style={ styles.textLabel }>Owner Email</Text>

                <TextInput
                  placeholder='Owner Email'
                  style={ styles.textInput }
                  keyboardType='email-address'
                  value={ email }
                  onChangeText={ value => onChange('email', value) }
                />

              </View>  

              <View style={ styles.conteinerInput }>

                <Text style={ styles.textLabel }>Owner Phone</Text>

                <TextInput
                  placeholder='Owner Phone'
                  style={ styles.textInput }
                  keyboardType='number-pad'
                  value={ phone }
                  maxLength={ 10 }
                  onChangeText={ value => onChange('phone', value) }
                />

              </View>  

              <View style={ styles.conteinerDate }>

                <Text style={ styles.textLabel }>Discharge Date</Text>
            
                <DatePicker
                  date={ date }
                  onDateChange={ value => onChange('date', value) }
                  androidVariant={ "nativeAndroid" }
                  mode={ "date" }
                  textColor={ "#FFF" }
                />

              </View>  

              <View style={ styles.conteinerInput }>

                <Text style={ styles.textLabel }>Symptoms</Text>

                <TextInput
                  placeholder='Symptoms'
                  style={[ styles.textInput, styles.inputSymptoms ]}
                  value={ symptoms }
                  multiline={ true }
                  onChangeText={ value => onChange('symptoms', value) }
                />

              </View>  
     
              <Pressable 
                style={ styles.btn } 
                onPress={ handleDate }
              >
                <Text style={ styles.btnText }>+</Text>
              </Pressable>

            </ScrollView>     

          </SafeAreaView>

        </Modal>
  )
}

const styles = StyleSheet.create({

  container:{
    backgroundColor: '#010025',
    flex: 1,
  },
  containerTop:{
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
  },
  title:{
    color: '#FFF',
    fontSize: 30,
    fontWeight: '900',
    marginTop: 20,
    marginStart: 100,
    textAlign: 'center',
  },
  conteinerInput: {
    marginTop: 30,
    marginHorizontal: 30,
  },
  conteinerDate: {
    marginTop: 30,
    marginHorizontal: 30,
  },
  textLabel:{
    color:'#FFF',
    fontSize: 20,
    fontWeight: '600',
  },
  textInput:{
    backgroundColor: '#FFF',
    borderRadius: 10,
    color: '#767676',
    marginVertical: 5,
    padding: 15,
  },
  inputSymptoms: {
    height: 100,
  },
  btn: {
    alignSelf: 'flex-end',
    backgroundColor: '#483D8B',
    borderRadius: 100,
    borderWidth: 1,
    display: 'flex',
    height: 80,
    justifyContent: 'center',
    marginBottom: 20,
    marginHorizontal: 30,
    marginTop: 5,
    padding: 10,
    width: 80,
  
  },
  btnText:{
    color: '#FFF',
    fontSize: 40,
    fontWeight: '600',
    textAlign: 'center',
  },
  ContainerBtnClose:{
    alignContent:'center',
    alignSelf: 'flex-end',
    backgroundColor: '#767676',
    borderRadius: 100,
    borderWidth: 1,
    display: 'flex',
    height: 40,
    justifyContent: 'center',
    marginBottom: 20,
    marginStart: 30,
    marginTop: 15,
    padding: 10,
    width: 40,
  },
  btnClose: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '900',
    textAlign:'center',
  }

})