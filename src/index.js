import "./vesselControl.css"
import InputValve from './inputValve.js';
import OutputValve from './outputValve.js';
import Vessel from './vessel.js'


let inputValve;
let outputValve;
let vesselID;
let startTime;
let endTime;
let vesselStats = {"fill_level": "", "temp_low": "", "temp_high": "", "ph_low": "", "ph_high": "", "pressure_low": "", "pressure_high": "", "time_elapsed": "" };
let vesselValidation;
let vesselStatsUpdate = false;
let vessel = new Vessel


//bundle of functions/checks that run update check, moved outside for readability
async function vesselStatsProcess(){
    let tempStats = await vessel.getVesselStats(vesselID)
    vessel.updateStatsUI(tempStats)
    vessel.statsWarning(tempStats)
    // Initiate purge if fill level is over 72%, temp is over 81 degrees, or pressure is greater than or equal to 200
    if(tempStats.fill_percent > 72 || tempStats.temperature > 81 || tempStats.pressure >= 200){
        await outputValve.changeStatus(vesselID, 'open');
        vesselStatsUpdate = false;
        endTime = new Date()
    }else{
        if(tempStats.temperature < vesselStats.temp_low){
            vesselStats.temp_low = tempStats.temperature
        }else if(tempStats.temperature > vesselStats.temp_high){
            vesselStats.temp_high = tempStats.temperature
        }

        if(tempStats.pH < vesselStats.ph_low){
            vesselStats.ph_low = tempStats.pH
        }else if(tempStats.pH > vesselStats.ph_high){
            vesselStats.ph_high = tempStats.pH
        }

        if(tempStats.pressure < vesselStats.pressure_low){
            vesselStats.pressure_low = tempStats.pressure
        }else if(tempStats.pressure > vesselStats.pressure_high){
            vesselStats.pressure_high = tempStats.pressure
        }
    }

    console.log(vesselStats)
}

//similar bundle for final processes
async function vesselFinalProcess(){
    let finalStats = await vessel.getVesselStats(vesselID)
    vesselValidation = vessel.validate(finalStats)
    vessel.batchRecord(finalStats, vesselValidation, {'start_time': startTime, 'end_time': endTime})
}

async function updateCheck(){
    if(vesselStatsUpdate === true){
        vesselStatsProcess()
        window.setTimeout(updateCheck, 100)
    }else{
        vesselFinalProcess()
    }
}

// Initiate vessel/bioreactor and valves
document.getElementById('startVessel').addEventListener('click', async function(){
    vesselID = await vessel.getVessel()
    inputValve = new InputValve(vesselID)
    outputValve = new OutputValve(vesselID)
    await inputValve.changeStatus(vesselID, 'closed')
    await outputValve.changeStatus(vesselID, 'closed')
    vesselStatsUpdate = true;
    let initialStats = await vessel.getVesselStats(vesselID)
    vesselStats.temp_low = initialStats.temperature
    vesselStats.temp_high = initialStats.temperature
    vesselStats.ph_low = initialStats.pH
    vesselStats.ph_high = initialStats.pH
    vesselStats.pressure_low = initialStats.pressure
    vesselStats.pressure_high = initialStats.pressure
    //Initiate Vessel Stats Interval Here
    updateCheck()
});


// Should only show valve control after intiating vessel

//Input Valve Control
document.getElementById('inputValveControl').addEventListener('click', async function(){
    let IVState = await inputValve.getStatus(vesselID)
    let newState;
    if(IVState == 'closed'){
        newState = 'open'
        //Initiate timer here
        startTime = new Date()
    }else{
        newState = 'closed'
        // End Vessel stats here due to process end
        endTime = new Date()
        vesselStatsUpdate = false;
    }
    IVState = await inputValve.changeStatus(vesselID, newState)
});


//Output Valve Control
document.getElementById('outputValveControl').addEventListener('click', async function(){
    let OVState = await outputValve.getStatus(vesselID)
    let newState;
    if(OVState == 'closed'){
        newState = 'open'
        // End timer here
        endTime = new Date()
        // End Vessel stats here due to purge.
        vesselStatsUpdate = false;
    }else{
        newState = 'closed'
    }
    OVState = await outputValve.changeStatus(vesselID, newState)
});
