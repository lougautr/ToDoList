const API_URL = "http://127.0.0.1:4000";
//const API_URL = 'http://192.168.249.188:4000'
const SIGN_IN =
  "mutation($username:String!, $password:String!){signIn(username:$username, password:$password)}";

const SIGN_UP =
  "mutation($username:String!, $password:String!){signUp(username:$username, password:$password)}";

const GET_TODO_LISTS =
  "query($username:String!) {tasks(where:{owner:{username :$username} }) {id title done}}";
  
const ADD_TODO_LIST =
  "mutation($title: String!, $username: String!) {createTasks(input: {title: $title, done:false, owner: { connect: { where: { username: $username } } } }) {tasks { id title}}} "

const DELETE_TODO =
  "mutation($id: ID!){deleteTasks(where: {id: $id}){nodesDeleted}}";

const UPDATE_TODO =
  "mutation($id: ID!, $done: Boolean!){updateTasks(where: {id: $id}, update: {done: $done}){tasks {id title done}}}";

  const GET_USERS =
  "query {users {id username}}";

  const DELETE_USER =
  "mutation($id: ID!){deleteUsers(where: {id: $id}){nodesDeleted}}";

export function signIn(username, password) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: SIGN_IN,
      variables: {
        username: username,
        password: password,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.signIn;
    })
    .catch((error) => {
      throw error;
    });
}

export function signUp(username, password) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: SIGN_UP,
      variables: {
        username: username,
        password: password,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.signUp;
    })
    .catch((error) => {
      throw error;
    });
}

export function getTodoLists(username, token) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      query: GET_TODO_LISTS,
      variables: {
        username: username,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.tasks;
    })
    .catch((error) => {
      throw error;
    });
}

export function addTodoList(title, username, token) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      query: ADD_TODO_LIST,
      variables: {
        title: title,
        username: username,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.createTasks.tasks[0];
    })
    .catch((error) => {
      throw error;
    });
}

export function deleteTodoList(id, token) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      query: DELETE_TODO,
      variables: {
        id: id,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function updateTodoList(id, done, token) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      query: UPDATE_TODO,
      variables: {
        id: id,
        done: done,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.updateTasks.tasks[0];
    })
    .catch((error) => {
      throw error;
    });
}

export function getUsers(token) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      query: GET_USERS,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.users;
    })
    .catch((error) => {
      throw error;
    });
}

export function deleteUser(id, token) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      query: DELETE_USER,
      variables: {
        id: id,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data;
    })
    .catch((error) => {
      throw error;
    });
}
