const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Necessário para o expo-sqlite funcionar no ambiente Web sem quebrar o bundler
config.resolver.assetExts.push('wasm');

module.exports = config;
