import {Component} from "react";
import {Text, KeyboardAvoidingView, StyleSheet, View, Image} from "react-native";
import Button from 'react-native-button';
import React from "react";
import tForm from 'tcomb-form-native';

// Form and User initialize the user input fields.
const Form = tForm.form.Form;
const User = tForm.struct({
    taskName: tForm.String,
    taskDescription: tForm.maybe(tForm.String),
    taskDeadline: tForm.Date,
});


export default class CreateTaskScreen extends Component {
    // Constructor initializes taskName, taskDeadline, taskDescription to "".
    constructor(props) {
        super(props);
        this.state = { taskName: "", taskDeadline: "", taskDescription: "" };
        this.onChange=this.onChange.bind(this);
    }

    // Rids the sign up screen of the navigation bar that comes standard with 'react-navigation'.
    static navigationOptions = {
        header: null
    };

    /**
     * handleSubmit_TaskSubmit()
     * When the "CREATE" button is pressed, this function is called.
     * It grabs the values in all input boxes and prints them to the console.
     * Then proceeds to the next screen if no values were null.
     * TODO: Needs to talk to the database and create a new task on the Household Screen.
     */
    handleSubmit_TaskSubmit = () => {
        const value = this._form.getValue();
        console.log('value: ', value);
        if (value) {
            this.props.navigation.navigate("Household");
        }
    };

    onChange(value) {
        this.setState({value});
    };

    /**
     * render()
     * Layout for the Create Task screen.
     * TODO: The 'KeyboardAvoidingView' can potentially cause some UI to overlap.
     * WARNING! Image path may need to be updated depending on directory hierarchy.
     * @returns {Layout}
     */
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <Image style={{flex: 1, height:undefined, width:undefined}}
                       source={require("../assets/HouseMatesPNG_CreateTask_04.png")}
                       resizeMode="contain"/>
                <View style={[styles.box_SubContainer]}>
                    <View style={[styles.box_Title]}>
                        <Text style={styles.text_Title}>Create Task</Text>
                    </View>
                    <View style={[styles.box_Form]}>
                        <Form ref={c => this._form = c}
                              type={User}
                              value={this.state.value}
                              onChange={this.onChange}
                              options={options}/>
                        <Button style={{fontSize: 14, color: 'white', justifyContent: 'center', alignSelf: 'center'}}
                                onPress={this.handleSubmit_TaskSubmit}
                                containerStyle={{ padding: 11, height: 45, overflow: 'hidden', borderRadius: 4,
                                    backgroundColor: '#6171A0' }}>
                            CREATE
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
        taskName: {
            label: 'Name:'
        },
        taskDescription: {
            multiline: true,
            numberOfLines: 3,
            label: 'Description:'
        },
        taskDeadline: {
            label: 'Deadline:',
            mode: 'date'
        },
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
        paddingTop: 40,
    },
    box_SubContainer: {
        flex: 3,
        flexDirection: 'column',
        backgroundColor: '#415180',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    box_Title: {
        flex: 1,
        marginTop: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    box_Form: {
        flex: 3,
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'flex-start',
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
