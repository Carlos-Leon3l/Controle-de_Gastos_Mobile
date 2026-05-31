import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usarGastos } from '../../contexts/ExpenseContext';
import { globalStyles } from '../../styles/globalStyles';
import { colors } from '../../styles/colors';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const ItemDoGasto = ({ gasto }) => {
  const { removerGasto } = usarGastos();
  const isReceita = gasto.tipo === 'receita';

  const confirmarExclusao = () => {
    Alert.alert(
      'Excluir Registro',
      `Deseja realmente excluir "${gasto.descricao}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => removerGasto(gasto.id) },
      ]
    );
  };

  return (
    <View style={[globalStyles.card, styles.itemContainer]}>
      <View style={styles.iconContainer}>
        <Ionicons 
          name={isReceita ? "arrow-up-circle" : "arrow-down-circle"} 
          size={32} 
          color={isReceita ? colors.success : colors.danger} 
        />
      </View>
      <View style={styles.leftContent}>
        <Text style={styles.description} numberOfLines={1}>{gasto.descricao}</Text>
        <Text style={styles.category}>{gasto.categoria}</Text>
        <Text style={styles.date}>{formatDate(gasto.data)}</Text>
      </View>
      <View style={styles.rightContent}>
        <Text style={[styles.value, { color: isReceita ? colors.success : colors.danger }]}>
          {isReceita ? '+' : '-'} {formatCurrency(gasto.valor)}
        </Text>
        <TouchableOpacity style={styles.deleteButton} onPress={confirmarExclusao}>
          <Ionicons name="trash-outline" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconContainer: {
    marginRight: 12,
  },
  leftContent: {
    flex: 1,
    paddingRight: 10,
  },
  rightContent: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  deleteButton: {
    marginTop: 8,
    padding: 4,
  },
  description: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: colors.secondary,
    marginBottom: 4,
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
