import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useAuth} from '../context/AuthContext';
import {LoginScreen} from '../screens/LoginScreen';
import {HomeScreen} from '../screens/HomeScreen';
import {ProfileScreen} from '../screens/ProfileScreen';
import {ServiceSelectionScreen} from '../screens/ServiceSelectionScreen';
import {BusinessProfileScreen} from '../screens/BusinessProfileScreen';
import {ServiceHiredScreen} from '../screens/ServiceHiredScreen';
import {DeliveryScreen} from '../screens/DeliveryScreen';
import {HelpScreen} from '../screens/HelpScreen';
import {ServiceClosureScreen} from '../screens/ServiceClosureScreen';
import {ServiceFeedbackScreen} from '../screens/ServiceFeedbackScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Navegador de pestañas para la aplicación principal
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({color, size}) => (
            <Text style={{color, fontSize: size}}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Services"
        component={ServiceSelectionScreen}
        options={{
          tabBarLabel: 'Servicios',
          tabBarIcon: ({color, size}) => (
            <Text style={{color, fontSize: size}}>🔧</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({color, size}) => (
            <Text style={{color, fontSize: size}}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Navegador principal de la aplicación
export const AppNavigator = () => {
  const {state} = useAuth();
  const {isAuthenticated, isLoading} = state;

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!isAuthenticated ? (
          // Pantallas de autenticación
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          // Pantallas principales de la aplicación
          <>
            <Stack.Screen name="Main" component={MainTabNavigator} />
            <Stack.Screen
              name="BusinessProfile"
              component={BusinessProfileScreen}
            />
            <Stack.Screen name="ServiceHired" component={ServiceHiredScreen} />
            <Stack.Screen name="Delivery" component={DeliveryScreen} />
            <Stack.Screen name="Help" component={HelpScreen} />
            <Stack.Screen
              name="ServiceClosure"
              component={ServiceClosureScreen}
            />
            <Stack.Screen
              name="ServiceFeedback"
              component={ServiceFeedbackScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Importación necesaria para el componente de carga
import {View, Text} from 'react-native';
