import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../styles/colors';
import { globalStyles } from '../styles/globalStyles';
import { formatCurrency } from '../utils/formatters';

export const SummaryCard = ({ totalReceitas, totalDespesas, saldoAtual, filtroAtual, aoFiltrar }) => {
  const isPositive = saldoAtual >= 0;

  const alternarFiltro = (tipo) => {
    if (aoFiltrar) {
      aoFiltrar(filtroAtual === tipo ? 'todos' : tipo);
    }
  };

  return (
    <View style={[globalStyles.card, styles.container]}>
      <TouchableOpacity 
        style={[styles.saldoContainer, filtroAtual === 'todos' && styles.activeFiltro]}
        onPress={() => alternarFiltro('todos')}
      >
        <Text style={styles.title}>Saldo Atual</Text>
        <Text style={[styles.balance, { color: isPositive ? colors.success : colors.danger }]}>
          {formatCurrency(saldoAtual)}
        </Text>
      </TouchableOpacity>
      
      <View style={styles.row}>
        <TouchableOpacity 
          style={[styles.column, filtroAtual === 'receita' && styles.activeFiltro]}
          onPress={() => alternarFiltro('receita')}
        >
          <Text style={styles.label}>Receitas</Text>
          <Text style={styles.income}>{formatCurrency(totalReceitas)}</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity 
          style={[styles.column, filtroAtual === 'despesa' && styles.activeFiltro]}
          onPress={() => alternarFiltro('despesa')}
        >
          <Text style={styles.label}>Despesas</Text>
          <Text style={styles.expense}>{formatCurrency(totalDespesas)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 16,
    boxShadow: `0 4px 15px ${colors.primary}40`,
  },
  saldoContainer: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  balance: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  column: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
  },
  activeFiltro: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  income: {
    fontSize: 18,
    color: colors.success,
    fontWeight: 'bold',
  },
  expense: {
    fontSize: 18,
    color: colors.danger,
    fontWeight: 'bold',
  },
});
