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
import Login1 from './Customer/LoginComponent';
import Menu from './Owner/MenuComponent';
import Menu1 from './Customer/MenuComponent';
import About from './Owner/AboutComponent';
import About1 from './Owner/AboutComponent';
import Contact from './Owner/ContactComponent';
import Contact1 from './Customer/ContactComponent';
//import DishDetail from './Owner/DishdetailComponent';
import current from './Owner/currentBookings';
import DishDetail from './Owner/VehicleDetails';
import Book1 from './Customer/BookVehicle';
import DishDetail1 from './Customer/VehicleDetails';
import Favorites from './Owner/FavoriteComponent';
import Reservation from './Owner/ReservationComponent';
import Reservation1 from './Customer/ReservationComponent';
import Ranking from './Customer/ranking';
import Home from './Owner/HomeComponent';
import UserProfileView from './Owner/profile';
import UserProfileView1 from './Customer/profile';
import Booking from './Owner/Booking-History';
import Booking1 from './Customer/Booking-History';
import EditInfo from './Owner/EditInformation';
import RentVehicle from './Customer/RentVehicle';
import Ranking1 from './Owner/ranking';

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
      Login1: Login1,
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
          EditInfo: EditInfo,
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

      // Reservation: createStackNavigator(
      //   {
      //     Reservation: Reservation,
      //   },
      //   {
      //     initialRouteName: 'Reservation',
      //     defaultNavigationOptions: {
      //       headerShown: true,
      //     },
      //   }
      // ),

      History: createStackNavigator(
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

      Bookings: createStackNavigator(
        {
          Bookings: current,
          Feedback: Ranking1,
        },
        {
          initialRouteName: 'Bookings',
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

  main1: createDrawerNavigator(
    {
      Profile: createStackNavigator(
        {
          UserProfileView: UserProfileView1,
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
          About: About1,
        },
        {
          initialRouteName: 'About',
          defaultNavigationOptions: {
            headerShown: true,
          },
        }
      ),
      RentVehicle: createStackNavigator(
        {
          RentVehicle: RentVehicle,
          Vehicles: Menu1,
          Detail: DishDetail1,
          Booking: Book1,
          feedback: Ranking,
        },
        {
          initialRouteName: 'RentVehicle',
          defaultNavigationOptions: {
            headerShown: true,
          },
        }
      ),

      // Reservation: createStackNavigator(
      //   {
      //     Reservation: Reservation,
      //   },
      //   {
      //     initialRouteName: 'Reservation',
      //     defaultNavigationOptions: {
      //       headerShown: true,
      //     },
      //   }
      // ),

      Booking: createStackNavigator(
        {
          Booking: Booking1,
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
          Contact: Contact1,
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
