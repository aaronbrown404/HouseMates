import {Component} from "react";
import {Image, Text, Button, KeyboardAvoidingView, StyleSheet, View} from "react-native";
import React from "react";
import tForm from 'tcomb-form-native';
import * as firebase from 'firebase';

// Form and User initialize the user input fields.
const Form = tForm.form.Form;
const House = tForm.struct({
    household_name: tForm.String,
});

var firebaseConfig = {
  apiKey: "AIzaSyDzH3Hy17z8FuvXy7069w9_sXEEoWQu4xo",
  authDomain: "createhousehold.firebaseapp.com",
  databaseURL: "https://createhousehold.firebaseio.com",
  projectId: "createhousehold",
  storageBucket: "createhousehold.appspot.com",
  messagingSenderId: "451224208673"
};
firebase.initializeApp(firebaseConfig);

this.firebaseIDRef = firebase.database().ref("globalID");

// this.firebaseRef = firebase.database().ref("Household");
// this.firebaseIDRef = firebase.database().ref("Household");

function pushToFireBase(householdName, id) {
  firebase.database().ref("Household" + id).set({
    householdname: householdName
  });
}

function readHouseholdName(id) {
  firebase.database().ref("Household" + id).on('value', (snapshot) => {
    snapshot.forEach(shot => {
      let item = shot.val();
    })
  });
}

function start(value) {
  this.firebaseIDRef.once('value', (snapshot) => {
    snapshot.forEach(shot => {
      let id = shot.val();
      id = id + 1;
      updateGlobalID(value, id);
    })
  });
}

function initGlobalID(){
  this.firebaseIDRef.set({
    latestID: 0
  });
}

function updateGlobalID(value, id){
  this.firebaseIDRef.set({
    latestID: id
  }).then(pushToFireBase( value, id));
}

export default class CreateHouseScreen extends Component {
    // Constructor initializes household name, phoneNumber, houseID, and houseName to "".
    constructor(props) {
        super(props);
        this.state = { household_name: "" };
        this.onChange=this.onChange.bind(this);
    }

    // componentWillUnmount() {
    //   this.firebaseIDRef.off();
    // }


    // Rids the sign up screen of the navigation bar that comes standard with 'react-navigation'.
    static navigationOptions = {
        header: null
    };

    /**
     * handleSubmit()
     * When the "Sign Up" button is pressed, this function is called.
     * It grabs the values in all input boxes and prints them to the console.
     * Then proceeds to the next screen if no values were null.
     * TODO: 'House Code' or 'House Name' can have a null field, but not both.
      */

    handleSubmit = () => {
        const value = this._form.getValue();
        console.log('value: ', value);
        start(value.household_name);

        if (value) {
            this.props.navigation.navigate("TabNavigation");
        }
    };

    onChange(value) {
        this.setState({value});
    };

    /**
     * render()
     * Layout for the sign up screen.
     * TODO: The 'KeyboardAvoidingView' can potentially block the sign up button.
     * WARNING! Image path may need to be updated depending on directory hierarchy.
     * @returns {Layout}
     */
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

                    <View style={[styles.box_SubContainer]}>
                    <View style={styles.box_Fitter} >
                        <Image style={{flex:3, height:undefined, width:undefined}}
                               source={require("../assets/HouseMates_newHouse_noBackground.png")}
                               resizeMode="contain"/>
                    </View>
                        <View style={[styles.box_Title]}>
                            <Text style={styles.text_Title}>Create A Household</Text>
                            <Text style={styles.text_SubTitle}>Give your house a name!</Text>
                        </View>
                        <View style={[styles.box_Form]}>
                            <Form ref={c => this._form = c}
                                  type={House}
                                  value={this.state.value}
                                  onChange={this.onChange}
                                  options={options}/>
                            <Button title='Sign Up' color='#425281' onPress={this.handleSubmit}/>
                        </View>
                    </View>

            </KeyboardAvoidingView>
        );
    }
}

// The following edits the style of the form. This format is required for the API.
const formStyles = {
    ...Form.stylesheet,
    //
    controlLabel: {
        normal: {
            color: '#415180',
            fontSize: 14
        },
        error: {
            color: 'red',
            fontSize: 14
        }
    },
    textbox: {
        normal: {
            color: '#415180',
            borderWidth: 1,
            borderColor:'#415180',
            borderRadius: 4,
            height: 36,
            marginBottom: 5
        },
        error: {
            color: '#415180',
            borderWidth: 1,
            borderColor:'#415180',
            height: 36,
            marginBottom: 5
        }
    },
    buttonText: {
        fontSize: 18,
        color: 'white'
    },
    button: {
        backgroundColor: '#ffd344',
        borderWidth: 1,
        borderRadius: 8,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
};

// The following edits the fields of the form. This format is required for the API.
const options = {
    fields: {
        household_name: {
            label: 'Household Name:'
        }
    },
    stylesheet: formStyles,
};

// StyleSheet for the sign up screen.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#283350',
        padding: 22
    },
    box_SubContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    box_Title: {
        flex: 3,
        marginTop: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    box_Form: {
        flex: 10,
        backgroundColor: 'transparent',
        padding: 20,
        justifyContent: 'center'
    },
    box_Fitter: {
        flex: 3,
        backgroundColor: 'transparent',
        padding: 10,
        justifyContent: 'flex-end'
    },
    text_Title: {
        fontWeight: 'bold',
        fontSize: 35,
        color: '#415180'
    },
    text_SubTitle: {
        color: '#415180',
        fontSize: 16
    },
});
