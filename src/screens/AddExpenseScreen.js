import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usarGastos } from '../contexts/ExpenseContext';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import dayjs from 'dayjs';

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
  const [novaCategoria, setNovaCategoria] = useState('');
  const [categoriasCustomizadas, setCategoriasCustomizadas] = useState([]);

  const categoriasDespesaPadrao = ['Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Contas', 'Educação'];
  const categoriasReceitaPadrao = ['Salário', 'Investimento', 'Freelance', 'Outros'];

  const categoriasAtuais = tipo === 'despesa' 
    ? [...categoriasDespesaPadrao, ...categoriasCustomizadas]
    : [...categoriasReceitaPadrao, ...categoriasCustomizadas];

  const adicionarCategoriaCustomizada = () => {
    if (novaCategoria.trim()) {
      setCategoriasCustomizadas(prev => [...prev, novaCategoria.trim()]);
      setCategoria(novaCategoria.trim());
      setNovaCategoria('');
      setModalCategoriaVisivel(false);
    }
  };

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

          <Text style={styles.label}>Data (DD-MM-YYYY)</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Ex: 25-10-2023"
            placeholderTextColor={colors.textSecondary}
            value={data}
            onChangeText={setData}
          />
        </View>

        <TouchableOpacity style={globalStyles.button} onPress={salvarGasto}>
          <Text style={globalStyles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={modalCategoriaVisivel} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha a Categoria</Text>
            
            <View style={styles.pillContainer}>
              {categoriasAtuais.map(cat => (
                <TouchableOpacity 
                  key={cat} 
                  style={[styles.pill, categoria === cat && styles.pillActive]}
                  onPress={() => { setCategoria(cat); setModalCategoriaVisivel(false); }}
                >
                  <Text style={[styles.pillText, categoria === cat && styles.pillTextActive]}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.novaCategoriaContainer}>
              <TextInput 
                style={[globalStyles.input, { flex: 1, marginBottom: 0, marginRight: 10, paddingVertical: 10 }]}
                placeholder="Ou digite nova..."
                placeholderTextColor={colors.textSecondary}
                value={novaCategoria}
                onChangeText={setNovaCategoria}
              />
              <TouchableOpacity style={styles.addPillBtn} onPress={adicionarCategoriaCustomizada}>
                <Text style={styles.addPillText}>Adicionar</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.fecharModalBtn} onPress={() => setModalCategoriaVisivel(false)}>
              <Text style={styles.fecharModalText}>Cancelar</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </Modal>

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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: '50%',
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  pillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  pill: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginBottom: 10,
    marginRight: 10,
  },
  pillActive: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(0, 240, 255, 0.1)',
  },
  pillText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  pillTextActive: {
    color: colors.primary,
  },
  novaCategoriaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  addPillBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  addPillText: {
    color: colors.background,
    fontWeight: 'bold',
  },
  fecharModalBtn: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  fecharModalText: {
    color: colors.danger,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
