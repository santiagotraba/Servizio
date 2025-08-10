# Serviz.io - Aplicación Móvil de Servicios

Una aplicación móvil nativa desarrollada con React Native que conecta usuarios con proveedores de servicios profesionales de confianza.

## 🚀 Características

### Funcionalidades Implementadas (Sprint 1)

#### Autenticación y Usuarios

- ✅ Sistema de login con autenticación local (mock)
- ✅ Soporte para usuarios cliente y negocio
- ✅ Persistencia de sesión con AsyncStorage
- ✅ Perfil de usuario con estadísticas

#### Navegación y UI

- ✅ Navegación completa con React Navigation
- ✅ Navegación por pestañas (Home, Servicios, Perfil)
- ✅ Navegación por stack para pantallas específicas
- ✅ Diseño responsive y moderno

#### Gestión de Servicios

- ✅ Catálogo de categorías de servicios
- ✅ Búsqueda y filtrado de servicios
- ✅ Perfiles detallados de negocios
- ✅ Contratación de servicios
- ✅ Seguimiento en tiempo real del servicio
- ✅ Sistema de valoraciones y feedback

#### Pantallas Implementadas

1. **Login** - Autenticación de usuarios
2. **Home** - Pantalla principal con categorías y servicios recientes
3. **Profile** - Perfil de usuario con opciones
4. **ServiceSelection** - Selección y filtrado de servicios
5. **BusinessProfile** - Perfil detallado del negocio
6. **ServiceHired** - Detalle del servicio contratado
7. **Delivery** - Seguimiento del servicio en tiempo real
8. **Help** - Sistema de ayuda y soporte
9. **ServiceClosure** - Cierre y confirmación del servicio
10. **ServiceFeedback** - Valoración y opiniones

## 🛠️ Tecnologías Utilizadas

- **React Native** - Framework principal
- **TypeScript** - Tipado estático
- **React Navigation** - Navegación entre pantallas
- **Context API** - Gestión de estado global
- **AsyncStorage** - Persistencia local de datos

## 📱 Instalación y Configuración

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn
- React Native CLI
- Android Studio (para Android)
- Xcode (para iOS, solo macOS)

### Instalación

1. **Clonar el repositorio**

```bash
git clone <url-del-repositorio>
cd Servizio
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Instalar dependencias de iOS (solo macOS)**

```bash
cd ios && pod install && cd ..
```

4. **Ejecutar la aplicación**

Para Android:

```bash
npx react-native run-android
```

Para iOS:

```bash
npx react-native run-ios
```

## 🔐 Credenciales de Prueba

### Usuario Cliente

- **Email:** juan@example.com
- **Contraseña:** 123456

### Usuario Negocio

- **Email:** maria@example.com
- **Contraseña:** 123456

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Button.tsx      # Botón personalizado
│   ├── Input.tsx       # Campo de entrada
│   └── ServiceCard.tsx # Tarjeta de servicio
├── context/            # Contextos de React
│   └── AuthContext.tsx # Contexto de autenticación
├── navigation/         # Configuración de navegación
│   └── AppNavigator.tsx
├── screens/           # Pantallas de la aplicación
│   ├── LoginScreen.tsx
│   ├── HomeScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── ServiceSelectionScreen.tsx
│   ├── BusinessProfileScreen.tsx
│   ├── ServiceHiredScreen.tsx
│   ├── DeliveryScreen.tsx
│   ├── HelpScreen.tsx
│   ├── ServiceClosureScreen.tsx
│   └── ServiceFeedbackScreen.tsx
├── types/             # Definiciones de tipos TypeScript
│   └── index.ts
└── utils/             # Utilidades y datos mock
    └── mockData.ts
```

## 🎨 Diseño y UX

### Paleta de Colores

- **Primario:** #007AFF (Azul iOS)
- **Secundario:** #34C759 (Verde éxito)
- **Peligro:** #FF3B30 (Rojo error)
- **Fondo:** #F8F9FA (Gris claro)
- **Texto:** #1C1C1E (Negro)
- **Texto secundario:** #8E8E93 (Gris)

### Componentes Reutilizables

- **Button:** Botón con múltiples variantes (primary, secondary, outline, danger)
- **Input:** Campo de entrada con validación y estados
- **ServiceCard:** Tarjeta para mostrar servicios

## 🔄 Flujo de Usuario

1. **Login** → Usuario se autentica
2. **Home** → Ve categorías y servicios recientes
3. **ServiceSelection** → Busca y filtra servicios
4. **BusinessProfile** → Ve detalles del negocio
5. **ServiceHired** → Confirma contratación
6. **Delivery** → Sigue el progreso del servicio
7. **ServiceClosure** → Confirma finalización
8. **ServiceFeedback** → Valora el servicio

## 🚧 Próximas Funcionalidades

### Sprint 2 (Próximamente)

- [ ] Integración con APIs reales
- [ ] Sistema de pagos
- [ ] Notificaciones push
- [ ] Chat en tiempo real
- [ ] Geolocalización
- [ ] Sistema de citas
- [ ] Historial completo
- [ ] Configuraciones avanzadas

### Sprint 3 (Futuro)

- [ ] Autenticación con Google/Facebook
- [ ] Modo offline
- [ ] Análisis y métricas
- [ ] Sistema de recompensas
- [ ] Integración con calendario
- [ ] Exportación de datos

## 🐛 Solución de Problemas

### Errores Comunes

1. **Error de Metro Bundler**

```bash
npx react-native start --reset-cache
```

2. **Error de dependencias iOS**

```bash
cd ios && pod install && cd ..
```

3. **Error de Android**

```bash
cd android && ./gradlew clean && cd ..
```

## 📝 Notas de Desarrollo

### Estado de la Aplicación

- **Autenticación:** Mock local (sin backend)
- **Datos:** Mock data en `src/utils/mockData.ts`
- **Navegación:** React Navigation v6
- **Estado:** Context API (preparado para Redux)

### Preparado para Producción

- ✅ Estructura modular y escalable
- ✅ Tipos TypeScript completos
- ✅ Componentes reutilizables
- ✅ Navegación robusta
- ✅ Gestión de estado centralizada
- ✅ Estilos consistentes

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Soporte

Para soporte técnico o preguntas:

- Email: soporte@serviz.io
- Teléfono: +34 900 123 456

---

**Desarrollado con ❤️ para conectar profesionales con clientes**
