import {Component} from "react";
import {Modal, Text, KeyboardAvoidingView, StyleSheet, View} from "react-native";
import React from "react";
import tForm from 'tcomb-form-native';
import Button from 'react-native-button';
// Form and User initialize the user input fields.
const Form = tForm.form.Form;
const User = tForm.struct({
    name: tForm.maybe(tForm.String),
    e_mail: tForm.maybe(tForm.String),
    phoneNumber: tForm.maybe(tForm.String),
    password: tForm.maybe(tForm.String),
    verify_password: tForm.maybe(tForm.String)
});
export default class OptionsScreen extends Component {
    // Constructor initializes name, phoneNumber, houseID, and houseName to "".
    constructor(props) {
        super(props);
        this.state = {name: "", e_mail: "", phoneNumber: "", password:  "", verify_password: "", modalVisible: false};
        this.onChange=this.onChange.bind(this);
    }
    // Rids the sign up screen of the navigation bar that comes standard with 'react-navigation'.
    static navigationOptions = {
        header: null
    };
    /**
     * handleSubmit()
     * When the following buttons are pressed, the respective function is called.
     * It grabs the values in all input boxes and prints them to the console.
     * Then proceeds to the next screen if no values were null.
     */
    handleSubmit_saveInfo = () => {
        const value = this._form.getValue();
        console.log('value: ', value);
        if (value) {
            this.props.navigation.navigate("TabNavigation");
        }
    };
    handleSubmit_addMember = () => {
        this.setState({
            modalVisible: true
        });
    };
    handleSubmit_sendInvite = () => {
        this.setState({
            modalVisible: false
        });
    };
    handleSubmit_leaveHouse = () => {
            this.props.navigation.navigate("Welcome");
    };
    onChange(value) {
        this.setState({value});
    };
    /**
     * render()
     * Layout for the sign up screen.
     * TODO: The 'KeyboardAvoidingView' can potentially block the buttons/inputs.
     * @returns {Layout}
     */
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={[styles.box_SubContainer]}>
                    <View style={[styles.box_Title]}>
                        <Text style={styles.text_Title}>Options</Text>
                        <Text style={styles.text_SubTitle}>Edit your info.</Text>
                    </View>
                    <View style={[styles.box_Form]}>
                        <Modal animationType="slide"
                               transparent={true}
                               visible={this.state.modalVisible}
                               onRequestClose={()=>{alert('Invite not sent!')}}>
                            <View style={[styles.box_SubContainer]}>
                                <View style={[styles.box_Modal]}>
                                <Text>HEY</Text>
                                    <Button style={{fontSize: 14, color: 'white', justifyContent: 'center', alignSelf: 'center'}}
                                            onPress={this.handleSubmit_sendInvite}
                                            containerStyle={{ padding: 11, height: 45, overflow: 'hidden', borderRadius: 4,
                                            backgroundColor: '#729b79' }}>
                                        INVITE TO HOUSEHOLD
                                    </Button>
                                </View>
                            </View>
                        </Modal>
                        <Form ref={c => this._form = c}
                              type={User}
                              value={this.state.value}
                              onChange={this.onChange}
                              options={options}/>
                        <Button style={{fontSize: 14, color: 'white', justifyContent: 'center', alignSelf: 'center'}}
                                onPress={this.handleSubmit_saveInfo}
                                containerStyle={{ padding: 11, height: 45, overflow: 'hidden', borderRadius: 4,
                                    backgroundColor: '#415180' }}>
                            SAVE
                        </Button>
                        <Button style={{fontSize: 14, color: 'white', justifyContent: 'center', alignSelf: 'center'}}
                                onPress={this.handleSubmit_addMember}
                                containerStyle={{ padding: 11, height: 45, overflow: 'hidden', borderRadius: 4,
                                    backgroundColor: '#729b79' }}>
                            INVITE TO HOUSEHOLD
                        </Button>
                        <Button style={{fontSize: 14, color: 'white', justifyContent: 'center', alignSelf: 'center'}}
                                onPress={this.handleSubmit_leaveHouse}
                                containerStyle={{ padding: 11, height: 45, overflow: 'hidden', borderRadius: 4,
                                    backgroundColor: '#a03e47' }}>
                            LEAVE YOUR HOUSEHOLD
                        </Button>
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
            fontSize: 14,
            fontWeight: 'bold'
        },
        error: {
            color: 'red',
            fontSize: 14,
            fontWeight: 'bold'
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
        name: {
            label: 'Update Name:'
        },
        phoneNumber: {
            label: 'Update Phone Number:'
        },
        e_mail: {
            label: 'Update Email:'
        },
        password: {
            label: 'New Password:'
        },
        verify_password: {
            label: 'Verify New Password:'
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
        paddingLeft: 16,
        paddingRight: 16,
        // This field can be changed to adjust style.
        paddingTop: 0,
    },
    box_SubContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    box_Title: {
        flex: 2.5,
        marginTop: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    box_Form: {
        flex: 10,
        backgroundColor: 'transparent',
        padding: 20,
        justifyContent: 'space-evenly'
    },
    box_Modal: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'space-evenly'
    },
    text_Title: {
        fontWeight: 'bold',
        fontSize: 40,
        color: '#415180'
    },
    text_SubTitle: {
        color: '#415180',
        fontSize: 16
    },
});