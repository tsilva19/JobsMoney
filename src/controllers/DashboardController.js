const Job = require('../model/Job');
const JobUtils = require('../utils/JobUtils');
const Profile = require('../model/Profile');

module.exports ={
    index(request, response){
        //ajuste no job 
        // calculo de tempo restante
        const jobs = Job.get();
        const profile = Profile.get();

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }
        //total de horas por dia de cada Job em progress
        let jobTotalHours = 0;
        const updatedJobs = jobs.map((job) => {
        const remaining = JobUtils.remainingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress'
        //Somando a quantidade de status
        statusCount[status] += 1;
        
        jobTotalHours = status == 'progress' ? jobTotalHours + Number(job["daily-hours"]) : jobTotalHours
        
        
        

        jobTotalHours = statusCount[status];



        return {
            ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])

                //budget: Profile.data["value-hour"] * job["total-hours"]
        };
        });
        console.log('Acessando index');

        // qtd de horas que quero trabalhar menos quantidade de horas/dia
        const freeHours = profile["hours-per-day"] - jobTotalHours;

        return response.render("index", {jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours})
    },
}

 