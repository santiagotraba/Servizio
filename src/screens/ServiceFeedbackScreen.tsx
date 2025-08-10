import React, {useState} from 'react';
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
import {Input} from '../components/Input';

interface ServiceFeedbackScreenProps {
  navigation: any;
  route: any;
}

export const ServiceFeedbackScreen: React.FC<ServiceFeedbackScreenProps> = ({
  navigation,
  route,
}) => {
  const {serviceId} = route.params;
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleRatingPress = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleSubmitFeedback = async () => {
    if (rating === 0) {
      Alert.alert('Error', 'Por favor selecciona una valoración');
      return;
    }

    setLoading(true);

    // Simular envío de feedback
    setTimeout(() => {
      setLoading(false);
      Alert.alert('¡Gracias!', 'Tu valoración ha sido enviada exitosamente.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
        },
      ]);
    }, 1500);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          style={styles.starContainer}
          onPress={() => handleRatingPress(i)}>
          <Text
            style={[
              styles.star,
              rating >= i ? styles.starFilled : styles.starEmpty,
            ]}>
            {rating >= i ? '⭐' : '☆'}
          </Text>
        </TouchableOpacity>,
      );
    }
    return stars;
  };

  const getRatingText = () => {
    switch (rating) {
      case 1:
        return 'Muy Malo';
      case 2:
        return 'Malo';
      case 3:
        return 'Regular';
      case 4:
        return 'Bueno';
      case 5:
        return 'Excelente';
      default:
        return 'Selecciona una valoración';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Valorar Servicio</Text>
          <Text style={styles.subtitle}>Cuéntanos tu experiencia</Text>
        </View>

        {/* Service Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Servicio Valorado</Text>
          <View style={styles.serviceInfo}>
            <View style={styles.serviceIcon}>
              <Text style={styles.iconText}>🔧</Text>
            </View>
            <View style={styles.serviceDetails}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.businessName}>{business.businessName}</Text>
              <Text style={styles.serviceDate}>
                {new Date(hiredService.scheduledDate).toLocaleDateString(
                  'es-ES',
                )}
              </Text>
            </View>
          </View>
        </View>

        {/* Rating */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Valoración General</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>{renderStars()}</View>
            <Text style={styles.ratingText}>{getRatingText()}</Text>
          </View>
        </View>

        {/* Review */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Comentario (Opcional)</Text>
          <Input
            placeholder="Comparte tu experiencia con este servicio..."
            value={review}
            onChangeText={setReview}
            multiline
            numberOfLines={4}
            style={styles.reviewInput}
          />
        </View>

        {/* Quick Rating Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aspectos Específicos</Text>
          <View style={styles.aspectsContainer}>
            <View style={styles.aspectItem}>
              <Text style={styles.aspectLabel}>Puntualidad</Text>
              <View style={styles.aspectStars}>
                {[1, 2, 3, 4, 5].map(star => (
                  <TouchableOpacity key={star}>
                    <Text style={styles.aspectStar}>⭐</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.aspectItem}>
              <Text style={styles.aspectLabel}>Calidad del Trabajo</Text>
              <View style={styles.aspectStars}>
                {[1, 2, 3, 4, 5].map(star => (
                  <TouchableOpacity key={star}>
                    <Text style={styles.aspectStar}>⭐</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.aspectItem}>
              <Text style={styles.aspectLabel}>Comunicación</Text>
              <View style={styles.aspectStars}>
                {[1, 2, 3, 4, 5].map(star => (
                  <TouchableOpacity key={star}>
                    <Text style={styles.aspectStar}>⭐</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Submit Button */}
        <View style={styles.submitContainer}>
          <Button
            title="Enviar Valoración"
            onPress={handleSubmitFeedback}
            loading={loading}
            disabled={rating === 0}
            style={styles.submitButton}
          />
        </View>

        {/* Skip Option */}
        <View style={styles.skipContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.skipText}>Saltar por ahora</Text>
          </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 24,
  },
  serviceDetails: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  businessName: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  serviceDate: {
    fontSize: 14,
    color: '#8E8E93',
  },
  ratingContainer: {
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  starContainer: {
    marginHorizontal: 4,
  },
  star: {
    fontSize: 32,
  },
  starFilled: {
    color: '#FFD700',
  },
  starEmpty: {
    color: '#E5E5EA',
  },
  ratingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  reviewInput: {
    minHeight: 100,
  },
  aspectsContainer: {
    gap: 16,
  },
  aspectItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aspectLabel: {
    fontSize: 16,
    color: '#1C1C1E',
    flex: 1,
  },
  aspectStars: {
    flexDirection: 'row',
  },
  aspectStar: {
    fontSize: 20,
    marginLeft: 4,
  },
  submitContainer: {
    padding: 16,
  },
  submitButton: {
    marginBottom: 16,
  },
  skipContainer: {
    alignItems: 'center',
    paddingBottom: 24,
  },
  skipText: {
    fontSize: 16,
    color: '#8E8E93',
    textDecorationLine: 'underline',
  },
});
