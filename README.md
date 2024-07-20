
# Khlav - A Comprehensive Economy and Gambling System

Khlav is a robust and customizable economy and gambling system for your Node.js applications. It includes features such as managing user balances, inventory, and various gambling games.

## Features

- **Economy Management**: Manage user wallets and bank accounts.
- **Inventory System**: Add, remove, and manage items in user inventories.
- **Gambling Games**: Includes slot machine and spin games.
- **Rewards System**: Claim daily, weekly, and other periodic rewards.
- **Transfer System**: Transfer money between users.
- **Leaderboard**: Display top users based on balance.

## Installation

Install Khlav using npm:

```sh
npm install khlav
```

## Usage

### Setting Up MongoDB

Set your MongoDB connection URL using the `setMongoURL` method:

```javascript
const CurrencySystem = require('khlav');
const currencySystem = new CurrencySystem();

const mongoURL = 'your_mongodb_connection_string'; // Replace with your actual MongoDB connection string
currencySystem.setMongoURL(mongoURL);
```

### Economy Functions

#### Get Balance

```javascript
const balance = await currencySystem.getBalance(userId);
console.log(`User Balance: ${balance}`);
```

#### Get Bank Balance

```javascript
const bankBalance = await currencySystem.getBankBalance(userId);
console.log(`User Bank Balance: ${bankBalance}`);
```

#### Deposit Money

```javascript
const success = await currencySystem.depositMoney(userId, amount);
console.log(`Deposit Successful: ${success}`);
```

#### Withdraw Money

```javascript
const success = await currencySystem.withdrawMoney(userId, amount);
console.log(`Withdrawal Successful: ${success}`);
```

#### Transfer Money

```javascript
const success = await currencySystem.transferMoney(senderId, receiverId, amount);
console.log(`Transfer Successful: ${success}`);
```

### Gambling Functions

#### Play Slots

```javascript
const result = await currencySystem.playSlots(userId, amount);
console.log(`Slots Result: ${result.win ? 'Win' : 'Lose'}, Amount: ${result.amount}`);
```

#### Play Spin

```javascript
const result = await currencySystem.playSpin(userId, amount);
console.log(`Spin Result: ${result.win ? 'Win' : 'Lose'}, Amount: ${result.amount}`);
```

### Rewards Functions

- hourly
- Daily
- Weekly
- monthly
- hafly
- quaterly
- yearly

#### Claim Daily Reward

```javascript
const reward = await currencySystem.claimDailyReward(userId);
if (reward.success) {
  console.log(`Daily Reward Claimed: ${reward.reward}`);
} else {
  console.log(reward.message);
}
```

#### Claim Weekly Reward

```javascript
const reward = await currencySystem.claimWeeklyReward(userId);
if (reward.success) {
  console.log(`Weekly Reward Claimed: ${reward.reward}`);
} else {
  console.log(reward.message);
}
```

### Inventory Functions

#### Add Item to Inventory

```javascript
const item = {
  name: 'Sword',
  price: 100,
  description: 'A sharp blade.'
};
const result = await currencySystem.addItem({ guild: { id: guildId }, inventory: item });
console.log(`Item Added: ${result.item.name}`);
```

#### Remove Item from Inventory

```javascript
const result = await currencySystem.removeItem({ guild: { id: guildId }, item: itemId });
console.log(`Item Removed: ${result.inventory.name}`);
```

### Leaderboard Functions

#### Get Top Users

```javascript
const topUsers = await currencySystem.getTopUsers();
console.log('Top Users:', topUsers);
```

## Configuration

In the `example.js` file, the following configuration settings are demonstrated:

```javascript
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
```

## Roleplay Commands

```javascript
const { getGif } = require('khlav');

async function runExample() {
  try {
    const gif = await getGif('hug');
    console.log(gif); // URL of the hug gif
  } catch (error) {
    console.error(error);
  }
}

runExample();

```
```javascript
const klv = require('khlav');

//In this example we use the anime bite endpoint
klv.getGif('bite').then((data) => {
  console.log(data) // This return as example: https://apiservice1.kisara.app/satou/interactions/bite/6.gif
})

//OR with async/await function

const data = async() => {
  const data = await klv.getGif('bite');
  console.log(data); // This return as example: https://apiservice1.kisara.app/satou/interactions/bite/3.gif
}
```

## Example Bot

```javascript
const { Client, Intents } = require('discord.js');
const { CurrencySystem, getGif } = require('khlav');
const cs = new CurrencySystem();
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

cs.setMongoURL('your-mongodb-url');

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
    const gif = await getGif('hug');
    message.channel.send(`${message.author} hugs ${message.mentions.users.first()}\n${gif}`);
  }
});

client.login('your-bot-token');
```

## Roleplay List

- angry
- anime
- bite
- bored
- bread
- chocolate
- cookie
- cuddle
- dance
- drunk
- happy
- hug
- kick
- kill
- kiss
- laugh
- lick
- lonely
- pat
- poke
- pregnant
- punch
- run
- satouselfies
- slap
- sleep
- spank
- spit
- steal
- tickle
- nomm

## Contributing

Feel free to fork this repository and submit pull requests. We welcome all contributions that improve the functionality and usability of Khlav.

## License

This project is licensed under the Apache-2.0 License.

<!-- # Templates

This will go through all functions with example's.
See https://github.com/BIntelligent/currency-system/tree/main/v14-ExampleBot for an example bot. -->

# NEW!

- Added `transferItems()`.

<!-- # Bug Reports -->

<!-- Join our [Support Server](https://discord.gg/stERZwjA9m). -->

<!-- Package Made by: `Be Intelligent#1715`. -->

<!-- # Docs -->

<!-- 📚 [Currency System Documentation](https://currency-system.js.org) (Outdated, please use the GitHub repo, it's always maintained). -->

# For Global Economy

To make it global, remove the following line from every command:

```js
guild: interaction.guild,
```

and add:

```js
guild: { id : null } 
```
