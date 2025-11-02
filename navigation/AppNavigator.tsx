import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import TransactionsScreen from "../screens/TransactionsScreen";
import AddTransactionScreen from "../screens/AddTransactionScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name == "Home") {
            iconName = "home";
          } else if (route.name == "Transactions") {
            iconName = "list";
          } else {
            iconName = "ellipse";
          }

          return (
            <Ionicons name={iconName} size={size} color={color}></Ionicons>
          );
        },

        tabBarActiveTintColor: "#2ecc71",
        tabBarInactiveTintColor: "#7f8c8d",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Resumo" }}
      />

      <Tab.Screen
        name="Transactions"
        component={TransactionsScreen}
        options={{ title: "Histórico" }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="AddTransaction"
          component={AddTransactionScreen}
          options={{ title: "Nova transação", presentation: "modal" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
