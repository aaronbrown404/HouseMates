// This replaced CreateTaskScreen and will be prompted to show on editTask or createTask button press.
import {Component} from "react";
import { Text, KeyboardAvoidingView, StyleSheet, View, Image, ScrollView } from "react-native";
import Button from 'react-native-button';
import React from "react";
import tForm from 'tcomb-form-native';
import { 
  createTask,
} from '../components/DatabaseAPI';

//Variable for cycle lengths.
var Cycle = tForm.enums({
  Daily: 'Daily',
  Weekly: 'Weekly',
  Monthly: 'Monthly'
});
var Weight = tForm.enums({
  1: 'Low',
  2: 'Medium',
  3: 'High'
});
// Form and User initialize the user input fields.
const Form = tForm.form.Form;
const User = tForm.struct({
  name: tForm.String,
  desc: tForm.maybe(tForm.String),
  weight: Weight,
  deadline: tForm.Date,
  reminder: tForm.Boolean,
  cycle: Cycle,
});
export default class CreateTaskScreen extends Component {
  // Constructor initializes name, deadline, desc to "".
  constructor(props) {
    super(props);
    this.state = {name: "", deadline: "", desc: "", reminder: false, cycle: "Daily", weight: null};
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
    // {name, desc, cycle, reminder, deadline}
    const value = this._form.getValue();
    if (value) {
        createTask( {
          name : value.name, 
          deadline : String(value.deadline), 
          desc : value.desc, 
          reminder : value.reminder, 
          cycle : value.cycle, 
          weight: value.weight
        });
        this.props.navigation.navigate("Household");
    }
  };

  onChange(value) {
    this.setState({value});
  };

  go_back = () => {
      this.props.navigation.navigate("TabNavigation");
  };
  /**
   * render()
   * Layout for the sign up screen.
   * TODO: The 'KeyboardAvoidingView' can potentially cause some UI to overlap.
   * WARNING! Image path may need to be updated depending on directory hierarchy.
   * @returns {Layout}
   */
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={{paddingTop: 15}}>
            <Button
                style={{fontWeight: 'bold', fontSize: 14, color: 'white', justifyContent: 'center', alignSelf: 'center'}}
                containerStyle={{ paddingTop: 10, padding: 11, height: 45, overflow: 'hidden', borderRadius: 4, backgroundColor: '#6171A0' }}
                onPress={this.go_back}
            >
                GO BACK
            </Button>
        </View>
        <Image style={{flex: 1, height:undefined, width:undefined}}
            source={require("../assets/HouseMatesPNG_CreateTask_04.png")}
            resizeMode="contain"/>
        <ScrollView>
        <View style={[styles.box_SubContainer]}>
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
              FINALIZE
            </Button>
          </View>
        </View>
        </ScrollView>
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
            label: 'Name:'
        },
        desc: {
            multiline: true,
            numberOfLines: 3,
            label: 'Description:'
        },
        deadline: {
            label: 'Deadline:',
            mode: 'date'
        },
        reminder: {
            label: 'Enable Reminder?'
        },
        cycle: {
            label: 'Task renews...'
        },
        weight: {
            label: 'Task difficulty'
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
    backgroundColor: '#415180',
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
    color: 'white'
  },
  text_SubTitle: {
    color: '#415180',
    fontSize: 16
  },
});
