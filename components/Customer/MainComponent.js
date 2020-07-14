// import React, { Component } from 'react';
// import Menu from './MenuComponent';
// import Dishdetail from './DishdetailComponent';
// import Contact from './ContactComponent';
// import About from './AboutComponent';
// import Reservation from './ReservationComponent';
// import Favorites from './FavoriteComponent';
// import Login from './LoginComponent';
// import { createAppContainer } from 'react-navigation';

// import {
//   View,
//   Platform,
//   Text,
//   ScrollView,
//   Image,
//   StyleSheet,
// } from 'react-native';
// //import { SafeAreaView } from 'react-navigation';
// import SafeAreaView from 'react-native-safe-area-view';
// import { createStackNavigator } from 'react-navigation-stack';
// import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
// import Home from './HomeComponent';
// import { Icon } from 'react-native-elements';

// import { connect } from 'react-redux';
// import {
//   fetchDishes,
//   fetchComments,
//   fetchPromos,
//   fetchLeaders,
// } from '../redux/ActionCreators';

// const mapStateToProps = (state) => {
//   return {};
// };

// const mapDispatchToProps = (dispatch) => ({
//   fetchDishes: () => dispatch(fetchDishes()),
//   fetchComments: () => dispatch(fetchComments()),
//   fetchPromos: () => dispatch(fetchPromos()),
//   fetchLeaders: () => dispatch(fetchLeaders()),
// });

// // const MenuNavigator = createStackNavigator(
// //   {
// //     Menu: {
// //       screen: Menu,
// //       navigationOptions: ({ navigation }) => ({
// //         headerLeft: (
// //           <Icon
// //             name='menu'
// //             size={24}
// //             color='white'
// //             onPress={() => navigation.toggleDrawer()}
// //           />
// //         ),
// //       }),
// //     },
// //     Dishdetail: { screen: Dishdetail },
// //   },
// //   {
// //     initialRouteName: 'Menu',
// //     navigationOptions: {
// //       headerStyle: {
// //         backgroundColor: '#512DA8',
// //       },
// //       headerTintColor: '#fff',
// //       headerTitleStyle: {
// //         color: '#fff',
// //       },
// //     },
// //   }
// // );

// // const HomeNavigator = createStackNavigator(
// //   {
// //     Home: { screen: Home },
// //   },
// //   {
// //     navigationOptions: ({ navigation }) => ({
// //       headerStyle: {
// //         backgroundColor: '#512DA8',
// //       },
// //       headerTitleStyle: {
// //         color: '#fff',
// //       },
// //       headerTintColor: '#fff',
// //     }),
// //   }
// // );

// // const ReservationNavigator = createStackNavigator(
// //   {
// //     Reservation: { screen: Reservation },
// //   },
// //   {
// //     navigationOptions: ({ navigation }) => ({
// //       headerStyle: {
// //         backgroundColor: '#512DA8',
// //       },
// //       headerTitleStyle: {
// //         color: '#fff',
// //       },
// //       headerTintColor: '#fff',
// //       headerLeft: (
// //         <Icon
// //           name='menu'
// //           size={24}
// //           iconStyle={{ color: 'white' }}
// //           onPress={() => navigation.navigate('DrawerToggle')}
// //         />
// //       ),
// //     }),
// //   }
// // );

// // const FavoritesNavigator = createStackNavigator(
// //   {
// //     Favorites: { screen: Favorites },
// //   },
// //   {
// //     navigationOptions: ({ navigation }) => ({
// //       headerStyle: {
// //         backgroundColor: '#512DA8',
// //       },
// //       headerTitleStyle: {
// //         color: '#fff',
// //       },
// //       headerTintColor: '#fff',
// //       headerLeft: (
// //         <Icon
// //           name='menu'
// //           size={24}
// //           iconStyle={{ color: 'white' }}
// //           onPress={() => navigation.navigate('DrawerToggle')}
// //         />
// //       ),
// //     }),
// //   }
// // );

// // const ContactNavigator = createStackNavigator(
// //   {
// //     Contact: { screen: Contact },
// //   },
// //   {
// //     navigationOptions: ({ navigation }) => ({
// //       headerStyle: {
// //         backgroundColor: '#512DA8',
// //       },
// //       headerTitleStyle: {
// //         color: '#fff',
// //       },
// //       headerTintColor: '#fff',
// //     }),
// //   }
// // );

// // const AboutNavigator = createStackNavigator(
// //   {
// //     About: { screen: About },
// //   },
// //   {
// //     navigationOptions: ({ navigation }) => ({
// //       headerStyle: {
// //         backgroundColor: '#512DA8',
// //       },
// //       headerTitleStyle: {
// //         color: '#fff',
// //       },
// //       headerTintColor: '#fff',
// //     }),
// //   }
// // );

// // const LoginNavigator = createStackNavigator(
// //   {
// //     Login: Login,
// //   },
// //   {
// //     navigationOptions: ({ navigation }) => ({
// //       headerStyle: {
// //         backgroundColor: '#512DA8',
// //       },
// //       headerTitleStyle: {
// //         color: '#fff',
// //       },
// //       title: 'Login',
// //       headerTintColor: '#fff',
// //       headerLeft: (
// //         <Icon
// //           name='menu'
// //           size={24}
// //           iconStyle={{ color: 'white' }}
// //           onPress={() => navigation.toggleDrawer()}
// //         />
// //       ),
// //     }),
// //   }
// // );

