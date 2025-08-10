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
import {getBusinessById, getServiceById} from '../utils/mockData';
import {Button} from '../components/Button';

interface BusinessProfileScreenProps {
  navigation: any;
  route: any;
}

export const BusinessProfileScreen: React.FC<BusinessProfileScreenProps> = ({
  navigation,
  route,
}) => {
  const {businessId, serviceId} = route.params;
  const business = getBusinessById(businessId);
  const selectedService = serviceId ? getServiceById(serviceId) : null;

  if (!business) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Negocio no encontrado</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleHireService = () => {
    if (selectedService) {
      Alert.alert(
        'Confirmar Servicio',
        `¿Deseas contratar "${
          selectedService.name
        }" por €${selectedService.price.toFixed(2)}?`,
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Contratar',
            onPress: () => {
              // TODO: Implementar contratación real
              Alert.alert(
                'Servicio Contratado',
                'El servicio ha sido contratado exitosamente. Te contactaremos pronto.',
                [
                  {
                    text: 'Ver Detalles',
                    onPress: () =>
                      navigation.navigate('ServiceHired', {serviceId: 'new'}),
                  },
                ],
              );
            },
          },
        ],
      );
    } else {
      navigation.navigate('ServiceSelection');
    }
  };

  const handleContact = () => {
    Alert.alert('Contactar', `¿Deseas contactar a ${business.businessName}?`, [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Llamar',
        onPress: () => {
          // TODO: Implementar llamada real
          Alert.alert('Llamada', 'Funcionalidad de llamada próximamente');
        },
      },
      {
        text: 'Enviar Mensaje',
        onPress: () => {
          // TODO: Implementar mensaje real
          Alert.alert('Mensaje', 'Funcionalidad de mensaje próximamente');
        },
      },
    ]);
  };

  const formatWorkingHours = (hours: any) => {
    const days = [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ];
    const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

    return days.map((day, index) => {
      const dayHours = hours[day];
      return {
        day: dayNames[index],
        hours: dayHours.available
          ? `${dayHours.open} - ${dayHours.close}`
          : 'Cerrado',
        available: dayHours.available,
      };
    });
  };

  const workingHours = formatWorkingHours(business.workingHours);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.businessInfo}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatar}>{business.name.charAt(0)}</Text>
            </View>
            <View style={styles.businessDetails}>
              <Text style={styles.businessName}>{business.businessName}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>⭐ {business.rating}</Text>
                <Text style={styles.reviews}>({business.reviews} reseñas)</Text>
              </View>
              {business.verified && (
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedText}>✓ Verificado</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Descripción</Text>
          <Text style={styles.description}>{business.description}</Text>
        </View>

        {/* Contact Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información de Contacto</Text>
          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>📧 Email:</Text>
            <Text style={styles.contactValue}>{business.email}</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>📞 Teléfono:</Text>
            <Text style={styles.contactValue}>{business.phone}</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>📍 Dirección:</Text>
            <Text style={styles.contactValue}>{business.address}</Text>
          </View>
        </View>

        {/* Working Hours */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Horarios de Trabajo</Text>
          <View style={styles.workingHoursContainer}>
            {workingHours.map((day, index) => (
              <View key={index} style={styles.workingDay}>
                <Text style={styles.dayName}>{day.day}</Text>
                <Text
                  style={[
                    styles.dayHours,
                    {color: day.available ? '#34C759' : '#FF3B30'},
                  ]}>
                  {day.hours}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Servicios Ofrecidos</Text>
          {business.services.map(category => (
            <View key={category.id} style={styles.serviceCategory}>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </View>
              {category.services.map(service => (
                <View key={service.id} style={styles.serviceItem}>
                  <View style={styles.serviceInfo}>
                    <Text style={styles.serviceName}>{service.name}</Text>
                    <Text style={styles.serviceDescription}>
                      {service.description}
                    </Text>
                  </View>
                  <View style={styles.servicePrice}>
                    <Text style={styles.price}>
                      €{service.price.toFixed(2)}
                    </Text>
                    <Text style={styles.duration}>{service.duration} min</Text>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            title="Contactar"
            onPress={handleContact}
            variant="outline"
            style={styles.actionButton}
          />
          <Button
            title={
              selectedService
                ? `Contratar ${selectedService.name}`
                : 'Ver Servicios'
            }
            onPress={handleHireService}
            variant="primary"
            style={styles.actionButton}
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
  businessInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatar: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  businessDetails: {
    flex: 1,
  },
  businessName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginRight: 8,
  },
  reviews: {
    fontSize: 14,
    color: '#8E8E93',
  },
  verifiedBadge: {
    backgroundColor: '#34C759',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
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
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#1C1C1E',
    lineHeight: 24,
  },
  contactItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  contactLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    width: 80,
  },
  contactValue: {
    fontSize: 16,
    color: '#007AFF',
    flex: 1,
  },
  workingHoursContainer: {
    gap: 8,
  },
  workingDay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  dayName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  dayHours: {
    fontSize: 16,
    fontWeight: '500',
  },
  serviceCategory: {
    marginBottom: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
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
  serviceDescription: {
    fontSize: 14,
    color: '#8E8E93',
  },
  servicePrice: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34C759',
    marginBottom: 2,
  },
  duration: {
    fontSize: 12,
    color: '#8E8E93',
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
});
