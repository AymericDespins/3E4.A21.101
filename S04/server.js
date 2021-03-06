import './env.js';
import chalk from "chalk";
// const chalk = required('chalk'); équivalent à la ligne 1

import app from './src/app.js';

console.log(chalk.red('Du rouge texté'));

const PORT = process.env.PORT;

app.listen(PORT, err => {
    console.log(chalk.blue(`Server listening on port : ${PORT}`));
});