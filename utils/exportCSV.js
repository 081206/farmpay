import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export const exportTransactionsToCSV = async (transactions) => {
  const csvRows = [
    ['Farmer', 'Date', 'Vegetable', 'Weight', 'Price', 'Total', 'Status']
  ];

  transactions.forEach(txn => {
    const date = new Date(txn.date?.seconds * 1000).toLocaleDateString();
    txn.items.forEach(item => {
      csvRows.push([
        txn.farmerName,
        date,
        item.vegetable,
        item.weight,
        item.price,
        item.total,
        txn.paymentStatus || 'Unpaid'
      ]);
    });
  });

  const csv = csvRows.map(row => row.join(',')).join('\n');
  const fileUri = FileSystem.documentDirectory + 'farm_pay_data.csv';

  await FileSystem.writeAsStringAsync(fileUri, csv, {
    encoding: FileSystem.EncodingType.UTF8,
  });

  await Sharing.shareAsync(fileUri);
}; 