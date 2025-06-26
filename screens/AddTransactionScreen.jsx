import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

export default function AddTransactionScreen({ navigation }) {
  const [farmerName, setFarmerName] = useState('');
  const [vegetable, setVegetable] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (!vegetable || !weight || !price) return;

    const total = parseFloat(weight) * parseFloat(price);

    const newItem = {
      id: Date.now().toString(),
      vegetable,
      weight: parseFloat(weight),
      price: parseFloat(price),
      total
    };

    setItems([...items, newItem]);
    setVegetable('');
    setWeight('');
    setPrice('');
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0).toFixed(2);
  };

  const saveTransaction = () => {
    if (!farmerName || items.length === 0) {
      alert('Enter farmer name and add at least one item.');
      return;
    }

    const transaction = {
      farmerName,
      date: new Date().toISOString(),
      items,
      totalAmount: parseFloat(calculateTotal())
    };

    console.log('💾 Transaction saved:', transaction);
    alert('Transaction saved locally (Next step: Firebase)');

    setFarmerName('');
    setItems([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🧾 Add Transaction</Text>

      <TextInput
        placeholder="👨‍🌾 Farmer Name"
        value={farmerName}
        onChangeText={setFarmerName}
        style={styles.input}
      />

      <Text style={styles.subheading}>Add Vegetable:</Text>
      <TextInput
        placeholder="🥦 Vegetable Name"
        value={vegetable}
        onChangeText={setVegetable}
        style={styles.input}
      />
      <TextInput
        placeholder="⚖️ Weight (kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="💰 Price per kg"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="➕ Add Item" onPress={addItem} />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.vegetable} - {item.weight}kg × ₹{item.price} = ₹{item.total.toFixed(2)}
          </Text>
        )}
        style={{ marginTop: 15 }}
      />

      <Text style={styles.total}>Total: ₹{calculateTotal()}</Text>
      <Button title="💾 Save Transaction" onPress={saveTransaction} color="#28a745" />
      <Button title="📚 Farmer Ledger" onPress={() => navigation.navigate('FarmerLedger')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15
  },
  subheading: {
    fontSize: 16,
    marginTop: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 5,
    padding: 10,
    borderRadius: 5
  },
  item: {
    fontSize: 16,
    marginVertical: 4
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15
  }
}); 