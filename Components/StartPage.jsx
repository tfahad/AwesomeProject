import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import axios from 'axios'
import { CountryPicker } from 'react-native-country-codes-picker'
import { Checkbox } from 'galio-framework';
import { ScrollView } from 'react-native-gesture-handler'

const StartPage = () => {
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('');


  const SeparatorLine = () => (
    <View style={styles.separatorLine} />
  );

  const navigation = useNavigation()

  const [ userDetails, setUserDetails] = useState({
    name:"",
    phoneNumber:"",
    email: "",
    pwd: "",
    confirmpwd:""
  })

  
  const handleChange = (value, fieldName) => {
    setUserDetails((prev) => ({ ...prev, [fieldName]: value }));
  };

  console.log('details',userDetails)


  const handleClick = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneNumberRegex = /^\d{10}$/; // Assumes a 10-digit phone number

    if (
      !userDetails.name ||
      !userDetails.phoneNumber ||
      !userDetails.email ||
      !userDetails.pwd ||
      !userDetails.confirmpwd
    ) {
      Alert.alert('Please fill all fields', 'All fields are required');
    } else if (userDetails.pwd !== userDetails.confirmpwd) {
      Alert.alert('Password mismatch', 'Please make sure the passwords match');
    } else if (!emailRegex.test(userDetails.email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
    } else if (!phoneNumberRegex.test(userDetails.phoneNumber)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number');
    } else if(userDetails.pwd.length < 6){
      Alert.alert('Invalid Password', 'Password must be more than 5 digits');
    }else{
      const response = await axios.post("http://192.168.1.38:5051/api/register", userDetails);
      if (response.data.errno == 1062) {
        Alert.alert("User with same phone number and Email already exists");
      } else {
        console.log('Response to our API request:', response.data);
        navigation.navigate("Otp");
      }}}

    // try {
      
    // } catch (error) {
    //   // Handle the error here
    //   console.log()
    //   if (error.response) {
    //     // The request was made and the server responded with a status code
    //     // that falls out of the range of 2xx
    //     Alert.alert('Error in axios post:', error.response.data.error);
    //   }
    // }

    

  
  
  

  


  
 



 


  return (
    <KeyboardAvoidingView style={{flex:1,backgroundColor:"white",justifyContent:"space-between",alignItems:"center"}}>
      {/* <View style={{width:"100%",height:200}}>
        <Image
        source={require('./Assets/rapido-banner.png')}
        style={{width:"100%",height:200}}/>

        

      </View> */}
      <View style={{width:"100%",height:200,paddingLeft:20,gap:20, marginTop:50}}>
      <Text style={{fontSize:30,color:"black",fontWeight:"500", bottom:10}}>Sign Up</Text>
        {/* <Text style={{fontSize:15,color:"gray"}}>Verify your account using OTP</Text> */}


    <View style={{width:"90%",height:65,borderWidth:.5,borderRadius:10,borderColor:"#899499",alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
     
    <TextInput
      placeholder='Enter name'
      style={{width:"80%",fontSize:16, color:'black'}}
      placeholderTextColor='#899499'
      onChangeText={(text) => handleChange(text, "name")}
      // value={name}
      // onChangeText={(text) => {
      //   setName(text);
      //   setNameerror('');
      // }}
      
     />
     </View>
     {/* {Nameerror ? <Text style={{ color: 'red' }}>{Nameerror}</Text> : null} */}
    

     <View style={{width:"90%",height:65,borderWidth:.5,borderRadius:10,borderColor:"#899499",alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
     <TouchableOpacity
        onPress={() => setShow(true)}
        style={{
            width: '15%',
            height: 60,
            // padding: 10,
            alignItems:'center',
            // right:10,
            borderRightWidth:.5,
            justifyContent:'center',
            borderRightColor:"#899499"
        }}
      >
        <Text style={{
            color: 'black',
            fontSize: 16,
            right:5
        }}>
            {countryCode}
        </Text>
      </TouchableOpacity>

      <CountryPicker
        show={show}
        // when picker button press you will get the country object with dial code
        pickerButtonOnPress={(item) => {
          setCountryCode(item.dial_code);
          setShow(false);
        }}
      />
     
     <TextInput
      placeholder='Enter your phone number'
      style={{width:"80%",fontSize:16, color:'black'}}
      placeholderTextColor='#899499'
      onChangeText={(text)=>handleChange(text, "phoneNumber")}
      // value={phoneNumber}
      // onChangeText={(text)=>{
      //   setPhonenumber(text);
      //   setPhonenumberError('');
      // }}
      
     />
     </View>
     {/* {phoneNumberError ?(
      <Text style={{color:"red"}}>{phoneNumberError}</Text>
     ):null} */}
      <View style={{width:"90%",height:65,borderWidth:.5,borderRadius:10,borderColor:"#899499",alignItems:"center",justifyContent:"center",flexDirection:"row"}}>     
     <TextInput
      placeholder='Enter your Email'
      style={{width:"80%",fontSize:16,color:'black'}}
      placeholderTextColor='#899499'
      onChangeText={(text)=>handleChange(text, "email")}

     
     />
     </View>
     
     <View style={{width:"90%",height:65,borderWidth:.5,borderRadius:10,borderColor:"#899499",alignItems:"center",justifyContent:"center",flexDirection:"row"}}>     
     <TextInput
      placeholder='Enter Password'
      style={{width:"80%",fontSize:16,color:'black'}}
      placeholderTextColor='#899499'
      onChangeText={(text)=>handleChange(text,"pwd")}

     
     />
     </View>

     <View style={{width:"90%",height:65,borderWidth:.5,borderRadius:10,borderColor:"#899499",alignItems:"center",justifyContent:"center",flexDirection:"row"}}>     
     <TextInput
      placeholder='Confirm Password'
      style={{width:"80%",fontSize:16,color:'black'}}
      placeholderTextColor='#899499'
      onChangeText={(text)=>handleChange(text, "confirmpwd")}


     />
     </View>

     <View style={{ width:'90%', height:50,justifyContent:'space-around', top:10, alignItems:'center' }}>
     <Checkbox  color="success" label="By Signing Up. You agree to the Terms of Service and  Privacy and Policy" />
     </View>


     <TouchableOpacity
       style={{width:"90%",height:65,backgroundColor:'#EDAE10',alignItems:"center",justifyContent:"center",borderRadius:7, marginTop:20}}
      //  onPress={()=>navigation.navigate('Otp')} 
      onPress={handleClick}
      
      >
        <Text style={{fontSize:20,
          fontWeight:"600", color:'white'}}>Proceed</Text>
     </TouchableOpacity>


     <View style={{flexDirection:'row', width:'90%', alignItems:'center', justifyContent:'center', bottom:10}}>
     <SeparatorLine />
      <Text style={{color:'black', marginHorizontal: 10, fontSize:18}}>or</Text>
      <SeparatorLine />
     </View>

     <View style={{flexDirection:'row', width:'50%', alignItems:'center', justifyContent:'space-around', left:80}}>
      <TouchableOpacity>
      <Image style={{width:30, height:30}} source={require('../Assets/logoicon/gmail.png')}></Image>
      </TouchableOpacity>
      <TouchableOpacity>
      <Image style={{width:30, height:30}} source={require('../Assets/logoicon/facebook.png')}></Image>
      </TouchableOpacity>
      <TouchableOpacity>
      <Image style={{width:30, height:30}} source={require('../Assets/logoicon/apple.png')}></Image>
      </TouchableOpacity>
      
      
     </View>

    <View style={{flexDirection:'row', width:'90%', alignItems:'center', justifyContent:'center'}}>
      <Text style={{color:'#797979', fontSize:18, fontWeight:600}}>Already have an Account?  </Text>
    <TouchableOpacity
      onPress={()=>navigation.navigate("Otp")}
      // onPress={handleClick}
      style={{}}
     >
     <Text style={{color:'#F2C24C', fontSize:18, fontWeight:600}}>Login</Text>
     </TouchableOpacity> 
     </View>

     {/* <Text>privecy policy</Text> */}
      </View>

     
     
     
    </KeyboardAvoidingView>
  )}

export default StartPage

const styles = StyleSheet.create({
  separatorLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth, // or any desired height
    backgroundColor: 'black',
  },
})