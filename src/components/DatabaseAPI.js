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

/* Sets the user's last name under 'last_name' field. */
export const setHasHouse = (has_house) => {
	const { currentUser } = firebase.auth();
	firebase.database().ref(`/users/${currentUser.uid}/has_house`)
		.set( has_house );
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
	return firebase.database().ref(`/users/${currentUser.uid}/house_id`)
		.set( house_name )
		.then(() => {
			firebase.database().ref(`/users/${currentUser.uid}/has_house`).set(true);            
		})
		.then(() => {
			// Add the userID the the household's field 'users' (user's list)
			firebase.database().ref(`/houses/${house_name}/users`)
				.push(currentUser.uid)
				.then(() => {
					firebase.database().ref(`/houses/${house_name}/cur_user`).set(0);
				});
		});
}

/**
 * Assigns the task for a specified user and task. Adding to their tasklist.
 *
 * Args: userId (string) - ID of user that will receive the task
 *       taskId (string) - ID of the task
 */
export const setUserTask = (userId, taskId) => {
	// Give task to user by adding it to user field 'tasks' (user's personal task list) 
	return firebase.database().ref(`/users/${userId}/tasks/${taskId}`).set( taskId );
}

/** 
 * Creates a new task for the household.
 *
 * Args: Task Object - Represents the task to be created
 */
export const createTask = ({name, desc, cycle, reminder, deadline, weight}) => {
	const { currentUser } = firebase.auth();

	// Create the task under the field and save the ID
	const newTaskRef = firebase.database().ref(`/tasks`).push( {name, desc, cycle, reminder, deadline, weight} );

	// Take task id, put it house's tasks.	
	firebase.database().ref(`/users/${currentUser.uid}/house_id`)
		.once('value')
		.then(function(snapshot) {
			// Get the houseID from the user making this task
			const house_id = snapshot.val();

			// Add the task to the house's field 'tasks' (task list)
			firebase.database().ref(`/houses/${house_id}/tasks/${newTaskRef.key}`).set( newTaskRef.key );

			// Assign the task to a user
			assignTask(newTaskRef.key);
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

	return firebase.database().ref(`/users/${currentUser.uid}/tasks`)

}

export const getUserTasks = () => {
	const { currentUser } = firebase.auth();

	return firebase.database().ref(`/users/${currentUser.uid}/tasks`).once('value')
		.then((snapshot) => {
			const task_ids = _.values(snapshot.val());
			var task_promises = []
			for (taskID of task_ids) {
                console.log(taskID);
                task_promises.push(
                    firebase.database().ref(`/tasks/${taskID}`).once('value').then( snapshot => {return snapshot.val();})
                );
            }
            return Promise.all(task_promises);
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
	const { currentUser } = firebase.auth();
	return firebase.database().ref(`/users/${currentUser.uid}/first_name`);
}

export const getLastName = () => {
	const { currentUser } = firebase.auth();

	return firebase.database().ref(`/users/${currentUser.uid}/last_name`);
}

export const getHouseId = () => {
	const { currentUser } = firebase.auth();

	return firebase.database().ref(`/users/${currentUser.uid}/house_id`);
}

export const getHouseUsers = () => {
	const { currentUser } = firebase.auth();

	return getHouseId().once('value').then( function(snapshot) {
		var house_id = snapshot.val();
		return firebase.database().ref(`/houses/${house_id}/users`).once('value')
			.then((snapshot) => {
				const user_ids = _.values(snapshot.val());
				var user_promises = []
				for (user_id of user_ids) {
                    console.log(user_id);
                    user_promises.push(
                        firebase.database().ref(`/users/${user_id}`).once('value').then( snapshot => { console.log(snapshot); return { ...snapshot.val(), user_id: snapshot.key }; })
                    );
                }
                return Promise.all(user_promises);
			});
	});
}

/* Returns a Promise.all that contains a list of promises that contain all the user tasks */
export const getHouseTasks = () => {
	const { currentUser } = firebase.auth();

	return getHouseId().once('value').then( function(snapshot) {
		var house_id = snapshot.val();
		return firebase.database().ref(`/houses/${house_id}/tasks`).once('value')
			.then((snapshot) => {
				const task_ids = _.values(snapshot.val());
				var task_promises = []
				for (taskID of task_ids) {
                    console.log(taskID);
                    task_promises.push(
                        firebase.database().ref(`/tasks/${taskID}`).once('value').then( snapshot => {console.log(snapshot.key); return { ...snapshot.val(), task_id: snapshot.key};})
                    );
                }
                return Promise.all(task_promises);
			});
	});
}

export const assignTask = (taskId) => {
	const { currentUser } = firebase.auth();
	return getHouseId().once('value').then( function(snapshot) {
		var house_id = snapshot.val();
		console.log("ok1");

		// Get current user index
		return firebase.database().ref(`/houses/${house_id}/cur_user`).once('value')
			.then((snapshot) => {
				// Assign the task to correct user
				return getHouseUsers().then( function(userList) {
					console.log("ok3");
					const cur_user_indx = snapshot.val();

					console.log(userList);
					console.log(userList[cur_user_indx]);
					console.log(userList[cur_user_indx].user_id);

					// Set current user
					return setUserTask( userList[cur_user_indx].user_id, taskId).then(() => {
						// Update current user index
						console.log("Set cur index to " + ((cur_user_indx + 1) % userList.length).toString() );
						return firebase.database().ref(`/houses/${house_id}/cur_user`).set(((cur_user_indx + 1) % userList.length));
					})
				});
			});
	});
}


export const reassignAllTasks = () => {
	const { currentUser } = firebase.auth();
	getHouseUsers().then((userList) => {
		const user_id_list = _.map(userList, (val, uid) => {
			return val.user_id;
		});
		// Delete
		task_delete_promises = []
		for (userId of user_id_list) {
			task_delete_promises.push(firebase.database().ref(`/users/${userId}/tasks`).set({}));
		}
		Promise.all(task_delete_promises).then(() => {
			getHouseTasks().then((task_list) => {
				getHouseId().once('value', (snapshot) => {
					const house_id = snapshot.val();
					firebase.database().ref(`/houses/${house_id}/cur_user`).set(0).then(() => {

						// We do this funny loop because assign runs too quickly and
						// cur_user will be 0 still when the second assign is called.
						var p = Promise.resolve(); // Q() in q
						task_list.forEach(task =>{
					    	p = p.then(() => assignTask(task.task_id)); 
						});

					});
				});
			});
		});

	});
}
