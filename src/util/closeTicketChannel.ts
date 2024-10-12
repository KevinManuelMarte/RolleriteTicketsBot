import { ActionRowBuilder, Attachment, ButtonBuilder, ButtonStyle, ChannelType, CommandInteraction, TextChannel } from "discord.js";
import discordTranscripts from 'discord-html-transcripts';
import createTranscriptedTicketFile from "./createTranscriptedTicketFile";
import createTicketRegistryInDatabase from "./createTicketRegistryInDatabase";

export default async function closeTicketChannel (categoryID: string, interaction: CommandInteraction, ticketChannel: TextChannel) {
    const ClosedTickethannel: TextChannel | undefined = await interaction.guild?.channels.create({
        name: `${ticketChannel.name}-closed`,
        type: ChannelType.GuildText,
        parent: categoryID,
    })


    await interaction.reply('Please wait..');

    const TranscriptAttachment = await discordTranscripts.createTranscript(ticketChannel);

    await createTranscriptedTicketFile(`transcripts/${ClosedTickethannel?.name}-${ClosedTickethannel?.id}-${new Date().getDay()}.html`, TranscriptAttachment.attachment.toString())
    await createTicketRegistryInDatabase(`${ClosedTickethannel?.name}`, `transcripts/${ClosedTickethannel?.name}-${ClosedTickethannel?.id}-${new Date().getDay()}.html`)

    ClosedTickethannel?.send({content: `TranscriptedChannel:`, files: [TranscriptAttachment]})
    return ClosedTickethannel
}