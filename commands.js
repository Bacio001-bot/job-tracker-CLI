#!/usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer');
const {
    addJob,
    findJob,
    updateJob,
    removeJob,
    listJobs
} = require('./index');

const questions = [
    {
        type: 'input',
        name: 'job',
        message: 'Job Name'
    },
    {
        type: 'input',
        name: 'employer',
        message: 'Employer Name'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Job Description'
    },
    {
        type: 'input',
        name: 'finished',
        message: 'Job Finished (Yes or No)'
    },
    {
        type: 'input',
        name: 'paid',
        message: 'Did the employer pay (Yes or No)'
    },
    {
        type: 'input',
        name: 'price',
        message: 'Job Price'
    }
];

program
    .version('1.0.0')
    .description('Client Management System')

program
    .command('add')
    .alias('a')
    .description('Add a job')
    .action(() => {
        prompt(questions).then(answers => addJob(answers))
    })

program
    .command('find <job>')
    .alias('f')
    .description('Find a job')
    .action(job => findJob(job))

program
    .command('update <_id>')
    .alias('u')
    .description('Update a job')
    .action(_id => {
        prompt(questions).then(answers => updateJob(_id, answers))
    })

program
    .command('remove <_id>')
    .alias('r')
    .description('Remove a job')
    .action(_id => removeJob(_id))

program
    .command('list')
    .alias('l')
    .description('List all jobs')
    .action(() => listJobs())

program.parse(process.argv);