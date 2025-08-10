import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Service} from '../types';

interface ServiceCardProps {
  service: Service;
  onPress: () => void;
  variant?: 'default' | 'compact';
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onPress,
  variant = 'default',
}) => {
  const formatPrice = (price: number) => {
    return `€${price.toFixed(2)}`;
  };

  const formatDuration = (duration: number) => {
    if (duration < 60) {
      return `${duration} min`;
    }
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return minutes > 0 ? `${hours}h ${minutes}min` : `${hours}h`;
  };

  return (
    <TouchableOpacity
      style={[styles.container, variant === 'compact' && styles.compact]}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>🔧</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {service.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {service.description}
        </Text>

        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Precio:</Text>
            <Text style={styles.price}>{formatPrice(service.price)}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Duración:</Text>
            <Text style={styles.duration}>
              {formatDuration(service.duration)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.arrow}>
        <Text style={styles.arrowText}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
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
  compact: {
    padding: 12,
    marginBottom: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
    lineHeight: 20,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginRight: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34C759',
  },
  duration: {
    fontSize: 12,
    color: '#007AFF',
  },
  arrow: {
    marginLeft: 8,
  },
  arrowText: {
    fontSize: 20,
    color: '#C7C7CC',
    fontWeight: '300',
  },
});
