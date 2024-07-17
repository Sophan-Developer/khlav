const CurrencySystem = require('khlav');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const currencySystem = new CurrencySystem();

const mongoURL = process.env.MONGODB_URL || 'your_mongodb_connection_string'; // Replace with your actual MongoDB connection string
currencySystem.setMongoURL(mongoURL);

async function runExample() {
  const userId = '1234567890';

  // Set up a test user
  await mongoose.connection.db.collection('currencies').updateOne(
    { userID: userId },
    { $set: { wallet: 1000, bank: 500 } },
    { upsert: true }
  );

  // Get Balance
  const balance = await currencySystem.getBalance(userId);
  console.log(`User Balance: ${balance}`);

  // Get Bank Balance
  const bankBalance = await currencySystem.getBankBalance(userId);
  console.log(`User Bank Balance: ${bankBalance}`);

  // Deposit Money
  const depositSuccess = await currencySystem.depositMoney(userId, 100);
  console.log(`Deposit Successful: ${depositSuccess}`);

  // Withdraw Money
  const withdrawSuccess = await currencySystem.withdrawMoney(userId, 50);
  console.log(`Withdrawal Successful: ${withdrawSuccess}`);

  // Transfer Money
  const receiverId = '0987654321';
  const transferSuccess = await currencySystem.transferMoney(userId, receiverId, 100);
  console.log(`Transfer Successful: ${transferSuccess}`);

  // Play Slots
  const slotsResult = await currencySystem.playSlots(userId, 50);
  console.log(`Slots Result: ${slotsResult.win ? 'Win' : 'Lose'}, Amount: ${slotsResult.amount}`);

  // Play Spin
  const spinResult = await currencySystem.playSpin(userId, 50);
  console.log(`Spin Result: ${spinResult.win ? 'Win' : 'Lose'}, Amount: ${spinResult.amount}`);

  // Claim Daily Reward
  const dailyReward = await currencySystem.claimDailyReward(userId);
  if (dailyReward.success) {
    console.log(`Daily Reward Claimed: ${dailyReward.reward}`);
  } else {
    console.log(dailyReward.message);
  }

  // Claim Weekly Reward
  const weeklyReward = await currencySystem.claimWeeklyReward(userId);
  if (weeklyReward.success) {
    console.log(`Weekly Reward Claimed: ${weeklyReward.reward}`);
  } else {
    console.log(weeklyReward.message);
  }

  // Add Item to Inventory
  const item = {
    name: 'Sword',
    price: 100,
    description: 'A sharp blade.'
  };
  const addItemResult = await currencySystem.addItem({ guild: { id: null }, inventory: item });
  console.log(`Item Added: ${addItemResult.item.name}`);

  // Remove Item from Inventory
  const removeItemResult = await currencySystem.removeItem({ guild: { id: null }, item: 1 });
  console.log(`Item Removed: ${removeItemResult.inventory.name}`);

  // Get Top Users
  const topUsers = await currencySystem.getTopUsers();
  console.log('Top Users:', topUsers);
}

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    runExample();
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });
