declare module 'react-native' {
    export * from 'react-native-web';
    export const Platform: {
      OS: 'web' | 'ios' | 'android';
    };
  }