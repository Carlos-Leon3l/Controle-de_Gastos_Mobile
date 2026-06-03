import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usarGastos } from '../contexts/ExpenseContext';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import dayjs from 'dayjs';
import { CategoryPickerModal } from '../components/CategoryPickerModal';
import { CalendarPickerModal } from '../components/CalendarPickerModal';

export const AddExpenseScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { novoGasto } = usarGastos();

  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState(dayjs().format('DD-MM-YYYY'));
  const [tipo, setTipo] = useState('despesa');

  const [modalCategoriaVisivel, setModalCategoriaVisivel] = useState(false);
  const [modalDataVisivel, setModalDataVisivel] = useState(false);

  const salvarGasto = async () => {
    if (!descricao.trim() || !categoria.trim() || !valor.trim() || !data.trim()) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    const valorNumerico = parseFloat(valor.replace(',', '.'));
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      Alert.alert('Erro', 'O valor deve ser maior que zero.');
      return;
    }
    const partesData = data.split(/-|\//);
    if (partesData.length !== 3) {
      Alert.alert('Erro', 'Formato de data inválido. Use DD-MM-YYYY');
      return;
    }
    const dataISO = `${partesData[2]}-${partesData[1]}-${partesData[0]}`;

    const sucesso = await novoGasto({
      descricao,
      categoria,
      valor: valorNumerico,
      data: dataISO,
      tipo,
    });

    if (sucesso) {
      navigation.goBack();
    } else {
      Alert.alert('Erro', 'Ocorreu um erro ao salvar o gasto.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={[globalStyles.container, { paddingBottom: Math.max(insets.bottom + 10, 20) }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, tipo === 'receita' && styles.tabActiveReceita]}
            onPress={() => setTipo('receita')}
          >
            <Text style={[styles.tabText, tipo === 'receita' && styles.tabTextActive]}>Receita</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, tipo === 'despesa' && styles.tabActiveDespesa]}
            onPress={() => setTipo('despesa')}
          >
            <Text style={[styles.tabText, tipo === 'despesa' && styles.tabTextActive]}>Despesa</Text>
          </TouchableOpacity>
        </View>

        <View style={globalStyles.card}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Ex: Almoço"
            placeholderTextColor={colors.textSecondary}
            value={descricao}
            onChangeText={setDescricao}
          />

          <Text style={styles.label}>Categoria</Text>
          <TouchableOpacity
            style={[globalStyles.input, { justifyContent: 'center' }]}
            onPress={() => setModalCategoriaVisivel(true)}
          >
            <Text style={{ color: categoria ? colors.text : colors.textSecondary, fontSize: 16 }}>
              {categoria || 'Selecione a categoria'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.label}>Valor (R$)</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Ex: 45.90"
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
            value={valor}
            onChangeText={setValor}
          />

          <Text style={styles.label}>Data</Text>
          <TouchableOpacity
            style={[globalStyles.input, { justifyContent: 'center' }]}
            onPress={() => setModalDataVisivel(true)}
          >
            <Text style={{ color: colors.text, fontSize: 16 }}>
              {data}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={globalStyles.button} onPress={salvarGasto}>
          <Text style={globalStyles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>

      <CategoryPickerModal
        visible={modalCategoriaVisivel}
        onClose={() => setModalCategoriaVisivel(false)}
        onSelect={setCategoria}
        tipo={tipo}
        categoriaSelecionada={categoria}
      />

      <CalendarPickerModal
        visible={modalDataVisivel}
        onClose={() => setModalDataVisivel(false)}
        onSelect={setData}
        dataSelecionada={data}
      />

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  label: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    marginLeft: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActiveReceita: {
    backgroundColor: colors.success,
  },
  tabActiveDespesa: {
    backgroundColor: colors.danger,
  },
  tabText: {
    color: colors.textSecondary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  tabTextActive: {
    color: colors.background,
  },
});
