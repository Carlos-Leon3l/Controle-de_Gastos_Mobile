import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { colors } from '../styles/colors';
import dayjs from 'dayjs';

export const CalendarPickerModal = ({ visible, onClose, onSelect, dataSelecionada }) => {
  const [dataBaseCalendario, setDataBaseCalendario] = useState(dayjs());

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.calendarContent}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity onPress={() => setDataBaseCalendario(dataBaseCalendario.subtract(1, 'month'))}>
              <Text style={styles.calendarArrow}>{'<'}</Text>
            </TouchableOpacity>
            <Text style={styles.calendarTitle}>
              {`${['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'][dataBaseCalendario.month()]} ${dataBaseCalendario.year()}`}
            </Text>
            <TouchableOpacity onPress={() => setDataBaseCalendario(dataBaseCalendario.add(1, 'month'))}>
              <Text style={styles.calendarArrow}>{'>'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.calendarGrid}>
            {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((diaSemana, i) => (
              <View key={`weekday-${i}`} style={styles.calendarCell}>
                <Text style={styles.calendarWeekdayText}>{diaSemana}</Text>
              </View>
            ))}

            {Array.from({ length: 42 }).map((_, i) => {
              const diaNum = i - dataBaseCalendario.startOf('month').day() + 1;
              const isDiaValido = diaNum > 0 && diaNum <= dataBaseCalendario.daysInMonth();
              const dataFormatada = isDiaValido ? dataBaseCalendario.date(diaNum).format('DD-MM-YYYY') : null;
              const isSelecionado = dataFormatada === dataSelecionada;

              return (
                <TouchableOpacity
                  key={`day-${i}`}
                  style={[
                    styles.calendarCell,
                    isSelecionado && styles.calendarCellActive
                  ]}
                  onPress={() => {
                    if (isDiaValido) {
                      onSelect(dataFormatada);
                      onClose();
                    }
                  }}
                  disabled={!isDiaValido}
                >
                  <Text style={[
                    styles.calendarDayText,
                    !isDiaValido && { color: 'transparent' },
                    isSelecionado && styles.calendarDayTextActive
                  ]}>
                    {isDiaValido ? diaNum : ''}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity style={styles.fecharModalBtn} onPress={onClose}>
            <Text style={styles.fecharModalText}>Fechar</Text>
          </TouchableOpacity>
        </View>
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
  fecharModalBtn: {
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 10,
  },
  fecharModalText: {
    color: colors.danger,
    fontSize: 16,
    fontWeight: 'bold',
  },
  calendarContent: {
    backgroundColor: colors.surface,
    margin: 20,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  calendarTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  calendarArrow: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarCell: {
    width: '14.28%',
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
    borderRadius: 16,
  },
  calendarCellActive: {
    backgroundColor: colors.primary,
  },
  calendarWeekdayText: {
    color: colors.textSecondary,
    fontWeight: 'bold',
    fontSize: 12,
  },
  calendarDayText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  calendarDayTextActive: {
    color: colors.background,
    fontWeight: 'bold',
  },
});
