import arg from 'arg';
import inquirer from 'inquirer';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

const checkFile = promisify(fs.exists);
const checkAccess = promisify(fs.access);
const langs = ['js', 'JS', 'Js', 'JavaScript', 'javascript', 'Javascript', 'ts', 'TS', 'Ts', 'TypeScript', 'typescript', 'Typescript'],
  template = ['node-express', 'node-express-es6', 'node-express-graphql', 'vue', 'vue3', 'react']

function parseArgumentsIntoOptions(rawArgs) {
  try {
    const args = arg(
      {
        '--git': Boolean,
        '--version': Boolean,
        '--install': Boolean,
        '--help': Boolean,
        '--type': String,
        '--lang': String,
        '--yes': Boolean,
        '--here': Boolean,
        '-y': '--yes',
        '-g': '--git',
        '-i': '--install',
        '-V': '--version',
        '-h': '--help',
      },
      {
        argv: rawArgs.slice(2),
      }
    );
    return {
      git: args['--git'] || false,
      appName: args._[0],
      runInstall: args['--install'] || false,
      version: args['--version'] || false,
      help: args['--help'] || false,
      template: args['--type'] || null,
      cWD: args['--here'] || false,
      skipPrompts: args['--yes'] || false,
      lang: args['--lang'] || null
    };
  } catch (error) {
    return (error.message)
  }
}

async function promptForMissingOptions(options) {
  let ans = {}
  const defaultTemplate = 'node-express', defaultLang = 'JavaScript';
  if (options.skipPrompts && options.appName) {
    return {
      ...options,
      lang: options.lang || defaultLang,
      template: options.template || defaultTemplate,
    };
  }

  if (options.cWD) {
    const check = await checkFile('package.json')
    if (check) {
      const ans = await inquirer.prompt([{
        type: 'confirm',
        name: 'fileOverwrite',
        message: 'A package.json file already exists, would you like to overwrite it?',
        default: false,
      }])
      if (ans.fileOverwrite !== true) {
        return console.log('Goodbye...👋')
      }
      // TODO set the pacakgeOverwrite : true
    }
  }

  if (!options.appName) {
    const answers = await inquirer.prompt([{
      type: 'string',
      name: 'appName',
      message: 'Please enter the name of the project?',
      default: (options.cWD) ? path.basename(process.cwd()) : null,
    }])
    ans.appName = answers.appName
    if (answers.appName) {
      const check = await checkFile(answers.appName)
      if (check) {
        const ans = await inquirer.prompt([{
          type: 'confirm',
          name: 'dirOverWrite',
          message: 'Looks like, dir with the app name already exists, would you like to overwrite it?',
          default: false,
        }])
        if (ans.dirOverWrite !== true) {
          return console.log('Goodbye...👋')
        }
        // TODO set the permission to overwrite the dir
      }
      // TODO look for the existing dir and ask for the Overwrite permission.
    }
  } else {
    const check = await checkFile(options.appName)
      if (check) {
        const ans = await inquirer.prompt([{
          type: 'confirm',
          name: 'dirOverWrite',
          message: 'Looks like, dir with the app name already exists, would you like to overwrite it?',
          default: false,
        }])
        if (ans.dirOverWrite !== true) {
          return console.log('Goodbye...👋')
        }
        // TODO set the permission to overwrite the dir
      }
  }

  const questions = []

  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: 'Please select a template to create project from.',
      choices: template,
      default: defaultTemplate
    })
  }

  if (!options.lang) {
    questions.push({
      type: 'list',
      name: 'lang',
      message: 'Please choose which language to use:',
      choices: ['JavaScript', 'TypeScript'],
      default: defaultLang,
    });
  }
 
  if (!options.git) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'Initialize a git repository?',
      default: false,
    });
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    appName: options.appName || ans.appName,
    template: options.template || answers.template,
    lang: options.lang || answers.lang,
    git: options.git || answers.git,
  };
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  if (typeof options === 'string' ) {
    return console.log(options)
  }
  if (options.lang) {
    if (!langs.includes(options.lang)) {
      return console.log('Wrong language argument passed.')
    }
  }
  if (options.template) {
    if (!template.includes(options.template)) {
      return console.log('Please pass valid template name.')
    }
  }
  if (options.cWD) {
    console.log(chalk.yellow('⚠ ALERT: ') + 'You are using '+ chalk.bold('--here') + ' flag, not recommended as it can '+ chalk.bold('OVERWRITE')+ ' the existing dir.')
  }
  if (options.version) {
    return console.log('0.0.1')
  }
  if (options.help) {
    console.log('List of helps:')
    return
  }
  options = await promptForMissingOptions(options);
  // if undefined return;
  console.log(options);
}