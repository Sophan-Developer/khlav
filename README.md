
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
