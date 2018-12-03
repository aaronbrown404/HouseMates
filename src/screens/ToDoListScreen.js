import React from "react";
import {FlatList, StyleSheet} from "react-native";
import { Container, Content, Icon} from 'native-base';
import {getHouseUsers, getUserTasks} from "../components/DatabaseAPI";
// WARNING! Image path may need to be updated depending on directory hierarchy.
import CardComponent from '../components/ToDoListCardComponent';

/**
 * class ToDoListScreen
 * Task completion screen. The main functionality of this screen allows the user to view tasks assigned to them and
 * mark them off when completed.
 */
export default class ToDoListScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            refreshing: false
        }
    }

    componentWillMount() {
        getUserTasks()
            .then( function(results) { 
                this.setState({ tasks: [] }); 
                this.setState({ tasks: results }); 
            }.bind(this))
            .catch(e => alert(e));
    }

    static navigationOptions = {
        title: "My Tasks",
        tabBarIcon: ({tintColor})=>(
            <Icon name='ios-paper' style={{color: tintColor}} />
        )
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
                            task_id = {item.task_id}
                            task_user = {item.user}
                            complete = {item.complete}
                        />
                    }
                    keyExtractor={(item, index) => index.toString()}
                    refreshing={this.state.refreshing}
                    onRefresh={this.componentWillMount.bind(this)}
                />
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


