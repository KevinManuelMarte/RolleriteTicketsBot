import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function createTicketRegistryInDatabase (username: string, transcriptFilePath: string) {
    prisma.$connect();

    const date = new Date()
    await prisma.transcripted_tickets.create({
        data: {
            username: username,
            transcriptFileLocation: transcriptFilePath,
            date: `${date.getDay() + 6}-${date.getMonth() + 1}-${date.getFullYear()}`
        }
    })

    console.log('Inserted data into the database succesfully')


}
