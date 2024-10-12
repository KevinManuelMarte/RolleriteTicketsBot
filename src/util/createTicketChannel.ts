import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, CommandInteraction, GuildBasedChannel, PermissionFlagsBits, PermissionsBitField, TextChannel } from "discord.js";

export default async function createTicketChannel (categoryID: string, interaction: CommandInteraction) {
    const NewChannel: TextChannel | undefined = await interaction.guild?.channels.create({
        name: `${interaction.user.username}-${interaction.user.id}-ticket`,
        type: ChannelType.GuildText,
        parent: categoryID,

        permissionOverwrites: [
            {
                id: interaction.guild.id,
                deny: [PermissionsBitField.Flags.ViewChannel]
            }
        ]
    })


    //Obviously give access to the user that used the command to create the ticket
    NewChannel?.permissionOverwrites.create(interaction.user.id, {
        ViewChannel: true
    })

    const CloseButton = new ButtonBuilder()
    .setCustomId('close-ticket')
    .setLabel('Close the ticket')
    .setStyle(ButtonStyle.Danger)

    const Row = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(CloseButton)

    NewChannel?.send({content: `${interaction.user} explain your problem. Please be specific.`, components: [Row]})
    return NewChannel
}