
discord-button-role is a package that allow you to easily create buttons to add roles.

## Install
```sh
npm install discord-button-role
```
## Setup
```js
const discord = require('discord.js');
const client = new discord.Client();
require('discord-buttons')(client); // must be below your discord.Client()
require('discord-button-role')(client); // must be below your discord.Client()
```

### You need to require both discord-buttons and discord-button-role 

<br />

## Method
```js
channel.createReactRoleMessage(content/embed, Setuprole);
```

## Example
```js
const embed = new Discord.MessageEmbed().setColor("BLURPLE").setDescription("Click to add role !")

const Setuprole = new disreact.RoleSetup()
    .addRole({role: "833098076050030635", emoji: "👍", style: "green" })
    .addRole({role: "833098076050030635", label: "member", style: "red" })
    .addRole({role: "833098076050030635", label: "news", emoji: "📰" })

message.channel.createReactRoleMessage(embed, Setuprole)
// or 
message.channel.createReactRoleMessage("Click to add role !", Setuprole)
```
- You can put max 25 roles.
- If you don't precise any style, it will be "grey".

<br />

