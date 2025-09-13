const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



/*
 * Reference:
 * Source: https://www.w3schools.com/nodejs/nodejs_readline.asp
 * Description: Adapted from w3schools solution to work with my files
 * Date: 2025-09-13
 */
//display the menu and collect the answers
function askQuestion(query) {
    return new Promise(resolve => {
        rl.question(query,resolve);
    });
}

async function main() {
    console.log('\n=================================');
    console.log('Author: Qinyu Luo');
    console.log('=================================');
    console.log('1. Read a file');
    console.log('2. Write a file');
    console.log('3. Exit');
    console.log('=================================');
    try {
        const choice = await askQuestion('Please enter your choice:');
    }catch(error){
        console.error('Error',error)
    }finally{
        rl.close();
    }
}

main();