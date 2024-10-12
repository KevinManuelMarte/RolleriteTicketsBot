import fs from 'node:fs';
import path from 'node:path';

export default async function createTranscriptedTicketFile(Path: string, content: string) {
    await fs.writeFile(Path, content, error => {
        if (error) return console.log(error);
        else console.log('Ticket transcript file written succesfully.')
    })
}