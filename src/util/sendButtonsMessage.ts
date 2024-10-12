import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Interaction, Message, OmitPartialGroupDMChannel, TextBasedChannel } from "discord.js";

export default function sendButtonsMessage (interaction: OmitPartialGroupDMChannel<Message>) {
    const Channel: TextBasedChannel = interaction.channel as TextBasedChannel;

    const CreateButton: ButtonBuilder = new ButtonBuilder()
    .setCustomId('create-ticket')
    .setLabel('Create ticket')
    .setStyle(ButtonStyle.Primary)


    const ActionRow: ActionRowBuilder<ButtonBuilder> = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(CreateButton);


    if (Channel.isSendable()) {
        Channel.send({components: [ActionRow]})
    }

    
    
}