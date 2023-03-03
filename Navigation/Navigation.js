// npm i --save @react-navigation/bottom-tabs @react-navigation/native

import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, FontAwesome} from '@expo/vector-icons';

import TodoListsScreen from "../Screen/TodoListsScreen";
import HomeScreen from "../Screen/HomeScreen";
import SignInScreen from "../Screen/SignInScreen";
import SignUpScreen from "../Screen/SignUpScreen";
import SignOutScreen from "../Screen/SignOutScreen";
import AdminScreen from "../Screen/AdminScreen";

import { TokenContext, UsernameContext } from "../Context/Context";

const Tab = createBottomTabNavigator();

const diffRoles = (token, username) => {
  if (username == "admin") {
    return (
      <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home" color={"#e91e63"} size={"20px"}/>
          ),
        }}/> 
        <Tab.Screen name="Admin" children={() => { return <AdminScreen token={token}/>; }}
        options={{
          tabBarLabel: 'Admin',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="account" color={"#e91e63"} size={"20px"}/>
          ),
        }} />
        <Tab.Screen name="SignOut" component={SignOutScreen} options={{
          tabBarLabel: 'SignOut',
          tabBarIcon: () => (
            <FontAwesome name="sign-out" color={"#e91e63"} size={"20px"}/>
          ),
        }} />
      </Tab.Navigator>
    );
  } else {
    return (
      <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}>
        <Tab.Screen name="Home" component={HomeScreen}  options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home" color={"#e91e63"} size={"20px"}/>
          ),
        }}/>
        <Tab.Screen
          name="TodoLists"
          children={() => {
            return <TodoListsScreen token={token} username={username}
            />;
          }}
          options={{
            tabBarLabel: 'TodoLists',
            tabBarIcon: () => (
              <FontAwesome name="clipboard" color={"#e91e63"} size={"20px"}/>
            ),
          }}
        />
        <Tab.Screen name="SignOut" component={SignOutScreen} options={{
          tabBarLabel: 'SignOut',
          tabBarIcon: () => (
            <FontAwesome name="sign-out" color={"#e91e63"} size={"20px"}/>
          ),
        }}/>
      </Tab.Navigator>
    );
  }
};

export default function Navigation() {
  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <UsernameContext.Consumer>
          {([username, setUsername]) => {
            return(
            <NavigationContainer>
              {token == null ? (
                <Tab.Navigator screenOptions={{
                  tabBarActiveTintColor: '#e91e63',
                }}>
                  <Tab.Screen name="SignIn" component={SignInScreen} options={{
          tabBarLabel: 'SignIn',
          tabBarIcon: () => (
            <FontAwesome name="sign-in" color={"#e91e63"} size={"20px"}/>
          ),
        }} />
                  <Tab.Screen name="SignUp" component={SignUpScreen} options={{
          tabBarLabel: 'SignUp',
          tabBarIcon: () => (
            <FontAwesome name="sign-in" color={"#e91e63"} size={"20px"}/>
          ),
        }}/>
                </Tab.Navigator>
              ) : (
                  diffRoles(token, username)
                )}
            </NavigationContainer>
          )}}
        </UsernameContext.Consumer>
      )}
    </TokenContext.Consumer>
  );
}
