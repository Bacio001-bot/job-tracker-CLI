require('dotenv-flow').config();
const mongoose = require('mongoose');
const chalk = require('chalk')
mongoose.Promise = global.Promise;

const db = mongoose.connect(process.env.DATABASE_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Job = require('./models/job')

const addJob = (job) => {

    job.date = Date(Date.now()).toString();
    if(isNaN(job.price)) job.price = 0;
    if (!job.finished.toLowerCase() == true || !job.finished.toLowerCase() == false) job.finished = job.finished.toLowerCase() == 'yes' ? true : false;
    if (!job.paid.toLowerCase() == true || !job.paid.toLowerCase() == false) job.paid = job.paid.toLowerCase() == 'yes' ? true : false;

    Job.create(job).then(job => {
        console.info(chalk.bold(chalk.green('New Job Added')));
    })

}

const findJob = (id) => {

    const search = new RegExp(id, 'i')
    Job.find({ $or: [{ job: search }] }).then((job => {
        if (job.length == 0) console.info(chalk.bold(chalk.red(`No matches found with the job id => ${id}`)));
        else {
            console.info(chalk.bold(chalk.cyan(`\n There are ${job.length} job(s) with that id, check the listing below \n `)));
            console.info(job);
        }
    }))

}

const updateJob = (_id, job) => {
    Job.findOne({ _id: _id }).then((jobA => {

        console.log(jobA.job)
        console.log(job)

        if(job.job == '') job.job = jobA.job
        if(job.employer == '') job.employer = jobA.employer
        if(job.description == '') job.description = jobA.description
        if(job.finished == '') job.finished = jobA.finished
        else job.finished = job.finished.toLowerCase() == 'yes' ? true : false;        
        if(job.paid == '') job.paid = jobA.paid
        else job.paid = job.paid.toLowerCase() == 'yes' ? true : false;        
        if(job.price == '') job.price = jobA.price

        console.log(job)

        Job.updateOne({ _id }, job)
            .then(job => {
                console.info(chalk.bold(chalk.green('Job Updated')));
            })
    }))
}

const removeJob = (_id) => {
    Job.deleteOne({ _id })
        .then(job => {
            console.info(chalk.bold(chalk.green('Job Removed')));
        })
}

const listJobs = () => {
    Job.find()
        .then(jobs => {
            if (jobs.length == 0) console.info(chalk.bold(chalk.red(`No jobs have been registerd yet`)));
        else {
            console.info(chalk.bold(chalk.cyan(`\n There are ${jobs.length} job(s) registerd, check the listing below \n `)));
            console.info(jobs);
        }
        })
}

module.exports = {
    addJob,
    findJob,
    updateJob,
    removeJob,
    listJobs
}