# HOUSEMATES

<img src="./src/assets/HouseMates_Logo_Circle_01.png"
     alt="Logo"
     width="400"
     height="400"
     style= "margin: 10px auto 20px; display: block; height: 100; width: 100;"     
/>

Amr: Project Manager

Val: Quality Assurance Lead

Parmida: Database Specialist

Ravneet: Business Analyst

Karl: Algorithm Specialist

Oskar: Software Architect

Aaron: User Interface

Brandon: Software Development Lead

JiMin: Software Development Lead

Bayar: Systems Analyst

## Introduction

Housemates is an application designed to solve many of the problems associated with negotiating tasks between members of a household. By managing the user-created tasks of your residence using an advanced task-assigning algorithm, Housemates delivers the perfect way to avoid unnecessary conflicts, stay organized, and ensure those “forgetful” roommates stay accountable. No more bickering over who does those soiled dishes. Let Housemates do the dirty work.



## Login Credentials

We have provided the following user accounts for testing purposes. Upon reaching the login screen, enter the following usernames and passwords as appropriate.



1. USER ONE - account with data

		Username: ‘populated@gmail.com’

		Password: ‘123456’

2. USER TWO - clean account

		Username: ‘clean@gmail.com’

		Password: ‘123456’



## Requirements

-   Two iPhone 6 or later running iOS 11.

-   Connection to the internet at all times.




## Setup Instructions

-   Enable WiFi. Ensure connection has been established.

-   Open the Housemates app. Testing devices will have application pre-installed.

-   Select “Log In” by clicking the button with that title.

-   Enter one of the usernames and passwords provided above.

-   Repeat steps for second phone.




## Code Snippets

## Creating a Task with Firebase
```
export  const  createTask  = ({name, desc, cycle, reminder, deadline}) => {
	const { currentUser } = firebase.auth();
	// Create the task under the field and save the ID
	const  newTaskRef  = firebase.database().ref(`/tasks`).push( {name, desc, cycle, reminder, deadline, complete :  false} );

	// Take task id, put it house's tasks.
	firebase.database().ref(`/users/${currentUser.uid}/house_id`)
	.once('value').then(function(snapshot) {
		// Get the houseID from the user making this task
		const  house_id  = snapshot.val();

		// Add the task to the house's field 'tasks' (task list)
		firebase.database().ref(`/houses/${house_id}/tasks/${newTaskRef.key}`)
			.set( newTaskRef.key );

		// Assign the task to a user
		assignTask(newTaskRef.key);
	});
}
```




## Populating House Task List

 ```
<Banner title={this.state.houseName}/>

<FlatList
    data={this.state.tasks}
    extraData={this.state.tasks}
    renderItem={ ({item}) =>
      <CardComponent
        name={item.name}
        desc={item.desc}
        cycle={item.cycle}
        reminder={item.reminder}
        deadline={item.deadline}
        task_id = {item.task_id}
        task_user = {item.user}
        updateTaskList = {this.updateHouseTasks.bind(this)}
        navigation={this.props.navigation}
        imageSource={3}
      />
    }
    keyExtractor={(item, index) => index.toString()}
    refreshing={this.state.refreshing}
    onRefresh={this.updateHouseTasks.bind(this)}
/>
```





The source code for the Housemates application can be viewed on GitHub at the following repository:

[https://github.com/aselfiky/HouseMates](https://github.com/aselfiky/HouseMates)




## Known Bugs

We currently have an issue building the app in Android, but otherwise you don’t know what you don’t know.

## Troubleshooting

If any unexpected behavior occurs while using Housemates, verify your internet connection has not been interrupted as the app requires updates from frequent updates to the database.



If the issue persists, close the application and then relaunch it. Follow the instructions listed in the setup section if necessary.



## Technical Support

Amr - [aelfiky@ucsd.edu](mailto:aelfiky@ucsd.edu)
