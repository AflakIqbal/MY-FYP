import React from 'react';
import {
  createSwitchNavigator,
  createAppContainer,
  NavigationActions,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//import LoginScreen from "../screens/Auth/LoginScreen";
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';

import Landing from './landingPage';
import Login from './Owner/LoginComponent';
import Menu from './Owner/MenuComponent';
import About from './Owner/AboutComponent';
import Contact from './Owner/ContactComponent';
//import DishDetail from './Owner/DishdetailComponent';
import DishDetail from './Owner/VehicleDetails';
import Favorites from './Owner/FavoriteComponent';
import Reservation from './Owner/ReservationComponent';
import Home from './Owner/HomeComponent';
import UserProfileView from './Owner/profile';
import Booking from './Owner/Booking-History';

import {
  View,
  Platform,
  Text,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
//import { SafeAreaView } from 'react-navigation';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from 'react-native-elements';

const CustomDrawerContentComponent = (props) => (
  <SafeAreaProvider>
    <ScrollView>
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: 'always', horizontal: 'never' }}
      >
        <View style={styles.drawerHeader}>
          <View style={{ flex: 1 }}>
            <Image
              source={require('./images/sideLogo.png')}
              style={styles.drawerImage}
            />
          </View>
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 2 }}>
            <Text style={styles.drawerHeaderText}>Sawari</Text>
          </View>
        </View>
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#800080',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
  },
  drawerImage: {
    marginLeft: 15,
    width: 80,
    height: 100,
  },
});

const AppNavigator = createSwitchNavigator({
  login: createStackNavigator(
    {
      Landing: {
        screen: Landing,
        navigationOptions: ({ navigation }) => ({
          headerLeft: (
            <Icon
              name='Landing'
              size={24}
              color='white'
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        }),
      },
      Login: Login,
    },
    {
      initialRouteName: 'Landing',
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#512DA8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: '#fff',
        },
      },
      defaultNavigationOptions: {
        headerShown: true,
      },
    }
  ),

  main: createDrawerNavigator(
    {
      Profile: createStackNavigator(
        {
          UserProfileView: UserProfileView,
        },
        {
          initialRouteName: 'UserProfileView',
          defaultNavigationOptions: {
            headerShown: true,
            title: 'My Profile',
          },
        }
      ),
      // Home: createStackNavigator(
      //   {
      //     Home: Home,
      //   },
      //   {
      //     initialRouteName: 'Home',
      //     defaultNavigationOptions: {
      //       headerShown: true,
      //     },
      //   }
      // ),
      About: createStackNavigator(
        {
          About: About,
        },
        {
          initialRouteName: 'About',
          defaultNavigationOptions: {
            headerShown: true,
          },
        }
      ),
      Vehicles: createStackNavigator(
        {
          Vehicles: Menu,
          Detail: DishDetail,
          New: Reservation,
        },
        {
          initialRouteName: 'Vehicles',
          defaultNavigationOptions: {
            headerShown: true,
          },
        }
      ),

      Reservation: createStackNavigator(
        {
          Reservation: Reservation,
        },
        {
          initialRouteName: 'Reservation',
          defaultNavigationOptions: {
            headerShown: true,
          },
        }
      ),

      Booking: createStackNavigator(
        {
          Booking: Booking,
        },
        {
          initialRouteName: 'Booking',
          defaultNavigationOptions: {
            headerShown: true,
          },
        }
      ),
      // Favorites: createStackNavigator(
      //   {
      //     Favorites: Favorites,
      //   },
      //   {
      //     initialRouteName: 'Favorites',
      //     defaultNavigationOptions: {
      //       headerShown: true,
      //     },
      //   }
      // ),
      Contact: createStackNavigator(
        {
          Contact: Contact,
        },
        {
          initialRouteName: 'Contact',
          defaultNavigationOptions: {
            headerShown: true,
          },
        }
      ),
    },

    {
      initialRouteName: 'Profile',
      drawerBackgroundColor: '#D1C4E9',
      contentComponent: CustomDrawerContentComponent,
      defaultNavigationOptions: {
        headerShown: true,
      },
    }
  ),
});

export default createAppContainer(AppNavigator);
