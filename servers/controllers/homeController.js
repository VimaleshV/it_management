const db = require('../../utility/dbUtiltiy');

const profile_image = 'default.png';

exports.homepage = async(req, res) => {
    try{
        let holidays = [];
        let events = [];
        let homeSlide = [];
        let leaveBalance = [];

        var holidayResult = await db.getDbResults("SELECT * from holidays where active_flag = 1");
        if(holidayResult.success){
            holidays = holidayResult.results;
        }

        var eventResult = await db.getDbResults("SELECT * from events where active_flag = 1");
        if(eventResult.success){
            events = eventResult.results;
        }

        var homeSlideResult = await db.getDbResults("SELECT * from home_slide where active_flag = 1");
        if(homeSlideResult.success){
            homeSlide = homeSlideResult.results;
        }

        var leaveBalanceResult = await db.getDbResults("SELECT * from user_leave_balance where user_id = 1 and active_flag = 1");
        if(leaveBalanceResult.success){
            leaveBalance = leaveBalanceResult.results;
        }

        res.render('homepage', { holidays, events, homeSlide, leaveBalance }); 

    }catch(err){
        console.log(err);
        res.render('homepage', { holidays : [], events : [], homeSlide: [], leaveBalance : [] });
    }
    
   
}
