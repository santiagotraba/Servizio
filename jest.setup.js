// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => ({
    GestureHandlerRootView: 'GestureHandlerRootView',
    PanGestureHandler: 'PanGestureHandler',
    State: {},
    ScrollView: 'ScrollView',
}));

// Mock react-native-vector-icons
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
