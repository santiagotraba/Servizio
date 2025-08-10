import React from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  getHiredServicesByClient,
  getServiceById,
  getBusinessById,
} from '../utils/mockData';
import {Button} from '../components/Button';

interface ServiceClosureScreenProps {
  navigation: any;
  route: any;
}

export const ServiceClosureScreen: React.FC<ServiceClosureScreenProps> = ({
  navigation,
  route,
}) => {
  const {serviceId} = route.params;

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

  const handleRateService = () => {
    navigation.navigate('ServiceFeedback', {serviceId});
  };

  const handleHireAgain = () => {
    navigation.navigate('BusinessProfile', {
      businessId: business.id,
      serviceId: service.id,
    });
  };

  const handleViewReceipt = () => {
    Alert.alert('Recibo', 'Funcionalidad de recibo próximamente');
  };

  const handleContactSupport = () => {
    navigation.navigate('Help');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Servicio Completado</Text>
          <Text style={styles.subtitle}>¡Gracias por usar Serviz.io!</Text>
        </View>

        {/* Success Message */}
        <View style={styles.successContainer}>
          <Text style={styles.successIcon}>🎉</Text>
          <Text style={styles.successTitle}>Servicio Finalizado</Text>
          <Text style={styles.successMessage}>
            Tu servicio ha sido completado exitosamente. Esperamos que hayas
            quedado satisfecho.
          </Text>
        </View>

        {/* Service Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumen del Servicio</Text>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Servicio:</Text>
            <Text style={styles.summaryValue}>{service.name}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Profesional:</Text>
            <Text style={styles.summaryValue}>{business.businessName}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Fecha:</Text>
            <Text style={styles.summaryValue}>
              {new Date(hiredService.scheduledDate).toLocaleDateString('es-ES')}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Precio:</Text>
            <Text style={styles.summaryValue}>€{service.price.toFixed(2)}</Text>
          </View>
        </View>

        {/* Next Steps */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Próximos Pasos</Text>
          <View style={styles.nextSteps}>
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>1</Text>
              <Text style={styles.stepText}>
                Valora el servicio para ayudar a otros usuarios
              </Text>
            </View>
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>2</Text>
              <Text style={styles.stepText}>
                Descarga tu recibo para tus registros
              </Text>
            </View>
            <View style={styles.stepItem}>
              <Text style={styles.stepNumber}>3</Text>
              <Text style={styles.stepText}>
                Considera contratar este profesional nuevamente
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            title="Valorar Servicio"
            onPress={handleRateService}
            variant="primary"
            style={styles.actionButton}
          />
          <Button
            title="Ver Recibo"
            onPress={handleViewReceipt}
            variant="outline"
            style={styles.actionButton}
          />
        </View>

        {/* Additional Actions */}
        <View style={styles.additionalActions}>
          <Button
            title="Contratar Nuevamente"
            onPress={handleHireAgain}
            variant="secondary"
            style={styles.additionalButton}
          />
          <Button
            title="Contactar Soporte"
            onPress={handleContactSupport}
            variant="outline"
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
  successContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 16,
    padding: 24,
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
  successIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34C759',
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 24,
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
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#8E8E93',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  nextSteps: {
    gap: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#007AFF',
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 12,
  },
  stepText: {
    fontSize: 16,
    color: '#1C1C1E',
    flex: 1,
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
