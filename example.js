
const { CurrencySystem, getRoleplayGif } = require('khlav');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const mongoURL = process.env.MONGODB_URL || 'your_mongodb_connection_string'; // Replace with your actual MongoDB connection string

async function runExample() {
  const currencySystem = new CurrencySystem();
  
  // Set MongoDB URL!
  currencySystem.setMongoURL(mongoURL);
  
  // Set Default Bank Amount when a new user is created!
  currencySystem.setDefaultBankAmount(1000);
  currencySystem.setDefaultWalletAmount(1000);
  
  // Its bank space limit (can be changed according to per user) here 0 means infinite.
  currencySystem.setMaxBankAmount(10000);
  
  // Set Default Maximum Amount of Wallet Currency a user can have! (can be changed according to per user) here 0 means infinite.
  currencySystem.setMaxWalletAmount(10000);
  
  // Search for new npm package updates on bot startup! Latest version will be displayed in console.
  currencySystem.searchForNewUpdate(true);

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

  client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
  });
  
  client.on('messageCreate', async (message) => {
    if (message.content.startsWith('!balance')) {
      const balance = await cs.balance({
        user: message.author,
        guild: message.guild,
      });
      message.channel.send(`You have ${balance.wallet} in your wallet and ${balance.bank} in your bank.`);
    }
  
    if (message.content.startsWith('!hug')) {
      const gif = await getRoleplayGif('hug');
      message.channel.send(`${message.author} hugs ${message.mentions.users.first()}\n${gif}`);
    }
  });