import React from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../styles/colors';

export const CustomTabBar = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleDummy = (nome) => {
    Alert.alert('Em breve!', `A tela de ${nome} será implementada no futuro.`);
  };

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      <TouchableOpacity style={styles.iconBtn} onPress={() => {}}>
        <Ionicons name="home" size={24} color={colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconBtn} onPress={() => handleDummy('Dashboard')}>
        <Ionicons name="pie-chart-outline" size={24} color={colors.textSecondary} />
      </TouchableOpacity>

      <View style={styles.centerButtonContainer}>
        <TouchableOpacity style={styles.centerButton} onPress={() => navigation.navigate('AddExpense')}>
          <Ionicons name="add" size={36} color={colors.background} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.iconBtn} onPress={() => handleDummy('Transações')}>
        <Ionicons name="list-outline" size={24} color={colors.textSecondary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconBtn} onPress={() => handleDummy('Configurações')}>
        <Ionicons name="settings-outline" size={24} color={colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  iconBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  centerButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    top: -20,
    elevation: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  }
});
