module.exports = {
    remainingDays(job){

        const remainingDays = (job["total-hours"]/job["daily-hours"]).toFixed()

        const createdDate = new Date(job.created_at)
        const dueDay = createdDate.getDate() + Number(remainingDays)
        const dueDateInMS = createdDate.setDate(dueDay);
    
        const timeDiffinMS = dueDateInMS - Date.now()
        // transformar milli em dias
        const dayInMs = 1000 * 60 * 60 * 24;
        
        const dayDiff = Math.floor(timeDiffinMS / dayInMs);
        console.log("remainingDays", remainingDays)
        console.log("createdDate", createdDate)
        console.log("dueDay", dueDay)
        console.log("dueDay", dueDateInMS)
        console.log("timeDiffinMS", timeDiffinMS)
        console.log("dayInMs", dayInMs)
        console.log("dayDiff", dayDiff)
        // restam x dias 
        return dayDiff;
    
    },

    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}