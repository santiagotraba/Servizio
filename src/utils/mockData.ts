import {ServiceCategory, Service, Business, HiredService} from '../types';

// Categorías de servicios
export const mockServiceCategories: ServiceCategory[] = [
  {
    id: '1',
    name: 'Plomería',
    icon: '🔧',
    description: 'Servicios de fontanería y desatascos',
    services: [
      {
        id: '1',
        name: 'Reparación de fuga',
        description: 'Reparación de fugas de agua en tuberías y grifos',
        price: 45.0,
        duration: 60,
        category: '1',
      },
      {
        id: '2',
        name: 'Desatasco',
        description: 'Desatasco de tuberías y desagües',
        price: 35.0,
        duration: 45,
        category: '1',
      },
      {
        id: '3',
        name: 'Instalación de grifo',
        description: 'Instalación y cambio de grifos',
        price: 55.0,
        duration: 90,
        category: '1',
      },
    ],
  },
  {
    id: '2',
    name: 'Electricidad',
    icon: '⚡',
    description: 'Servicios eléctricos y instalaciones',
    services: [
      {
        id: '4',
        name: 'Reparación de enchufe',
        description: 'Reparación y cambio de enchufes',
        price: 40.0,
        duration: 45,
        category: '2',
      },
      {
        id: '5',
        name: 'Instalación de lámpara',
        description: 'Instalación de lámparas y luces',
        price: 30.0,
        duration: 30,
        category: '2',
      },
      {
        id: '6',
        name: 'Revisión eléctrica',
        description: 'Revisión completa de instalación eléctrica',
        price: 80.0,
        duration: 120,
        category: '2',
      },
    ],
  },
  {
    id: '3',
    name: 'Herrería',
    icon: '🔨',
    description: 'Trabajos de herrería y metalurgia',
    services: [
      {
        id: '7',
        name: 'Reparación de cerradura',
        description: 'Reparación y cambio de cerraduras',
        price: 50.0,
        duration: 60,
        category: '3',
      },
      {
        id: '8',
        name: 'Instalación de persiana',
        description: 'Instalación y reparación de persianas',
        price: 70.0,
        duration: 90,
        category: '3',
      },
    ],
  },
  {
    id: '4',
    name: 'Limpieza',
    icon: '🧹',
    description: 'Servicios de limpieza y mantenimiento',
    services: [
      {
        id: '9',
        name: 'Limpieza general',
        description: 'Limpieza completa de hogar u oficina',
        price: 60.0,
        duration: 180,
        category: '4',
      },
      {
        id: '10',
        name: 'Limpieza de ventanas',
        description: 'Limpieza de ventanas y cristales',
        price: 35.0,
        duration: 60,
        category: '4',
      },
    ],
  },
];

// Negocios mock
export const mockBusinesses: Business[] = [
  {
    id: '1',
    name: 'Carlos López',
    email: 'carlos@fontaneria.com',
    phone: '+34612345678',
    userType: 'business',
    businessName: 'Fontanería López',
    description:
      'Servicios profesionales de fontanería con más de 15 años de experiencia',
    address: 'Calle Mayor 123, Madrid',
    services: [mockServiceCategories[0]],
    workingHours: {
      monday: {open: '08:00', close: '18:00', available: true},
      tuesday: {open: '08:00', close: '18:00', available: true},
      wednesday: {open: '08:00', close: '18:00', available: true},
      thursday: {open: '08:00', close: '18:00', available: true},
      friday: {open: '08:00', close: '18:00', available: true},
      saturday: {open: '09:00', close: '14:00', available: true},
      sunday: {open: '00:00', close: '00:00', available: false},
    },
    verified: true,
    rating: 4.8,
    reviews: 127,
  },
  {
    id: '2',
    name: 'Ana Martínez',
    email: 'ana@electricidad.com',
    phone: '+34687654321',
    userType: 'business',
    businessName: 'Electricidad Martínez',
    description:
      'Instalaciones eléctricas profesionales y reparaciones urgentes',
    address: 'Avenida de la Paz 456, Barcelona',
    services: [mockServiceCategories[1]],
    workingHours: {
      monday: {open: '07:00', close: '19:00', available: true},
      tuesday: {open: '07:00', close: '19:00', available: true},
      wednesday: {open: '07:00', close: '19:00', available: true},
      thursday: {open: '07:00', close: '19:00', available: true},
      friday: {open: '07:00', close: '19:00', available: true},
      saturday: {open: '08:00', close: '16:00', available: true},
      sunday: {open: '00:00', close: '00:00', available: false},
    },
    verified: true,
    rating: 4.9,
    reviews: 89,
  },
];

// Servicios contratados mock
export const mockHiredServices: HiredService[] = [
  {
    id: '1',
    clientId: '1',
    businessId: '1',
    serviceId: '1',
    status: 'confirmed',
    scheduledDate: new Date('2024-01-15T10:00:00'),
    address: 'Calle Gran Vía 789, Madrid',
    description: 'Reparación de fuga en el baño principal',
    price: 45.0,
    createdAt: new Date('2024-01-14T15:30:00'),
    updatedAt: new Date('2024-01-14T16:00:00'),
  },
  {
    id: '2',
    clientId: '1',
    businessId: '2',
    serviceId: '4',
    status: 'completed',
    scheduledDate: new Date('2024-01-10T14:00:00'),
    address: 'Calle Gran Vía 789, Madrid',
    description: 'Reparación de enchufe en la cocina',
    price: 40.0,
    createdAt: new Date('2024-01-09T10:15:00'),
    updatedAt: new Date('2024-01-10T15:30:00'),
    rating: 5,
    review: 'Excelente servicio, muy profesional y puntual',
  },
];

// Función para obtener servicios por categoría
export const getServicesByCategory = (categoryId: string): Service[] => {
  const category = mockServiceCategories.find(cat => cat.id === categoryId);
  return category ? category.services : [];
};

// Función para obtener negocio por ID
export const getBusinessById = (businessId: string): Business | undefined => {
  return mockBusinesses.find(business => business.id === businessId);
};

// Función para obtener servicio por ID
export const getServiceById = (serviceId: string): Service | undefined => {
  for (const category of mockServiceCategories) {
    const service = category.services.find(s => s.id === serviceId);
    if (service) return service;
  }
  return undefined;
};

// Función para obtener servicios contratados por cliente
export const getHiredServicesByClient = (clientId: string): HiredService[] => {
  return mockHiredServices.filter(service => service.clientId === clientId);
};
