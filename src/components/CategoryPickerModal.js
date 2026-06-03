import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';

export const CategoryPickerModal = ({ visible, onClose, onSelect, tipo, categoriaSelecionada }) => {
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
      onSelect(novaCategoria.trim());
      setNovaCategoria('');
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalContent}>
          <Text style={styles.modalTitle}>Escolha a Categoria</Text>

          <View style={styles.pillContainer}>
            {categoriasAtuais.map(cat => (
              <TouchableOpacity
                key={cat}
                style={[styles.pill, categoriaSelecionada === cat && styles.pillActive]}
                onPress={() => { onSelect(cat); onClose(); }}
              >
                <Text style={[styles.pillText, categoriaSelecionada === cat && styles.pillTextActive]}>{cat}</Text>
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

          <TouchableOpacity style={styles.fecharModalBtn} onPress={onClose}>
            <Text style={styles.fecharModalText}>Cancelar</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
