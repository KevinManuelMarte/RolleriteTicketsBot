import { ChannelType, CommandInteraction, GuildBasedChannel, GuildChannel, SlashCommandBuilder, TextBasedChannel, TextChannel } from "discord.js";
import config from '../../../config.json'
import createTicketChannel from "../../util/createTicketChannel";
import closeTicketChannel from "../../util/closeTicketChannel";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('close_ticket')
		.setDescription('Create a new ticket manually'),
	async execute(interaction: CommandInteraction) {

        const TicketsCategory: GuildBasedChannel | undefined = interaction.guild?.channels.cache.get(config.TicketsCategoryID);
        const ClosedTicketsCategory: GuildBasedChannel | undefined = interaction.guild?.channels.cache.get(config.ClosedTicketsCategoryID);

        if (!TicketsCategory) return interaction.reply('Tickets category not found');
        if (!ClosedTicketsCategory) return interaction.reply("Closed tickets category channel")

        const TicketChannel: TextChannel = interaction.channel as TextChannel

        if (!TicketChannel) return interaction.reply({content: 'Channel not found', ephemeral: true})
        if (TicketChannel.type != ChannelType.GuildText) return;

        if (TicketChannel.parentId != TicketsCategory.id) return interaction.reply({content: 'The channel you are trying to close is not a ticket.', ephemeral: true})


        await closeTicketChannel(ClosedTicketsCategory.id, interaction, TicketChannel);
        await TicketChannel.delete()
	},
};