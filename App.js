import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import AddTransactionScreen from './screens/AddTransactionScreen';
import TransactionHistoryScreen from './screens/TransactionHistoryScreen';
import ViewSlipScreen from './screens/ViewSlipScreen';
import FarmerLedgerScreen from './screens/FarmerLedgerScreen';
import ReportsScreen from './screens/ReportsScreen';
import LoginScreen from './screens/LoginScreen';
import './i18n';
import { useTranslation } from 'react-i18next';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="AddTransaction" component={AddTransactionScreen} options={{ title: '🧾 Add Transaction' }} />
            <Stack.Screen name="TransactionHistory" component={TransactionHistoryScreen} options={{ title: '📜 Transaction History' }} />
            <Stack.Screen name="FarmerLedger" component={FarmerLedgerScreen} options={{ title: '📚 Farmer Ledger' }} />
            <Stack.Screen name="Reports" component={ReportsScreen} options={{ title: '📊 Reports' }} />
            <Stack.Screen name="ViewSlip" component={ViewSlipScreen} options={{ title: '🧾 View Slip' }} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
} 