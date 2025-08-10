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
import {Button} from '../components/Button';

interface HelpScreenProps {
  navigation: any;
}

export const HelpScreen: React.FC<HelpScreenProps> = ({navigation}) => {
  const faqItems = [
    {
      id: '1',
      question: '¿Cómo contrato un servicio?',
      answer:
        'Selecciona una categoría de servicio, elige el profesional que prefieras y confirma la contratación. Recibirás una confirmación inmediata.',
    },
    {
      id: '2',
      question: '¿Puedo cancelar un servicio?',
      answer:
        'Sí, puedes cancelar un servicio hasta 2 horas antes de la hora programada sin costos adicionales.',
    },
    {
      id: '3',
      question: '¿Cómo funciona el sistema de pagos?',
      answer:
        'Los pagos se procesan de forma segura a través de nuestra plataforma. Puedes pagar con tarjeta de crédito, débito o transferencia bancaria.',
    },
    {
      id: '4',
      question: '¿Qué pasa si no estoy satisfecho con el servicio?',
      answer:
        'Si no estás satisfecho, puedes reportar el problema y nuestro equipo de soporte te ayudará a resolver la situación.',
    },
    {
      id: '5',
      question: '¿Los profesionales están verificados?',
      answer:
        'Sí, todos nuestros profesionales pasan por un proceso de verificación que incluye verificación de identidad y referencias.',
    },
  ];

  const supportOptions = [
    {
      id: '1',
      title: 'Chat en Vivo',
      description: 'Habla con nuestro equipo de soporte',
      icon: '💬',
      action: () => Alert.alert('Chat', 'Funcionalidad de chat próximamente'),
    },
    {
      id: '2',
      title: 'Llamar Soporte',
      description: 'Línea directa de atención al cliente',
      icon: '📞',
      action: () =>
        Alert.alert('Llamada', 'Funcionalidad de llamada próximamente'),
    },
    {
      id: '3',
      title: 'Enviar Email',
      description: 'Envía un correo electrónico',
      icon: '📧',
      action: () => Alert.alert('Email', 'Funcionalidad de email próximamente'),
    },
    {
      id: '4',
      title: 'Reportar Problema',
      description: 'Informa sobre un problema técnico',
      icon: '⚠️',
      action: () =>
        Alert.alert('Reporte', 'Funcionalidad de reporte próximamente'),
    },
  ];

  const handleContactSupport = (option: any) => {
    option.action();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Ayuda y Soporte</Text>
          <Text style={styles.subtitle}>¿En qué podemos ayudarte?</Text>
        </View>

        {/* Support Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contactar Soporte</Text>
          <View style={styles.supportGrid}>
            {supportOptions.map(option => (
              <TouchableOpacity
                key={option.id}
                style={styles.supportCard}
                onPress={() => handleContactSupport(option)}
                activeOpacity={0.7}>
                <Text style={styles.supportIcon}>{option.icon}</Text>
                <Text style={styles.supportTitle}>{option.title}</Text>
                <Text style={styles.supportDescription}>
                  {option.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FAQ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preguntas Frecuentes</Text>
          {faqItems.map(item => (
            <View key={item.id} style={styles.faqItem}>
              <Text style={styles.faqQuestion}>{item.question}</Text>
              <Text style={styles.faqAnswer}>{item.answer}</Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          <View style={styles.quickActions}>
            <Button
              title="Ver Tutorial"
              onPress={() => Alert.alert('Tutorial', 'Tutorial próximamente')}
              variant="outline"
              style={styles.quickActionButton}
            />
            <Button
              title="Política de Privacidad"
              onPress={() =>
                Alert.alert('Privacidad', 'Política de privacidad próximamente')
              }
              variant="outline"
              style={styles.quickActionButton}
            />
            <Button
              title="Términos de Servicio"
              onPress={() =>
                Alert.alert('Términos', 'Términos de servicio próximamente')
              }
              variant="outline"
              style={styles.quickActionButton}
            />
          </View>
        </View>

        {/* Contact Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información de Contacto</Text>
          <View style={styles.contactInfo}>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>📧 Email:</Text>
              <Text style={styles.contactValue}>soporte@serviz.io</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>📞 Teléfono:</Text>
              <Text style={styles.contactValue}>+34 900 123 456</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>🕐 Horario:</Text>
              <Text style={styles.contactValue}>Lun-Vie 9:00-18:00</Text>
            </View>
          </View>
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
  supportGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  supportCard: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  supportIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  supportTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
    textAlign: 'center',
  },
  supportDescription: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 16,
  },
  faqItem: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
  },
  quickActions: {
    gap: 12,
  },
  quickActionButton: {
    marginBottom: 8,
  },
  contactInfo: {
    gap: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
});
