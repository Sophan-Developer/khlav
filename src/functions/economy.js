const User = require('../modules/user');

const getBalance = async (userID, guildID) => {
  const user = await User.findOne({ userID, guildID });
  return user ? user.wallet : 0;
};

const getBankBalance = async (userID, guildID) => {
  const user = await User.findOne({ userID, guildID });
  return user ? user.bank : 0;
};

const claimDailyReward = async (userID, guildID) => {
  const reward = 100; // Example reward amount
  const now = new Date();
  const user = await User.findOne({ userID, guildID });

  if (user && user.lastDaily && (now - user.lastDaily < 24 * 60 * 60 * 1000)) {
    return { success: false, message: 'You have already claimed your daily reward. Please try again later.' };
  }

  const updatedUser = await User.findOneAndUpdate(
    { userID, guildID },
    { $inc: { wallet: reward }, lastDaily: now },
    { new: true, upsert: true }
  );
  return { success: true, reward };
};

const claimWeeklyReward = async (userID, guildID) => {
  const reward = 700; // Example reward amount
  const now = new Date();
  const user = await User.findOne({ userID, guildID });

  if (user && user.lastWeekly && (now - user.lastWeekly < 7 * 24 * 60 * 60 * 1000)) {
    return { success: false, message: 'You have already claimed your weekly reward. Please try again later.' };
  }

  const updatedUser = await User.findOneAndUpdate(
    { userID, guildID },
    { $inc: { wallet: reward }, lastWeekly: now },
    { new: true, upsert: true }
  );
  return { success: true, reward };
};

const depositMoney = async (userID, guildID, amount) => {
  const user = await User.findOne({ userID, guildID });
  if (!user || user.wallet < amount) return null;
  user.wallet -= amount;
  user.bank += amount;
  await user.save();
  return true;
};

const withdrawMoney = async (userID, guildID, amount) => {
  const user = await User.findOne({ userID, guildID });
  if (!user || user.bank < amount) return null;
  user.bank -= amount;
  user.wallet += amount;
  await user.save();
  return true;
};

const transferMoney = async (senderID, senderGuildID, receiverID, receiverGuildID, amount) => {
  const sender = await User.findOne({ userID: senderID, guildID: senderGuildID });
  const receiver = await User.findOneAndUpdate(
    { userID: receiverID, guildID: receiverGuildID },
    { $inc: { wallet: amount } },
    { new: true, upsert: true }
  );
  if (!sender || sender.wallet < amount) return null;
  sender.wallet -= amount;
  await sender.save();
  await receiver.save();
  return true;
};

const getTopUsers = async (guildID) => {
  const users = await User.find({ guildID }).sort({ wallet: -1, bank: -1 }).limit(10);
  return users.map(user => ({
    userID: user.userID,
    username: `User ${user.userID}`, // Replace with actual username fetching logic
    balance: user.wallet + user.bank,
  }));
};

module.exports = {
  getBalance,
  getBankBalance,
  claimDailyReward,
  claimWeeklyReward,
  depositMoney,
  withdrawMoney,
  transferMoney,
  getTopUsers,
};