// const MainNavigator = createDrawerNavigator(
//   {
//     // Login: {
//     //   screen: LoginNavigator,
//     //   navigationOptions: {
//     //     title: 'Login',
//     //     drawerLabel: 'Login',
//     //     drawerIcon: ({ tintColor, focused }) => (
//     //       <Icon
//     //         name='sign-in'
//     //         type='font-awesome'
//     //         size={24}
//     //         iconStyle={{ color: tintColor }}
//     //       />
//     //     ),
//     //   },
//     // },

//     // Home: {
//     //   screen: HomeNavigator,
//     //   navigationOptions: {
//     //     drawerLabel: 'Home',
//     //     drawerIcon: ({ tintColor, focused }) => (
//     //       <Icon name='home' type='font-awesome' size={24} color={tintColor} />
//     //     ),
//     //     title: 'Home',
//     //     drawerLabel: 'Home',
//     //   },
//     // },

//     // About: {
//     //   screen: AboutNavigator,
//     //   navigationOptions: {
//     //     drawerLabel: 'About Us',
//     //     drawerIcon: ({ tintColor, focused }) => (
//     //       <Icon
//     //         name='info-circle'
//     //         type='font-awesome'
//     //         size={24}
//     //         color={tintColor}
//     //       />
//     //     ),
//     //     title: 'About',
//     //     drawerLabel: 'About',
//     //   },
//     // },

//     // Menu: {
//     //   screen: MenuNavigator,
//     //   navigationOptions: {
//     //     drawerLabel: 'Menu',
//     //     drawerIcon: ({ tintColor, focused }) => (
//     //       <Icon name='list' type='font-awesome' size={24} color={tintColor} />
//     //     ),
//     //     title: 'Menu',
//     //     drawerLabel: 'Menu',
//     //   },
//     // },

//     // Favorites: {
//     //   screen: FavoritesNavigator,
//     //   navigationOptions: {
//     //     title: 'My Favorites',
//     //     drawerLabel: 'My Favorites',
//     //     drawerIcon: ({ tintColor, focused }) => (
//     //       <Icon
//     //         name='heart'
//     //         type='font-awesome'
//     //         size={24}
//     //         iconStyle={{ color: tintColor }}
//     //       />
//     //     ),
//     //   },
//     // },

//     Landing: {
//       screen: 'Landing',
//       navigationOptions: {
//         title: 'Reserve Table',
//         drawerLabel: 'Reserve Table',
//         drawerIcon: ({ tintColor, focused }) => (
//           <Icon
//             name='cutlery'
//             type='font-awesome'
//             size={24}
//             iconStyle={{ color: tintColor }}
//           />
//         ),
//         title: 'Reservation',
//         drawerLabel: 'Reservation',
//       },
//     },
//     Login: {
//       screen: 'Login',
//       navigationOptions: {
//         title: 'Contact Us',
//         drawerLabel: 'Contact Us',
//         drawerIcon: ({ tintColor, focused }) => (
//           <Icon
//             name='address-card'
//             type='font-awesome'
//             size={22}
//             color={tintColor}
//           />
//         ),
//         title: 'Contact',
//         drawerLabel: 'Contact',
//       },
//     },
//   },

//   {
//     initialRouteName: 'Landing',
//     drawerBackgroundColor: '#D1C4E9',
//     contentComponent: CustomDrawerContentComponent,
//   }
// );

// const ContainerNavigator = createAppContainer(MainNavigator);

// const CustomDrawerContentComponent = (props) => (
//   <ScrollView>
//     <SafeAreaView
//       style={styles.container}
//       forceInset={{ top: 'always', horizontal: 'never' }}
//     >
//       <View style={styles.drawerHeader}>
//         <View style={{ flex: 1 }}>
//           <Image
//             source={require('./images/logo.png')}
//             style={styles.drawerImage}
//           />
//         </View>
//         <View style={{ flex: 2 }}>
//           <Text style={styles.drawerHeaderText}>Sawari</Text>
//         </View>
//       </View>
//       <DrawerItems {...props} />
//     </SafeAreaView>
//   </ScrollView>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   drawerHeader: {
//     backgroundColor: '#512DA8',
//     height: 140,
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//     flexDirection: 'row',
//   },
//   drawerHeaderText: {
//     color: 'white',
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   drawerImage: {
//     margin: 10,
//     width: 80,
//     height: 60,
//   },
// });

// class Main extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       showBusiness: false,
//     };
//   }

//   componentDidMount() {
//     this.props.fetchDishes();
//     this.props.fetchComments();
//     this.props.fetchPromos();
//     this.props.fetchLeaders();
//   }

//   render() {
//     return (
//       <View
//         style={{
//           flex: 1,
//           paddingTop:
//             Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,
//         }}
//       >
//         {/* <Text>Wroking...........</Text> */}
//         <MainNavigator />
//       </View>
//     );
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Main);
