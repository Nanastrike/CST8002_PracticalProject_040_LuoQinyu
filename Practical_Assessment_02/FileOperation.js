const { readFile,writeFile } = require('fs').promises;
const fs = require('fs').promises;
const { resolve } = require('path');
/*
 * Reference:
 * Source: https://www.w3schools.com/nodejs/nodejs_filesystem.asp
 * Description: Adapted from w3schools solution to work with my files
 * Date: 2025-09-13
 */
//read file modules
async function readContent(fileName){
    try{
        const data = await fs.readFile(fileName,'utf-8');
        console.log('File Content: ', data);
    }catch(err){
        console.error('Errors when reading: ',err);
    }
}

// readContent('myfile.txt');

/*
 * Reference:
 * Source: https://www.w3schools.com/nodejs/nodejs_filesystem.asp
 * Description: Adapted from w3schools solution to work with my files
 * Date: 2025-09-13
 */
//write or overwrite a file
async function writeContent(newFileName, newContent){
    try{
        await fs.writeFile(newFileName,newContent,'utf-8');
    }catch(err){
        console.error('Error whhen writing: ', err);
    }
}

// writeContent('myfile.txt','sunny day');
// readContent('myfile.txt');