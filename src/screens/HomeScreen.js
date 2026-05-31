import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usarGastos } from '../contexts/ExpenseContext';
import { ItemDoGasto } from '../features/expenses/ExpenseItem';
import { SummaryCard } from '../components/SummaryCard';
import { MonthSelector } from '../components/MonthSelector';
import { CustomTabBar } from '../components/CustomTabBar';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';

export const HomeScreen = () => {
  const { Gastos, Carregando, mesAnoAtual, mudarMes, definirMesAno, totalReceitas, totalDespesas, saldoAtual } = usarGastos();
  const [filtroTransacao, setFiltroTransacao] = React.useState('todos');

  const GastosFiltrados = Gastos.filter(g => {
    if (filtroTransacao === 'todos') return true;
    return g.tipo === filtroTransacao;
  });

  const renderizarVazio = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Nenhum registro encontrado.</Text>
      <Text style={styles.emptySubText}>Toque no botão + para começar.</Text>
    </View>
  );

  return (
    <View style={[globalStyles.container, { paddingBottom: 0, paddingHorizontal: 0 }]}>
      <View style={{ paddingHorizontal: 20, flex: 1 }}>
        <MonthSelector mesAnoAtual={mesAnoAtual} mudarMes={mudarMes} definirMesAno={definirMesAno} />
      <SummaryCard 
        totalReceitas={totalReceitas} 
        totalDespesas={totalDespesas} 
        saldoAtual={saldoAtual} 
        filtroAtual={filtroTransacao}
        aoFiltrar={setFiltroTransacao}
      />

      <FlatList
        data={GastosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ItemDoGasto gasto={item} />}
        contentContainerStyle={[Gastos.length === 0 ? styles.flexGrow : styles.listContent, { paddingBottom: 120 }]}
        ListEmptyComponent={Carregando ? <Text style={styles.loadingText}>Carregando...</Text> : renderizarVazio}
      />
      </View>
      <CustomTabBar />
    </View>
  );
};

const styles = StyleSheet.create({
  flexGrow: {
    flexGrow: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: colors.text,
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  loadingText: {
    color: colors.primary,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});
