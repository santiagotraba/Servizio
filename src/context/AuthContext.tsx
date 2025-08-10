import React, {createContext, useContext, useReducer, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {User, AuthState} from '../types';

// Estado inicial
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

// Acciones
type AuthAction =
  | {type: 'LOGIN_SUCCESS'; payload: User}
  | {type: 'LOGIN_FAILURE'}
  | {type: 'LOGOUT'}
  | {type: 'SET_LOADING'; payload: boolean};

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

// Contexto
interface AuthContextType {
  state: AuthState;
  login: (
    email: string,
    password: string,
    userType: 'client' | 'business',
  ) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Datos mock para autenticación
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan@example.com',
    phone: '+34612345678',
    userType: 'client',
    rating: 4.5,
    reviews: 12,
  },
  {
    id: '2',
    name: 'María García',
    email: 'maria@example.com',
    phone: '+34687654321',
    userType: 'business',
    rating: 4.8,
    reviews: 45,
  },
];

// Provider
export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Verificar si el usuario está autenticado al cargar la app
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        dispatch({type: 'LOGIN_SUCCESS', payload: user});
      } else {
        dispatch({type: 'SET_LOADING', payload: false});
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      dispatch({type: 'SET_LOADING', payload: false});
    }
  };

  const login = async (
    email: string,
    password: string,
    userType: 'client' | 'business',
  ): Promise<boolean> => {
    dispatch({type: 'SET_LOADING', payload: true});

    try {
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Buscar usuario mock
      const user = mockUsers.find(
        u => u.email === email && u.userType === userType,
      );

      if (user && password === '123456') {
        // Contraseña mock
        await AsyncStorage.setItem('user', JSON.stringify(user));
        dispatch({type: 'LOGIN_SUCCESS', payload: user});
        return true;
      } else {
        dispatch({type: 'LOGIN_FAILURE'});
        return false;
      }
    } catch (error) {
      console.error('Error during login:', error);
      dispatch({type: 'LOGIN_FAILURE'});
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('user');
      dispatch({type: 'LOGOUT'});
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (state.user) {
      const updatedUser = {...state.user, ...userData};
      dispatch({type: 'LOGIN_SUCCESS', payload: updatedUser});
      AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    state,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
