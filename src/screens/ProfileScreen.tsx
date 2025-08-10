import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuth} from '../context/AuthContext';
import {Button} from '../components/Button';
import {getHiredServicesByClient} from '../utils/mockData';

interface ProfileScreenProps {
  navigation: any;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {
  const {state, logout} = useAuth();
  const {user} = state;

  const userServices = getHiredServicesByClient(user?.id || '');

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: logout,
        },
      ],
    );
  };

  const handleEditProfile = () => {
    // TODO: Implementar edición de perfil
    Alert.alert(
      'Próximamente',
      'La edición de perfil estará disponible pronto',
    );
  };

  const handleViewHistory = () => {
    navigation.navigate('ServiceSelection');
  };

  const handleHelp = () => {
    navigation.navigate('Help');
  };

  const handleSettings = () => {
    Alert.alert('Próximamente', 'La configuración estará disponible pronto');
  };

  const formatUserType = (userType: string) => {
    return userType === 'client' ? 'Cliente' : 'Negocio';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#34C759';
      case 'in_progress':
        return '#FF9500';
      case 'confirmed':
        return '#007AFF';
      case 'pending':
        return '#8E8E93';
      default:
        return '#8E8E93';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'in_progress':
        return 'En progreso';
      case 'confirmed':
        return 'Confirmado';
      case 'pending':
        return 'Pendiente';
      default:
        return 'Desconocido';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Mi Perfil</Text>
        </View>

        {/* User Info */}
        <View style={styles.userInfoCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>{user?.name?.charAt(0) || 'U'}</Text>
          </View>

          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user?.name}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
            <Text style={styles.userPhone}>{user?.phone}</Text>
            <View style={styles.userTypeContainer}>
              <Text style={styles.userTypeLabel}>Tipo:</Text>
              <Text style={styles.userType}>
                {formatUserType(user?.userType || '')}
              </Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{userServices.length}</Text>
            <Text style={styles.statLabel}>Servicios</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {userServices.filter(s => s.status === 'completed').length}
            </Text>
            <Text style={styles.statLabel}>Completados</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {user?.rating ? user.rating.toFixed(1) : 'N/A'}
            </Text>
            <Text style={styles.statLabel}>Valoración</Text>
          </View>
        </View>

        {/* Recent Services */}
        {userServices.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Servicios Recientes</Text>
            {userServices.slice(0, 3).map(service => (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceItem}
                onPress={() =>
                  navigation.navigate('ServiceHired', {serviceId: service.id})
                }>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>Servicio #{service.id}</Text>
                  <Text style={styles.serviceDate}>
                    {new Date(service.scheduledDate).toLocaleDateString(
                      'es-ES',
                    )}
                  </Text>
                </View>
                <View style={styles.serviceStatus}>
                  <Text
                    style={[
                      styles.statusText,
                      {color: getStatusColor(service.status)},
                    ]}>
                    {getStatusText(service.status)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Menu Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Opciones</Text>

          <TouchableOpacity style={styles.menuItem} onPress={handleEditProfile}>
            <Text style={styles.menuIcon}>✏️</Text>
            <Text style={styles.menuText}>Editar Perfil</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleViewHistory}>
            <Text style={styles.menuIcon}>📋</Text>
            <Text style={styles.menuText}>Historial de Servicios</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleHelp}>
            <Text style={styles.menuIcon}>❓</Text>
            <Text style={styles.menuText}>Ayuda y Soporte</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleSettings}>
            <Text style={styles.menuIcon}>⚙️</Text>
            <Text style={styles.menuText}>Configuración</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <Button
            title="Cerrar Sesión"
            onPress={handleLogout}
            variant="danger"
            style={styles.logoutButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  userInfoCard: {
    backgroundColor: '#FFFFFF',
    margin: 24,
    marginTop: 0,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatar: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
  },
  userTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userTypeLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginRight: 4,
  },
  userType: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  serviceItem: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginBottom: 8,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  serviceDate: {
    fontSize: 14,
    color: '#8E8E93',
  },
  serviceStatus: {
    alignItems: 'flex-end',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginBottom: 8,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#1C1C1E',
  },
  menuArrow: {
    fontSize: 18,
    color: '#C7C7CC',
    fontWeight: '300',
  },
  logoutContainer: {
    padding: 24,
    paddingTop: 0,
  },
  logoutButton: {
    marginTop: 16,
  },
});
