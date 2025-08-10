import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Input} from '../components/Input';
import {Button} from '../components/Button';
import {useAuth} from '../context/AuthContext';

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'client' | 'business'>('client');
  const [loading, setLoading] = useState(false);

  const {login} = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      const success = await login(email, password, userType);
      if (!success) {
        Alert.alert(
          'Error de autenticación',
          'Credenciales incorrectas. Usa:\nCliente: juan@example.com\nNegocio: maria@example.com\nContraseña: 123456',
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Ha ocurrido un error durante el inicio de sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleUserTypeChange = (type: 'client' | 'business') => {
    setUserType(type);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.logo}>Serviz.io</Text>
            <Text style={styles.subtitle}>
              Conecta con profesionales de confianza
            </Text>
          </View>

          {/* User Type Selection */}
          <View style={styles.userTypeContainer}>
            <Text style={styles.sectionTitle}>Tipo de usuario</Text>
            <View style={styles.userTypeButtons}>
              <Button
                title="Cliente"
                onPress={() => handleUserTypeChange('client')}
                variant={userType === 'client' ? 'primary' : 'outline'}
                style={styles.userTypeButton}
              />
              <Button
                title="Negocio"
                onPress={() => handleUserTypeChange('business')}
                variant={userType === 'business' ? 'primary' : 'outline'}
                style={styles.userTypeButton}
              />
            </View>
          </View>

          {/* Login Form */}
          <View style={styles.form}>
            <Input
              label="Email"
              placeholder="tu@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              label="Contraseña"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Button
              title="Iniciar Sesión"
              onPress={handleLogin}
              loading={loading}
              style={styles.loginButton}
            />
          </View>

          {/* Demo Credentials */}
          <View style={styles.demoContainer}>
            <Text style={styles.demoTitle}>Credenciales de prueba:</Text>
            <Text style={styles.demoText}>
              Cliente: juan@example.com{'\n'}
              Negocio: maria@example.com{'\n'}
              Contraseña: 123456
            </Text>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              ¿No tienes cuenta?{' '}
              <Text style={styles.footerLink}>Regístrate aquí</Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 24,
  },
  userTypeContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  userTypeButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  userTypeButton: {
    flex: 1,
  },
  form: {
    marginBottom: 32,
  },
  loginButton: {
    marginTop: 16,
  },
  demoContainer: {
    backgroundColor: '#E3F2FD',
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1976D2',
    marginBottom: 8,
  },
  demoText: {
    fontSize: 12,
    color: '#1976D2',
    lineHeight: 18,
  },
  footer: {
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  footerLink: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
