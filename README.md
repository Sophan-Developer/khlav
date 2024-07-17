
# Khlav

Khlav is an npm package that provides economy and gambling functionalities for your projects, designed to work seamlessly with Discord bots and other applications.

## Features

- **Economy Management**: Handle user balances, deposits, withdrawals, and transfers.
- **Gambling Games**: Include games like slots and spin with win/loss outcomes.
- **Rewards System**: Daily and weekly rewards for users.
- **User Ranking**: Get the top users based on their balance.

## Installation

Install the package via npm:

```bash
npm install khlav
```

## Setup

### Environment Variables

Create a `.env` file in your project root with the following content:

```env
MONGODB_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your actual MongoDB connection string.

### Usage

### Initialize MongoDB Connection

In your main application file, initialize the MongoDB connection:

```javascript
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
```

### Economy Functions

#### Get User Balance

```javascript
const { economy } = require('khlav');

async function getUserBalance(userID, guildID) {
  const balance = await economy.getBalance(userID, guildID);
  console.log(`User balance: \${balance} coins`);
}
```

#### Deposit Money

```javascript
async function depositToBank(userID, guildID, amount) {
  const success = await economy.depositMoney(userID, guildID, amount);
  console.log(success ? `Deposited \${amount} coins` : `Failed to deposit`);
}
```

#### Withdraw Money

```avascript
async function withdrawFromBank(userID, guildID, amount) {
  const success = await economy.withdrawMoney(userID, guildID, amount);
  console.log(success ? `Withdrew \${amount} coins` : `Failed to withdraw`);
}
```

#### Transfer Money

```javascript
async function transferFunds(senderID, senderGuildID, receiverID, receiverGuildID, amount) {
  const success = await economy.transferMoney(senderID, senderGuildID, receiverID, receiverGuildID, amount);
  console.log(success ? `Transferred \${amount} coins` : `Failed to transfer`);
}
```

#### Claim Daily Reward

```javascript
async function claimDaily(userID, guildID) {
  const result = await economy.claimDailyReward(userID, guildID);
  console.log(result.success ? `Claimed daily reward of \${result.reward} coins` : result.message);
}
```

#### Claim Weekly Reward

```javascript
async function claimWeekly(userID, guildID) {
  const result = await economy.claimWeeklyReward(userID, guildID);
  console.log(result.success ? `Claimed weekly reward of \${result.reward} coins` : result.message);
}
```

#### Get Top Users

```javascript
async function getTopUsers(guildID) {
  const topUsers = await economy.getTopUsers(guildID);
  topUsers.forEach((user, index) => {
    console.log(`\${index + 1}. \${user.username} - \${user.balance} coins`);
  });
}
```

### Gambling Functions

#### Play Slots

```javascript
const { gambling } = require('khlav');

async function playSlotsGame(userID, guildID, amount) {
  const result = await gambling.playSlots(userID, guildID, amount);
  if (result) {
    console.log(result.win ? `You won \${result.amount} coins!` : `You lost \${-result.amount} coins.`);
  } else {
    console.log('Failed to play. Please check your balance.');
  }
}
```

#### Play Spin

```javascript
async function playSpinGame(userID, guildID, amount) {
  const result = await gambling.playSpin(userID, guildID, amount);
  if (result) {
    console.log(result.win ? `You won \${result.amount} coins!` : `You lost \${-result.amount} coins.`);
  } else {
    console.log('Failed to play. Please check your balance.');
  }
}
```

## Example Bot Integration

Here's an example of how you can integrate `khlav` with a Discord bot using `discord.js`:

```javascript
const { Client, GatewayIntentBits } = require('discord.js');
const { economy, gambling } = require('khlav');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const args = message.content.split(' ');

  if (args[0] === '!balance') {
    const balance = await economy.getBalance(message.author.id, message.guild.id);
    message.reply(`Your balance is \${balance} coins.`);
  }

  if (args[0] === '!daily') {
    const result = await economy.claimDailyReward(message.author.id, message.guild.id);
    message.reply(result.success ? `You have claimed your daily reward of \${result.reward} coins.` : result.message);
  }

  if (args[0] === '!weekly') {
    const result = await economy.claimWeeklyReward(message.author.id, message.guild.id);
    message.reply(result.success ? `You have claimed your weekly reward of \${result.reward} coins.` : result.message);
  }

  if (args[0] === '!deposit') {
    const amount = parseInt(args[1], 10);
    const success = await economy.depositMoney(message.author.id, message.guild.id, amount);
    message.reply(success ? `You have deposited \${amount} coins to your bank.` : `Failed to deposit. Please check your balance.`);
  }

  if (args[0] === '!withdraw') {
    const amount = parseInt(args[1], 10);
    const success = await economy.withdrawMoney(message.author.id, message.guild.id, amount);
    message.reply(success ? `You have withdrawn \${amount} coins from your bank.` : `Failed to withdraw. Please check your bank balance.`);
  }

  if (args[0] === '!transfer') {
    const receiverID = args[1];
    const amount = parseInt(args[2], 10);
    const success = await economy.transferMoney(message.author.id, message.guild.id, receiverID, message.guild.id, amount);
    message.reply(success ? `You have transferred \${amount} coins to user \${receiverID}.` : `Failed to transfer. Please check your balance.`);
  }

  if (args[0] === '!slots') {
    const amount = parseInt(args[1], 10);
    const result = await gambling.playSlots(message.author.id, message.guild.id, amount);
    message.reply(result ? (result.win ? `You won \${result.amount} coins!` : `You lost \${-result.amount} coins.`) : `Failed to play. Please check your balance.`);
  }

  if (args[0] === '!spin') {
    const amount = parseInt(args[1], 10);
    const result = await gambling.playSpin(message.author.id, message.guild.id, amount);
    message.reply(result ? (result.win ? `You won \${result.amount} coins!` : `You lost \${-result.amount} coins.`) : `Failed to play. Please check your balance.`);
  }

  if (args[0] === '!top') {
    const topUsers = await economy.getTopUsers(message.guild.id);
    const leaderboard = topUsers.map((user, index) => `\${index + 1}. \${user.username} - \${user.balance} coins`).join('\n');
    message.reply(`Top users:\n\${leaderboard}`);
  }
});

client.login(process.env.DISCORD_TOKEN);
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
