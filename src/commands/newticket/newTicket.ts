import { ChannelType, CommandInteraction, GuildBasedChannel, GuildChannel, SlashCommandBuilder } from "discord.js";
import config from '../../../config.json'
import createTicketChannel from "../../util/createTicketChannel";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('new_ticket')
		.setDescription('Create a new ticket manually'),
	async execute(interaction: CommandInteraction) {

        if (!interaction.isButton() && interaction.channelId != config.CommandsChannelID) return await interaction.reply({content: `You are not allowed to use that command outside <#${config.CommandsChannelID}>`, ephemeral: true})
        const TicketsCategory: GuildBasedChannel | undefined = interaction.guild?.channels.cache.get(config.TicketsCategoryID)

        if (!TicketsCategory) return interaction.reply('Category not found');

        if (TicketsCategory && TicketsCategory.type == ChannelType.GuildCategory) {
            const channel = await createTicketChannel(TicketsCategory.id, interaction);
            return await interaction.reply({content: `Ticket succesfuly created. <#${channel?.id}>`, ephemeral: true},);
        }

        //In case everything went perfectly the function will end when replying that the ticket was created succesfully.
        //In case that something went wrong. we have to make another reply for that

        interaction.reply({content: `Something went wrong.`, ephemeral: true},);
	},
};