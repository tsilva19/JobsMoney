const Job = require('../model/Job');
const Profile = require('../model/Profile');
const JobUtils = require('../utils/jobUtils');

module.exports = {
    
    index(request, response){
        //ajuste no job 
        // calculo de tempo restante
        const jobs = Job.get();
        const profile = Profile.get();
        const updatedJobs = jobs.map((job) => {
            
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'
    
            return {
                ...job,
                    remaining,
                    status,
                    budget: JobUtils.calculateBudget(job, profile["value-hour"])

                    //budget: Profile.data["value-hour"] * job["total-hours"]
            } 
        })
        console.log('Acessando index');
    
            
    
        return response.render("index", {jobs: updatedJobs})
    },

    create(req, res){
        return res.render("job")
    },

    save(req, res) {
        //req.body = { name: 'Fazendo Front', 'daily-hours': '2', 'total-hours': '2' }
console.log(req.body)
/** 
const job = req.body;
job.created_at = Date.now() // atribuindo uma nova data
*/
const jobs = Job.get();
const lastId = jobs[Job.data.length - 1]?.id || 0;

jobs.push({
    id: lastId + 1,
    name: req.body.name,
    "daily-hours": req.body["daily-hours"],
    "total-hours": req.body["total-hours"],
    created_at: Date.now()
})

return res.redirect('/')
    },

    show(req, res){
        const jobId = req.params.id;

        const job = Job.data.find(job => Number(job.id) === Number(jobId));

        if(!job) {
            return res.send('Job is not Found!!')
        }
        
        job.budget = Job.services.calculateBudget(job,  Profile.data["value-hour"])

        return res.render("job-edit", { job })
    },

    update(req, res){
        const jobId = req.params.id;

        const job = Job.data.find(job => Number(job.id) === Number(jobId));

        if(!job) {
            return res.send('Job is not Found!!')
        }

        const updatedJob ={
            ...job,
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
        }

        Job.data = Job.data.map(job =>{
            if(Number(job.id) === Number(jobId)){
                job =updatedJob
            }
            return job
        })

        res.redirect('/job/' + jobId)
    },
    delete(req, res){
        const jobId = req.params.id;
        // filter tira do filtro
        Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

        return res.redirect('/')
    }
}
