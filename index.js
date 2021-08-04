const { Structures, MessageEmbed } = require("discord.js");
const { resolveString } = require('discord.js').Util;

class RoleSetup {

    constructor(data = {}) {
        this.setup(data);
    }

    setup(data) {
        this.roles = [];
        return this;
    }

    addRole({role, emoji, label, style}) {
        if (style) {
            if (style == "url") style = "gray"
            else style = style
        }

        if (emoji && label && role) this.roles.push({ role: role, emoji: emoji, label: label, style: style })
        else if (emoji && role) this.roles.push({ role: role, emoji: emoji, style: style })
        else if (label && role) this.roles.push({ role: role, label: label, style: style })
        else throw new TypeError('DISCORD-BUTTON-ROLE: Please provide role id and label/emoji');
        return this;
    }

    toJSON() {
        return {
            roles: this.roles
        }
    }
}

module.exports = (client) => {
    const { MessageButton, MessageActionRow } = require("discord-buttons");

    client.on("clickButton", async button => {
        if (!button.id.startsWith("drr-")) return;
        await button.reply.defer();

        let roleID = button.id.replace("drr-", "");

        if (!button.clicker.member.roles.cache.get(roleID)) button.clicker.member.roles.add(roleID);
        else button.clicker.member.roles.remove(roleID);
    });

    class TextChannel extends Structures.get("TextChannel") {
        async createReactRoleMessage(content, RoleSetup) {
            const buttonsRoleRow1 = [];
            const buttonsRoleRow2 = [];
            const buttonsRoleRow3 = [];
            const buttonsRoleRow4 = [];
            const buttonsRoleRow5 = [];

            let i = 0;
            for(let btn of RoleSetup.roles) {
                i++

                let bouton = new MessageButton().setStyle(btn.style).setID(`drr-${btn.role}`)

                if (btn.emoji) bouton.setEmoji(btn.emoji);
                if (btn.label) bouton.setLabel(btn.label);

                if (i <=5) buttonsRoleRow1.push(bouton)
                else if (i>5 && i<=10) buttonsRoleRow2.push(bouton)
                else if (i>10 && i<=15) buttonsRoleRow3.push(bouton)
                else if (i>15 && i<=20) buttonsRoleRow4.push(bouton)
                else if (i>20 && i<=25) buttonsRoleRow5.push(bouton)
                else return;
            };

            const ListeRows = [];

            if (buttonsRoleRow1.length) ListeRows.push(new MessageActionRow().addComponents(buttonsRoleRow1));
            if (buttonsRoleRow2.length) ListeRows.push(new MessageActionRow().addComponents(buttonsRoleRow2));
            if (buttonsRoleRow3.length) ListeRows.push(new MessageActionRow().addComponents(buttonsRoleRow3));
            if (buttonsRoleRow4.length) ListeRows.push(new MessageActionRow().addComponents(buttonsRoleRow4));
            if (buttonsRoleRow5.length) ListeRows.push(new MessageActionRow().addComponents(buttonsRoleRow5));

            if (content instanceof MessageEmbed) this.send({ embed: content, components: ListeRows })

            else this.send(content, { components: ListeRows});
        };
    };

    Structures.extend("TextChannel", () => TextChannel);

    return {
        RoleSetup: RoleSetup
    };
};

module.exports.RoleSetup = RoleSetup;