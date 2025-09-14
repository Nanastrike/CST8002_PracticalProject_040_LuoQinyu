/*
 * Reference:
 * Source: https://www.w3schools.com/nodejs/nodejs_filesystem.asp
 * Description: Adapted from w3schools solution to work with my files
 * Date: 2025-09-13
 */

const { readFile, writeFile } = require('fs').promises;
const fs = require('fs').promises;
const Ask = require('./ask')

//check if this file exists
async function fileExists(filename) {
    try {
        await fs.access(filename);
        return true;
    } catch (error) {
        return false;
    }
}

//check if the file is end with .txt
function checkTxt(filename) {
    if (!filename.endsWith('.txt')) {
        filename += '.txt';
    }
    return filename;
}

//read file modules
async function readContent(fileName) {
    try {
        fileName = checkTxt(fileName);
        if (await fileExists(fileName) === false) {
            console.log('This file does not exist, returning to the menu now...');
            return;
        } else {
            const data = await readFile(fileName, 'utf-8');
            console.log('File Content: \n', data);
            return;
        }
    } catch (err) {
        console.error('Errors when reading: ', err);
    }
}

//write or overwrite a file
async function writeContent(fileName) {
    try {
        fileName = checkTxt(fileName)
        if (await fileExists(fileName)===false) {
            //if the file does not exist
            const answer1 = await Ask.askQuestion('This file does not exist, create a new file? (y/n)\n');
            let fileContent;
            //if the user chooses not to create a new file, display the menu again
            if (answer1 === 'n' || answer1 === 'N') {
                console.log('No new file created, returning to the menu now...');
                return;
                //if the user chooses to create a new file, collect the file content
            } else if (answer1 === 'y' || answer1 === 'Y') {
                fileContent = await Ask.askQuestion('Please enter your file content: \n');
                await writeFile(fileName, fileContent,'utf8');
                console.log("New file " + fileName+" is created!")
                return;
            } else {
                //if the user inputs a random answer
                console.log('Please enter a valid input, returning to the menu now...')
            }

        } else {
            //if the file already exists
            const answer2 = await Ask.askQuestion('This file already exists, do you want to overwrite it? (y/n)\n');
            let fileContent;
            if (answer2 === 'y' || answer2 === 'Y') {
                //if user wanna overwrite the file
                fileContent = await Ask.askQuestion('Please enter your file content: \n');
                await writeFile(fileName, fileContent,'utf8');
            } else if (answer2 === 'n' || answer2 === 'N') {
                //if user chooses not to overwrite it
                console.log('No file overwritten, returning to the menu now...')
            } else {
                console.log('Please enter a valid input, returning to the menu now...')
            }
            
        }
    } catch (err) {
        console.error('Error when writing: ', err);
    }

}



module.exports = { readContent, writeContent };
