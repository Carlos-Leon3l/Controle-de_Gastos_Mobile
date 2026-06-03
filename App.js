import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/routes';
import { ExpenseProvider } from './src/contexts/ExpenseContext';
import { initDatabase } from './src/database/databaseInit';
import { colors } from './src/styles/colors';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary pegou o erro:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, padding: 20, backgroundColor: '#cc0000', justifyContent: 'center' }}>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Erro capturado na tela web:</Text>
          <Text style={{ color: 'white', marginTop: 10 }}>{this.state.error && this.state.error.toString()}</Text>
          <Text style={{ color: 'white', fontSize: 12, marginTop: 10 }}>{this.state.errorInfo && this.state.errorInfo.componentStack}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    const setup = async () => {
      await initDatabase();
      setDbInitialized(true);
    };
    setup();
  }, []);

  return (
    <ErrorBoundary>
      <SafeAreaProvider initialMetrics={initialWindowMetrics || { frame: { x: 0, y: 0, width: 0, height: 0 }, insets: { top: 0, left: 0, right: 0, bottom: 0 } }}>
        {!dbInitialized ? (
          <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: colors.primary }}>Iniciando banco de dados...</Text>
          </View>
        ) : (
          <View style={{ flex: 1, backgroundColor: colors.background }}>
            <ExpenseProvider>
              <AppNavigator />
              <StatusBar style="light" />
            </ExpenseProvider>
          </View>
        )}
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
