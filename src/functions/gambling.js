const User = require('../modules/user');

const playSlots = async (userID, guildID, amount) => {
  const user = await User.findOne({ userID, guildID });
  if (!user || user.wallet < amount) return null;
  const win = Math.random() > 0.5;
  user.wallet += win ? amount : -amount;
  await user.save();
  return { win, amount: win ? amount : -amount };
};

const playSpin = async (userID, guildID, amount) => {
  const user = await User.findOne({ userID, guildID });
  if (!user || user.wallet < amount) return null;
  const win = Math.random() > 0.5;
  user.wallet += win ? amount : -amount;
  await user.save();
  return { win, amount: win ? amount : -amount };
};

module.exports = {
  playSlots,
  playSpin,
};
