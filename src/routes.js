const express = require('express');

const routes = express.Router();

const views = __dirname + "/views/";

const profile ={
    name: "Thiago Silva",
    avatar: "https://avatars.githubusercontent.com/u/39628806?v=4",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4

}

const jobs = [
{
    id: 1,
    name: "Pizzaria Guloso",
    "daily-hours": 2,
    "total-hours": 60,
    created_at: Date.now()

},
{
    id:2,
    name: "OneTwo Project",
    "daily-hours": 3,
    "total-hours": 47,
    created_at: Date.now()

}
]


routes.get('/', (request, response) =>{
    console.log('Acessando index')

    return response.render(views + "index", {jobs})
})

routes.get('/job', (req, res) => res.render(views + "job"));
routes.post('/job', (req, res) => {
    
//req.body = { name: 'Fazendo Front', 'daily-hours': '2', 'total-hours': '2' }
    console.log(req.body)
    /** 
    const job = req.body;
    job.created_at = Date.now() // atribuindo uma nova data
 */
   
    const lastId = jobs[jobs.length - 1]?.id || 1;

    jobs.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now()
    })

    return res.redirect('/')
});
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"));
routes.get('/profile', (req, res) => res.render(views + "profile", {profile}));

module.exports = routes;