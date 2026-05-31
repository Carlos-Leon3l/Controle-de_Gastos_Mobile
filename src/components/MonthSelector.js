import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

export const MonthSelector = ({ mesAnoAtual, mudarMes, definirMesAno }) => {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [anoSelecionado, setAnoSelecionado] = useState(dayjs(`${mesAnoAtual}-01`).year());

  const label = dayjs(`${mesAnoAtual}-01`).format('MMMM YYYY');
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  const abrirModal = () => {
    setAnoSelecionado(dayjs(`${mesAnoAtual}-01`).year());
    setModalVisivel(true);
  };

  const handleSelectMonth = (index) => {
    const monthStr = String(index + 1).padStart(2, '0');
    if (definirMesAno) {
      definirMesAno(`${anoSelecionado}-${monthStr}`);
    }
    setModalVisivel(false);
  };

  const mudarAno = (direcao) => {
    setAnoSelecionado(prev => direcao === 'anterior' ? prev - 1 : prev + 1);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => mudarMes('anterior')}>
        <Ionicons name="chevron-back" size={24} color={colors.primary} />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={abrirModal} style={styles.labelContainer}>
        <Text style={styles.label}>{label.charAt(0).toUpperCase() + label.slice(1)}</Text>
        <Ionicons name="caret-down-outline" size={16} color={colors.textSecondary} style={{ marginLeft: 6 }} />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={() => mudarMes('proximo')}>
        <Ionicons name="chevron-forward" size={24} color={colors.primary} />
      </TouchableOpacity>

      <Modal visible={modalVisivel} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => mudarAno('anterior')} style={styles.anoBtn}>
                <Ionicons name="chevron-back" size={24} color={colors.text} />
              </TouchableOpacity>
              <Text style={styles.anoText}>{anoSelecionado}</Text>
              <TouchableOpacity onPress={() => mudarAno('proximo')} style={styles.anoBtn}>
                <Ionicons name="chevron-forward" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.gridMeses}>
              {meses.map((mes, index) => {
                const monthStr = String(index + 1).padStart(2, '0');
                const isCurrent = `${anoSelecionado}-${monthStr}` === mesAnoAtual;
                return (
                  <TouchableOpacity 
                    key={mes} 
                    style={[styles.mesBtn, isCurrent && styles.mesBtnAtivo]}
                    onPress={() => handleSelectMonth(index)}
                  >
                    <Text style={[styles.mesText, isCurrent && styles.mesTextAtivo]}>{mes}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity style={styles.fecharBtn} onPress={() => setModalVisivel(false)}>
              <Text style={styles.fecharText}>Cancelar</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    padding: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.surface,
    width: '85%',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  anoBtn: {
    padding: 8,
  },
  anoText: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  gridMeses: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  mesBtn: {
    width: '30%',
    paddingVertical: 12,
    marginBottom: 12,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: colors.background,
  },
  mesBtnAtivo: {
    backgroundColor: colors.primary,
  },
  mesText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '600',
  },
  mesTextAtivo: {
    color: '#fff',
  },
  fecharBtn: {
    marginTop: 10,
    paddingVertical: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  fecharText: {
    color: colors.danger,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
