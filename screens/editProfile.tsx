import React from 'react';
import styles from '../styling/styles';
import {View, Text, TouchableOpacity} from 'react-native'
import { TextInput } from 'react-native-paper';

class EditProfile extends React.Component{
    constructor(props){
        super(props)
        const initialState = {
            email:'',
            name:'',
            phoneNumber:'',
            contactPreference:''
        }
        this.state = initialState;
    }
    render(){
        return(
            <View style = {styles.homeContainer}>
                <Text>
                    Profile
                </Text>
                <TextInput
                    style={styles.signUpTextInput}
                    label="Email"
                    mode="outlined"
                    theme={{colors:{primary:'blue'}}}
                    onChangeText = {email => this.setState(()=>({email: email}))}
                    value={this.state.email}
                />
                <TextInput
                    style={styles.signUpTextInput}
                    label="Name"
                    mode="outlined"
                    theme={{colors:{primary:'blue'}}}
                    onChangeText = {name => this.setState(()=>({name: name}))}
                    value={this.state.name}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={ async () => { 
                        console.log("Profile edited");
                        this.props.navigation.navigate('Home') }}
                >
                    <Text style={{ color: '#fafafa', alignSelf: 'center' }}>Confirm</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default EditProfile;