import React from "react";
import {StyleSheet, View, FlatList, Text} from 'react-native';
import {Container, Content, Icon} from "native-base";
import firebase from 'firebase';
import _ from 'lodash';
import Button from 'react-native-button';
import {
    getHouseTasks,
    assignTask,
    getUserTasks,
    reassignAllTasks,
    getHouseUsers // TEMP
} from '../components/DatabaseAPI';
// WARNING! Image path may need to be updated depending on directory hierarchy.
import CardComponent from "../components/HouseholdCardComponent";

/**
 * class HouseholdScreen
 * Task management screen. The main functionality of this screen allows the user to add/edit/remove tasks,
 * send anonymous notifications, and search through existing tasks. To change layout of cards, see
 * HouseholdCardComponent.js
 */

export default class HouseholdScreen extends React.Component {
    static navigationOptions = {
        title: "My Household",
        tabBarIcon: ({tintColor})=>(
            <Icon name='ios-home' style={{color: tintColor}} />
        )
    };

    /* Ctor: Sets up init state for page */
    constructor (props) {
        super(props);
        this.state = {
            firstQuery: '',
            tasks: [],
            refreshing: false,
            users: [{}]
        }
    }

    /* Updates the state tasks to be the lsit of tasks */
    updateHouseTasks() {
        this.setState({refreshing: true})
        getHouseTasks().then( function(results) {
            console.log(results);
            this.setState({tasks : results});
            this.setState({refreshing : false})
        }.bind(this));
    }

    reassignAllTasks() {
        reassignAllTasks();
    }

    /* Prior to rendering set up initial page */
    componentWillMount() {
        this.updateHouseTasks();

        getHouseUsers().then( function(results) {
            this.setState({users : results});
        }.bind(this));
    }



    handleSubmit_CreateTask = () => {
        this.props.navigation.navigate("CreateTask");
    };

    render() {
        return (
            <Container style={styles.container}>
                <View style={{padding: 10}}>
                    <Button style={{fontSize: 14, color: 'white', justifyContent: 'center', alignSelf: 'center'}}
                            onPress={this.reassignAllTasks}
                            containerStyle={{ padding: 11, height: 45, overflow: 'hidden', borderRadius: 4,
                                                backgroundColor: 'red' }}>
                        Reassign All Tasks
                    </Button>
                </View>
                <FlatList
                    data={this.state.tasks}
                    renderItem={ ({item}) =>
                        <CardComponent
                            name={item.name}
                            desc={item.desc}
                            cycle={item.cycle}
                            reminder={item.reminder}
                            deadline={item.deadline}
                            task_id = {item.task_id}
                            imageSource={1}
                        />
                    }
                    keyExtractor={(item, index) => index.toString()}
                    refreshing={this.state.refreshing}
                    onRefresh={this.updateHouseTasks.bind(this)}
                />
                <View style={{padding: 10}}>
                    <Button style={{fontSize: 14, color: 'white', justifyContent: 'center', alignSelf: 'center'}}
                            onPress={this.handleSubmit_CreateTask}
                            containerStyle={{ padding: 11, height: 45, overflow: 'hidden', borderRadius: 4,
                                                backgroundColor: '#6171A0' }}>
                        ADD A TASK
                    </Button>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#F5F5F5'
    }
});
