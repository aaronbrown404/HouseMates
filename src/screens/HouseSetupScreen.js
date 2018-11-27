// Added image.
import {Component} from "react";
import {Image, Text, StyleSheet, View} from "react-native";
import React from "react";
import tForm from 'tcomb-form-native';
import Button from 'react-native-button';
import firebase from 'firebase';

import { joinCreateHouse } from '../components/DatabaseAPI';

const Form = tForm.form.Form;
const User = tForm.struct({
    houseID: tForm.String,
});
export default class HouseSetupScreen extends Component {
    // Constructor initializes houseID to "".
    constructor(props) {
        super(props);
        this.state = {nameID: ""};
        this.onChange=this.onChange.bind(this);
    }

    // Rids the sign up screen of the navigation bar that comes standard with 'react-navigation'.
    static navigationOptions = {
        header: null
    };

    /**
     * handleSubmit_CreateHome()
     * When the create button is pressed, this function is called.
     * It simply proceeds to the next screen.
     * TODO: add houseID generation here
     */
    handleSubmit_CreateJoinHome = () => {
            const house_name = this._form.getValue().houseID   
            const { currentUser } = firebase.auth();

            // Set user's housename
            firebase.database().ref(`/users/${currentUser.uid}/house_id`).set( house_name );

            // (!) Cannot use Database API, because we must navigate AFTER hosue has been created

            // Sets the user's house_name' field
            firebase.database().ref(`/users/${currentUser.uid}/house_id`)
                .set( house_name )
                .then(() => {
                    firebase.database().ref(`/users/${currentUser.uid}/has_house`).set(true);            

                    // Add the userID the the household's field 'users' (user's list)
                    firebase.database().ref(`/houses/${house_name}/users`)
                    .push(currentUser.uid)
                        .then(() => {this.props.navigation.navigate("TabNavigation");});
                });
    };

    onChange(value) {
        this.setState({value});
    };

    /**
     * render()
     * Layout for the sign up screen.
     * WARNING! Image path may need to be updated depending on directory hierarchy.
     * @returns {Layout}
     */
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.box_Option1}>
                    <Image style={{flex: 1, height:undefined, width:undefined}}
                           source={require("../assets/HouseMates_newHouse_outlinedTEST_noBackground.png")}
                           resizeMode="contain"/>

                    <Form ref={c => this._form = c}
                          type={User}
                          value={this.state.value}
                          onChange={this.onChange}
                          options={options}/>

                    <Button style={{fontSize: 14, color: 'white', justifyContent: 'center', alignSelf: 'center'}}
                            onPress={this.handleSubmit_CreateJoinHome}
                            containerStyle={{ padding: 11, height: 45, overflow: 'hidden', borderRadius: 4,
                                backgroundColor: '#6171A0' }}>
                        JOIN EXISTING HOUSEHOLD
                    </Button>
                </View>

                <View style={styles.box_Option2}>
                    <View style={styles.box_Text}>
                        <Text style={[styles.text_SubTitle2]}>
                            Or...
                        </Text>
                    </View>
                    <Button style={{fontSize: 14, color: 'white', justifyContent: 'center', alignSelf: 'center'}}
                            onPress={this.handleSubmit_CreateJoinHome}
                            containerStyle={{ padding: 11, height: 45, overflow: 'hidden', borderRadius: 4,
                                backgroundColor: '#6171A0' }}>
                        CREATE NEW HOUSEHOLD
                    </Button>
                </View>
            </View>
        );
    }
}
// The following edits the style of the form. This format is required for the API.
const formStyles = {
    ...Form.stylesheet,
    //
    controlLabel: {
        normal: {
            color: 'white',
            fontSize: 14
        },
        error: {
            color: 'red',
            fontSize: 14
        }
    },
    textbox: {
        normal: {
            color: 'white',
            borderWidth: 1,
            borderColor:'white',
            borderRadius: 4,
            height: 36,
            marginBottom: 5
        },
        error: {
            color: 'red',
            borderWidth: 1,
            borderColor:'red',
            height: 36,
            marginBottom: 5
        }
    },
};
// The following edits the fields of the form. This format is required for the API.
const options = {
    fields: {
        houseID: {
            label: ' ',
            placeholder: 'Code',
        }
    },
    stylesheet: formStyles,
};
// StyleSheet for the sign up screen.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#283350',
        paddingLeft: 16,
        paddingRight: 16,
    },
    box_Option1: {
        flex: 12,
        backgroundColor: '#415180',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 10
    },
    box_Option2: {
        flex: 6,
        backgroundColor: '#415180',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 10
    },
    box_Text: {
        alignItems: 'center'
    },
    text_Title: {
        fontWeight: 'bold',
        fontSize: 40,
        color: '#415180'
    },
    text_SubTitle: {
        color: '#415180',
        fontSize: 16,
        alignItems: 'center',
        padding: 0
    },
    text_SubTitle2: {
        color: 'white',
        fontSize: 16,
        alignItems: 'center',
        marginBottom: 22
    },
});