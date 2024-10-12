import { ActionRowBuilder, Attachment, ButtonBuilder, ButtonStyle, ChannelType, CommandInteraction, TextChannel } from "discord.js";
import discordTranscripts from 'discord-html-transcripts';

export default async function closeTicketChannel (categoryID: string, interaction: CommandInteraction, ticketChannel: TextChannel) {
    const ClosedTickethannel: TextChannel | undefined = await interaction.guild?.channels.create({
        name: `${interaction.user.username}-ticket-${interaction.user.id}-closed`,
        type: ChannelType.GuildText,
        parent: categoryID,
    })


    const TranscriptAttachment = await discordTranscripts.createTranscript(ticketChannel);

    ClosedTickethannel?.send({content: `TranscriptedChannel:`, files: [TranscriptAttachment]})
    return ClosedTickethannel
}