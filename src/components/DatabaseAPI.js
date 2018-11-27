import firebase from 'firebase';
import _ from 'lodash';


/*
 *  TODO : Some getter missing. Task fields need to be finalized. 
 */

/*** USER METHODS ***/

/* Sets the user's first name under 'first_name' field. */
export const setFirstName = (first_name) => {
	const { currentUser } = firebase.auth();
	firebase.database().ref(`/users/${currentUser.uid}/first_name`)
		.set( first_name );
}

/* Sets the user's last name under 'last_name' field. */
export const setLastName = (last_name) => {
	const { currentUser } = firebase.auth();
	firebase.database().ref(`/users/${currentUser.uid}/last_name`)
		.set( last_name );
}

/** 
 * Given a house_name (which is equivalent to a house ID) the user 
 * will join that house. If the hosue does not exist the house will
 * be created. Updates all related fields.
 *
 * Args: house_name (string) - Name of the household.
 */
export const joinCreateHouse = (house_name) => {
	const { currentUser } = firebase.auth();

	// Sets the user's house_name' field
	firebase.database().ref(`/users/${currentUser.uid}/house_id`)
		.set( house_name );

	// Add the userID the the household's field 'users' (user's list)
	firebase.database().ref(`/houses/${house_name}/users`)
		.push(currentUser.uid);

}

/**
 * Assigns the task for a specified user and task.
 *
 * Args: userId (string) - ID of user that will receive the task
 *       taskId (string) - ID of the task
 */
export const setUserTask = (userId, taskId) => {
	firebase.database().ref(`/tasks/${taskId}`)
		.on('value', (snapshot) => { 
			// Grab the specific task object
			const task = snapshot;

			// Give task to user by adding it to user field 'tasks' (user's personal task list) 
			firebase.database().ref(`/users/${userId}/tasks/${taskId}`).set( taskId );
		});
}

/** 
 * Creates a new task for the household.
 *
 * Args: Task Object - Represents the task to be created
 */
export const createTask = ({name, desc, day, deadline}) => {
	const { currentUser } = firebase.auth();

	// Create the task under the field and save the ID
	const newTaskRef = firebase.database().ref(`/tasks`).push( {name, desc, day, deadline} );

	// Take task id, put it house's tasks.	
	firebase.database().ref(`/users/${currentUser.uid}/house_id`)
		.once('value')
		.then(function(snapshot) {
			// Get the houseID from the user making this task
			const house_id = snapshot.val();

			// Add the task to the house's field 'tasks' (task list)
			firebase.database().ref(`/houses/${house_id}/tasks/${newTaskRef.key}`).set( newTaskRef.key );
	});
}

/**
 * Updates the information regarding specified task.
 *
 * Args: taskId - ID for the task to be modified
 *       TaskObj - Object representing the task information
 */
export const updateTask = (taskId, {name, desc, day}) => {
	const { currentUser } = firebase.auth();
	firebase.database().ref(`/tasks/${taskId}`)
		.set({name, desc, day});
}

/**
 * Deletes a task. Removes all references to the taskId from houses, users
 * and the task object.
 */
export const deleteTask = (taskId) => {
	const { currentUser } = firebase.auth();

	// Delete task from tasks object (setting to {} removes the object)
	firebase.database().ref(`/tasks/${taskId}`).set({});

	// Delete task from house
	firebase.database().ref(`/users/${currentUser.uid}/house_id`)
		.on( 'value', (snapshot) => {
			const house_id = snapshot.val();
			firebase.database().ref(`/houses/${house_id}/tasks/${taskId}`).set({});
		});

	// Delete task from users
	firebase.database().ref(`/users/${currentUser.uid}/house_id`)
		.on( 'value', (snapshot) => { // Get houseId
			const house_id = snapshot.val();
			// Go to the house's users
			firebase.database().ref(`/houses/${house_id}/users`)
				.on('value', (snapshot) => {
					// Get array of user ID's
					const users = _.values(snapshot.val());

					// Delete the task for each user (user's without task nothing happens)
					for (const userId of users) {
						firebase.database().ref(`/users/${userId}/tasks/${taskId}`)
							.set({})
					}
				})
		});
}

/* Gets all the tasks for a specific house.
 *
 * Return: [Task1, Task2, {name: 'Trash Duty', desc: 'Take out kitch trash', ... }, ... ]
 */
export const fetchTasks = () => {
	const { currentUser } = firebase.auth();

	firebase.database().ref(`/users/${currentUser.uid}/tasks`)
		.on( 'value', (snapshot) => {

			const task_list = _.map(snapshot.val(), (val, uid) => {
				return { ...val, uid }; // { shift: 'Monday', name: 'S', id: 'U12341A4'}
			});

			console.log(task_list);
	});
}



/* Getter methods are used to display data. However, we cannot do actually use them
 * as a simple function call for complicated reasons. Here is the work around:
 *
 * Each getter body works correctly. To update some UI of a component, add the method
 * body of the associated getter inside "componentWillMount" for your component. modifiy 
 * the component state where the comment in the method body states to.
 *
 * Concrenete examples are located under componentWillMount() in /src/components/Test.js 
 */
export const getFirstName = () => {
	firebase.database().ref(`/users/${currentUser.uid}/first_name`)
		.on( 'value', (snapshot) => {
			const firstName = snapshot.val();
			// Set state here
	});
}

export const getLastName = () => {
	firebase.database().ref(`/users/${currentUser.uid}/last_name`)
		.on( 'value', (snapshot) => {
			const lastName = snapshot.val();
			// Set state here
	});
}

export const getHouseId = () => {
	const { currentUser } = firebase.auth();

	firebase.database().ref(`/users/${currentUser.uid}/house_id`)
		.once('value')
		.then(function(snapshot) {
			const hosueId = snapshot.val();
			// Set state here
		});
}

export const getHouseUsers = () => {
	const { currentUser } = firebase.auth();

	firebase.database().ref(`/houses/${house_id}/users`)
		.on( 'value', (snapshot) => {
			const userList = _.values(snapshot.val());
			// Set state here
	});
}

export const getHouseTasks = (house_id) => {
	const { currentUser } = firebase.auth();

	firebase.database().ref(`/houses/${house_id}/tasks`)
		.on( 'value', (snapshot) => {
			const tasks = _.values(snapshot.val());
			// Set state here
	});
}