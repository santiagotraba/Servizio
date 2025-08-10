import React, {useState, useEffect} from 'react';
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

interface DeliveryScreenProps {
  navigation: any;
  route: any;
}

export const DeliveryScreen: React.FC<DeliveryScreenProps> = ({
  navigation,
  route,
}) => {
  const {serviceId} = route.params;
  const [currentStep, setCurrentStep] = useState(0);

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

  // Simular progreso del servicio
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < 3) return prev + 1;
        return prev;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const steps = [
    {
      id: 0,
      title: 'Servicio Confirmado',
      description: 'El profesional ha confirmado tu servicio',
      icon: '✅',
      completed: currentStep >= 0,
    },
    {
      id: 1,
      title: 'En Camino',
      description: 'El profesional está en camino a tu ubicación',
      icon: '🚗',
      completed: currentStep >= 1,
    },
    {
      id: 2,
      title: 'Trabajando',
      description: 'El profesional está realizando el servicio',
      icon: '🔧',
      completed: currentStep >= 2,
    },
    {
      id: 3,
      title: 'Completado',
      description: 'El servicio ha sido completado exitosamente',
      icon: '🎉',
      completed: currentStep >= 3,
    },
  ];

  const handleContactProfessional = () => {
    Alert.alert(
      'Contactar Profesional',
      `¿Deseas contactar a ${business.name}?`,
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

  const handleMarkAsCompleted = () => {
    Alert.alert(
      'Confirmar Completado',
      '¿El servicio ha sido completado satisfactoriamente?',
      [
        {text: 'No', style: 'cancel'},
        {
          text: 'Sí, Completado',
          onPress: () => {
            Alert.alert('Completado', 'Servicio marcado como completado');
            navigation.navigate('ServiceClosure', {serviceId});
          },
        },
      ],
    );
  };

  const handleReportIssue = () => {
    Alert.alert(
      'Reportar Problema',
      '¿Qué tipo de problema has experimentado?',
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Problema Técnico',
          onPress: () => Alert.alert('Reportado', 'Problema técnico reportado'),
        },
        {
          text: 'Problema de Calidad',
          onPress: () =>
            Alert.alert('Reportado', 'Problema de calidad reportado'),
        },
        {
          text: 'Otro',
          onPress: () => Alert.alert('Reportado', 'Problema reportado'),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Seguimiento del Servicio</Text>
          <Text style={styles.subtitle}>{service.name}</Text>
        </View>

        {/* Progress Steps */}
        <View style={styles.progressContainer}>
          {steps.map((step, index) => (
            <View key={step.id} style={styles.stepContainer}>
              <View style={styles.stepRow}>
                <View
                  style={[
                    styles.stepIcon,
                    step.completed
                      ? styles.stepIconCompleted
                      : styles.stepIconPending,
                  ]}>
                  <Text style={styles.stepIconText}>{step.icon}</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text
                    style={[
                      styles.stepTitle,
                      step.completed
                        ? styles.stepTitleCompleted
                        : styles.stepTitlePending,
                    ]}>
                    {step.title}
                  </Text>
                  <Text style={styles.stepDescription}>{step.description}</Text>
                </View>
              </View>
              {index < steps.length - 1 && (
                <View
                  style={[
                    styles.stepLine,
                    step.completed
                      ? styles.stepLineCompleted
                      : styles.stepLinePending,
                  ]}
                />
              )}
            </View>
          ))}
        </View>

        {/* Professional Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profesional Asignado</Text>
          <View style={styles.professionalInfo}>
            <View style={styles.professionalAvatar}>
              <Text style={styles.professionalAvatarText}>
                {business.name.charAt(0)}
              </Text>
            </View>
            <View style={styles.professionalDetails}>
              <Text style={styles.professionalName}>{business.name}</Text>
              <Text style={styles.professionalBusiness}>
                {business.businessName}
              </Text>
              <Text style={styles.professionalPhone}>{business.phone}</Text>
            </View>
          </View>
        </View>

        {/* Service Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalles del Servicio</Text>
          <View style={styles.serviceDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Fecha:</Text>
              <Text style={styles.detailValue}>
                {new Date(hiredService.scheduledDate).toLocaleDateString(
                  'es-ES',
                )}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Hora:</Text>
              <Text style={styles.detailValue}>
                {new Date(hiredService.scheduledDate).toLocaleTimeString(
                  'es-ES',
                  {
                    hour: '2-digit',
                    minute: '2-digit',
                  },
                )}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Dirección:</Text>
              <Text style={styles.detailValue}>{hiredService.address}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Precio:</Text>
              <Text style={styles.detailValue}>
                €{service.price.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            title="Contactar Profesional"
            onPress={handleContactProfessional}
            variant="outline"
            style={styles.actionButton}
          />
          <Button
            title="Marcar como Completado"
            onPress={handleMarkAsCompleted}
            variant="primary"
            style={styles.actionButton}
          />
        </View>

        {/* Additional Actions */}
        <View style={styles.additionalActions}>
          <Button
            title="Reportar Problema"
            onPress={handleReportIssue}
            variant="danger"
            style={styles.additionalButton}
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
  },
  progressContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
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
  stepContainer: {
    position: 'relative',
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stepIconCompleted: {
    backgroundColor: '#34C759',
  },
  stepIconPending: {
    backgroundColor: '#F2F2F7',
  },
  stepIconText: {
    fontSize: 20,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  stepTitleCompleted: {
    color: '#1C1C1E',
  },
  stepTitlePending: {
    color: '#8E8E93',
  },
  stepDescription: {
    fontSize: 14,
    color: '#8E8E93',
  },
  stepLine: {
    width: 2,
    height: 30,
    marginLeft: 19,
    marginVertical: 4,
  },
  stepLineCompleted: {
    backgroundColor: '#34C759',
  },
  stepLinePending: {
    backgroundColor: '#F2F2F7',
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
  professionalInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  professionalAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  professionalAvatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  professionalDetails: {
    flex: 1,
  },
  professionalName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  professionalBusiness: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  professionalPhone: {
    fontSize: 14,
    color: '#007AFF',
  },
  serviceDetails: {
    gap: 12,
  },
  detailRow: {
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
