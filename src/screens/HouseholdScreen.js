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
    constructor (props) {
        super(props);
        this.state = {
            firstQuery: '',
            tasks: [],
            refreshing: false
        }
    }

    componentWillMount() {
        let task_list = [];

        const { currentUser } = firebase.auth();

        // Set tasks
        firebase.database().ref(`/users/${currentUser.uid}/house_id`)
            .on( 'value', (snapshot) => {
                const house_id = snapshot.val();
                console.log(house_id);
                firebase.database().ref(`/houses/${house_id}/tasks`)
                    .on('value', (snapshot) => {
                        const taskID_list = _.values(snapshot.val());

                        for (let taskID of taskID_list) {
                            firebase.database().ref(`/tasks/${taskID}`)
                                .on('value', (snapshot) => {
                                    task_list.push(snapshot.val());
                                });
                        }
                        this.setState({tasks : task_list});
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
                    data={this.state.tasks}
                    renderItem={ ({item}) =>
                        <CardComponent
                            name={item.name}
                            desc={item.desc}
                            cycle={item.cycle}
                            reminder={item.reminder}
                            deadline={item.deadline}
                            imageSource={1}
                        />
                    }
                    keyExtractor={(item, index) => index.toString()}
                    refreshing={this.state.refreshing}
                    onRefresh={this.componentWillMount.bind(this)}
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
        backgroundColor: '#415180'
    }
});
