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
import {
  getHiredServicesByClient,
  getServiceById,
  getBusinessById,
} from '../utils/mockData';
import {Button} from '../components/Button';

interface ServiceHiredScreenProps {
  navigation: any;
  route: any;
}

export const ServiceHiredScreen: React.FC<ServiceHiredScreenProps> = ({
  navigation,
  route,
}) => {
  const {serviceId} = route.params;

  // Buscar el servicio contratado
  const hiredService = getHiredServicesByClient('1').find(
    s => s.id === serviceId,
  );
  const service = hiredService ? getServiceById(hiredService.serviceId) : null;
  const business = hiredService
    ? getBusinessById(hiredService.businessId)
    : null;

  if (!hiredService || !service || !business) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Servicio no encontrado</Text>
        </View>
      </SafeAreaView>
    );
  }

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

  const handleTrackService = () => {
    navigation.navigate('Delivery', {serviceId});
  };

  const handleContactBusiness = () => {
    Alert.alert(
      'Contactar Negocio',
      `¿Deseas contactar a ${business.businessName}?`,
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Llamar',
          onPress: () => Alert.alert('Llamada', 'Funcionalidad próximamente'),
        },
        {
          text: 'Mensaje',
          onPress: () => Alert.alert('Mensaje', 'Funcionalidad próximamente'),
        },
      ],
    );
  };

  const handleCancelService = () => {
    Alert.alert(
      'Cancelar Servicio',
      '¿Estás seguro de que quieres cancelar este servicio?',
      [
        {text: 'No', style: 'cancel'},
        {
          text: 'Sí, Cancelar',
          style: 'destructive',
          onPress: () =>
            Alert.alert('Cancelado', 'Servicio cancelado exitosamente'),
        },
      ],
    );
  };

  const handleRateService = () => {
    if (hiredService.status === 'completed') {
      navigation.navigate('ServiceFeedback', {serviceId});
    } else {
      Alert.alert('No disponible', 'Solo puedes valorar servicios completados');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Detalle del Servicio</Text>
          <View style={styles.statusContainer}>
            <Text
              style={[
                styles.statusText,
                {color: getStatusColor(hiredService.status)},
              ]}>
              {getStatusText(hiredService.status)}
            </Text>
          </View>
        </View>

        {/* Service Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información del Servicio</Text>
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.serviceDescription}>{service.description}</Text>
            <View style={styles.serviceDetails}>
              <Text style={styles.detailLabel}>Precio:</Text>
              <Text style={styles.detailValue}>
                €{service.price.toFixed(2)}
              </Text>
            </View>
            <View style={styles.serviceDetails}>
              <Text style={styles.detailLabel}>Duración:</Text>
              <Text style={styles.detailValue}>{service.duration} minutos</Text>
            </View>
          </View>
        </View>

        {/* Business Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profesional Asignado</Text>
          <View style={styles.businessInfo}>
            <View style={styles.businessAvatar}>
              <Text style={styles.businessAvatarText}>
                {business.name.charAt(0)}
              </Text>
            </View>
            <View style={styles.businessDetails}>
              <Text style={styles.businessName}>{business.businessName}</Text>
              <Text style={styles.businessRating}>
                ⭐ {business.rating} ({business.reviews} reseñas)
              </Text>
              <Text style={styles.businessPhone}>{business.phone}</Text>
            </View>
          </View>
        </View>

        {/* Schedule Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Programación</Text>
          <View style={styles.scheduleInfo}>
            <View style={styles.scheduleItem}>
              <Text style={styles.scheduleLabel}>📅 Fecha:</Text>
              <Text style={styles.scheduleValue}>
                {new Date(hiredService.scheduledDate).toLocaleDateString(
                  'es-ES',
                )}
              </Text>
            </View>
            <View style={styles.scheduleItem}>
              <Text style={styles.scheduleLabel}>🕐 Hora:</Text>
              <Text style={styles.scheduleValue}>
                {new Date(hiredService.scheduledDate).toLocaleTimeString(
                  'es-ES',
                  {
                    hour: '2-digit',
                    minute: '2-digit',
                  },
                )}
              </Text>
            </View>
            <View style={styles.scheduleItem}>
              <Text style={styles.scheduleLabel}>📍 Dirección:</Text>
              <Text style={styles.scheduleValue}>{hiredService.address}</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descripción del Trabajo</Text>
          <Text style={styles.description}>{hiredService.description}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            title="Seguir Servicio"
            onPress={handleTrackService}
            variant="primary"
            style={styles.actionButton}
          />
          <Button
            title="Contactar"
            onPress={handleContactBusiness}
            variant="outline"
            style={styles.actionButton}
          />
        </View>

        {/* Additional Actions */}
        <View style={styles.additionalActions}>
          {hiredService.status === 'completed' && (
            <Button
              title="Valorar Servicio"
              onPress={handleRateService}
              variant="secondary"
              style={styles.additionalButton}
            />
          )}
          {hiredService.status !== 'completed' &&
            hiredService.status !== 'cancelled' && (
              <Button
                title="Cancelar Servicio"
                onPress={handleCancelService}
                variant="danger"
                style={styles.additionalButton}
              />
            )}
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#8E8E93',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  statusContainer: {
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginTop: 8,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  serviceInfo: {
    gap: 12,
  },
  serviceName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  serviceDescription: {
    fontSize: 16,
    color: '#8E8E93',
    lineHeight: 24,
  },
  serviceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 16,
    color: '#8E8E93',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  businessInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  businessAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  businessAvatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  businessDetails: {
    flex: 1,
  },
  businessName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  businessRating: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  businessPhone: {
    fontSize: 14,
    color: '#007AFF',
  },
  scheduleInfo: {
    gap: 12,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    width: 100,
  },
  scheduleValue: {
    fontSize: 16,
    color: '#8E8E93',
    flex: 1,
  },
  description: {
    fontSize: 16,
    color: '#1C1C1E',
    lineHeight: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  additionalActions: {
    padding: 16,
    paddingTop: 0,
  },
  additionalButton: {
    marginBottom: 12,
  },
});
