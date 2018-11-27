import React from "react";
import {StyleSheet, View, FlatList, Text} from 'react-native';
import {Container, Content, Icon} from "native-base";
import firebase from 'firebase';
import _ from 'lodash';
import Button from 'react-native-button';

// WARNING! Image path may need to be updated depending on directory hierarchy.
import CardComponent from "../components/HouseholdCardComponent";

/**
 * class HouseholdScreen
 * Task management screen. The main functionality of this screen allows the user to add/edit/remove tasks,
 * send anonymous notifications, and search through existing tasks. To change layout of cards, see
 * HouseholdCardComponent.js
 */

export default class HouseholdScreen extends React.Component {
    task_list = [{name: 'default'}];

    constructor (props) {
        super(props);
        this.state = {
            firstQuery: '',
            tasks: []
        }
    }

    componentWillMount() {
        const { currentUser } = firebase.auth();

        // Set tasks
        firebase.database().ref(`/users/${currentUser.uid}/house_id`)
            .on( 'value', (snapshot) => {
                const house_id = snapshot.val();
                console.log(house_id);
                firebase.database().ref(`/houses/${house_id}/tasks`)
                    .on('value', (snapshot) => {
                        const taskID_list = _.values(snapshot.val());
                        console.log(taskID_list);
                        console.log(taskID_list)
                        for (taskID of taskID_list) {
                            console.log(taskID);
                            firebase.database().ref(`/tasks/${taskID}`)
                                .on('value', (snapshot) => {
                                    this.task_list.push(snapshot.val());
                                    console.log(this.task_list);
                                });
                        }
                    });
        });
    }

    static navigationOptions = {
        title: "My Household",
        tabBarIcon: ({tintColor})=>(
            <Icon name='ios-home' style={{color: tintColor}} />
        )
    };

    handleSubmit_CreateTask = () => {
        this.props.navigation.navigate("CreateTask");
    };

    render() {
        return (
            <Container style={styles.container}>
                <FlatList   
                    data={this.task_list}
                    renderItem={ ({item}) => <Text>{item.name}</Text> }
                />
                <Content padder>
                    <CardComponent imageSource="2"/>
                    <CardComponent imageSource="3"/>
                    <CardComponent imageSource="1"/>
                    <CardComponent imageSource="4"/>
                    <CardComponent imageSource="2"/>
                    <CardComponent imageSource="3"/>
                    <CardComponent imageSource="1"/>
                    <CardComponent imageSource="4"/>
                    <CardComponent imageSource="4"/>
                    <CardComponent imageSource="2"/>
                    <CardComponent imageSource="3"/>
                </Content>
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
        backgroundColor: '#415180'
    }
});
