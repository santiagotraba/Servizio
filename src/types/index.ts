// Tipos de usuario
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  userType: 'client' | 'business';
  rating?: number;
  reviews?: number;
}

// Tipos de negocio
export interface Business extends User {
  businessName: string;
  description: string;
  address: string;
  services: ServiceCategory[];
  workingHours: WorkingHours;
  verified: boolean;
}

// Categorías de servicios
export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  services: Service[];
}

// Servicios individuales
export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // en minutos
  category: string;
}

// Horarios de trabajo
export interface WorkingHours {
  monday: {open: string; close: string; available: boolean};
  tuesday: {open: string; close: string; available: boolean};
  wednesday: {open: string; close: string; available: boolean};
  thursday: {open: string; close: string; available: boolean};
  friday: {open: string; close: string; available: boolean};
  saturday: {open: string; close: string; available: boolean};
  sunday: {open: string; close: string; available: boolean};
}

// Servicio contratado
export interface HiredService {
  id: string;
  clientId: string;
  businessId: string;
  serviceId: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  scheduledDate: Date;
  address: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  rating?: number;
  review?: string;
}

// Estado de navegación
export interface RootStackParamList {
  Login: undefined;
  Main: undefined;
  Home: undefined;
  Profile: undefined;
  ServiceSelection: undefined;
  BusinessProfile: {businessId: string};
  ServiceHired: {serviceId: string};
  Delivery: {serviceId: string};
  Help: undefined;
  ServiceClosure: {serviceId: string};
  ServiceFeedback: {serviceId: string};
}

// Estado de autenticación
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Estado de la aplicación
export interface AppState {
  auth: AuthState;
  services: ServiceCategory[];
  hiredServices: HiredService[];
  selectedCategory: string | null;
}
