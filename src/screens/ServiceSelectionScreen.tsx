import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {mockServiceCategories, getServicesByCategory} from '../utils/mockData';
import {ServiceCard} from '../components/ServiceCard';
import {Button} from '../components/Button';

interface ServiceSelectionScreenProps {
  navigation: any;
  route: any;
}

export const ServiceSelectionScreen: React.FC<ServiceSelectionScreenProps> = ({
  navigation,
  route,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(
    route.params?.categoryId || null,
  );

  // Obtener todos los servicios
  const allServices = useMemo(() => {
    return mockServiceCategories.flatMap(category =>
      category.services.map(service => ({
        ...service,
        categoryName: category.name,
        categoryIcon: category.icon,
      })),
    );
  }, []);

  // Filtrar servicios
  const filteredServices = useMemo(() => {
    let services = allServices;

    // Filtrar por categoría
    if (selectedCategory) {
      services = services.filter(
        service => service.category === selectedCategory,
      );
    }

    // Filtrar por búsqueda
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      services = services.filter(
        service =>
          service.name.toLowerCase().includes(query) ||
          service.description.toLowerCase().includes(query) ||
          service.categoryName.toLowerCase().includes(query),
      );
    }

    return services;
  }, [allServices, selectedCategory, searchQuery]);

  const handleServicePress = (service: any) => {
    // Buscar un negocio que ofrezca este servicio
    const business = mockServiceCategories
      .find(cat => cat.id === service.category)
      ?.services.find(s => s.id === service.id);

    if (business) {
      navigation.navigate('BusinessProfile', {
        businessId: '1', // Mock business ID
        serviceId: service.id,
      });
    }
  };

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
  };

  const renderCategoryFilter = ({item}: {item: any}) => (
    <TouchableOpacity
      style={[
        styles.categoryFilter,
        selectedCategory === item.id && styles.categoryFilterSelected,
      ]}
      onPress={() => handleCategoryPress(item.id)}
      activeOpacity={0.7}>
      <Text style={styles.categoryFilterIcon}>{item.icon}</Text>
      <Text
        style={[
          styles.categoryFilterText,
          selectedCategory === item.id && styles.categoryFilterTextSelected,
        ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderServiceItem = ({item}: {item: any}) => (
    <ServiceCard service={item} onPress={() => handleServicePress(item)} />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Servicios Disponibles</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar servicios..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#8E8E93"
        />
        <Text style={styles.searchIcon}>🔍</Text>
      </View>

      {/* Category Filters */}
      <View style={styles.filtersContainer}>
        <Text style={styles.filtersTitle}>Filtrar por categoría:</Text>
        <FlatList
          data={mockServiceCategories}
          renderItem={renderCategoryFilter}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryFiltersList}
        />
      </View>

      {/* Clear Filters */}
      {(selectedCategory || searchQuery) && (
        <View style={styles.clearFiltersContainer}>
          <Button
            title="Limpiar filtros"
            onPress={clearFilters}
            variant="outline"
            size="small"
          />
        </View>
      )}

      {/* Results Count */}
      <Text style={styles.resultsCount}>
        {filteredServices.length} servicio
        {filteredServices.length !== 1 ? 's' : ''} encontrado
        {filteredServices.length !== 1 ? 's' : ''}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredServices}
        renderItem={renderServiceItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyTitle}>No se encontraron servicios</Text>
            <Text style={styles.emptySubtitle}>
              Intenta ajustar los filtros o buscar con otros términos
            </Text>
            <Button
              title="Limpiar filtros"
              onPress={clearFilters}
              variant="primary"
              style={styles.emptyButton}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  listContent: {
    padding: 24,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 20,
  },
  searchContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 48,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1C1C1E',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    top: 16,
    fontSize: 20,
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  categoryFiltersList: {
    gap: 8,
  },
  categoryFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  categoryFilterSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryFilterIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryFilterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1C1C1E',
  },
  categoryFilterTextSelected: {
    color: '#FFFFFF',
  },
  clearFiltersContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsCount: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  emptyButton: {
    minWidth: 150,
  },
});
