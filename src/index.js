import "./vesselControl.css"
import InputValve from './inputValve.js';
import OutputValve from './outputValve.js';
import Vessel from './vessel.js'


let inputValve;
let outputValve;
let vesselID;
let startTime;
let endTime;
let vesselStats = {"vessel_id": "", "fill_level": "", "temp_low": "", "temp_high": "", "ph_low": "", "ph_high": "", "pressure_low": "", "pressure_high": "", "time_elapsed": "" };
let IVState;
let OVState;
let vesselValidation;
let vesselStatsUpdate = false;
let vessel = new Vessel


//bundle of functions/checks that run update check, moved outside for readability
async function vesselStatsProcess(){
    let tempStats = await vessel.getVesselStats(vesselID)
    vessel.updateStatsUI(tempStats)
    vessel.statsWarning(tempStats)
    // Initiate purge if fill level is over 82%, temp is over 90 degrees, or pressure is greater than or equal to 210
    // This section is a fail-safe in case the user does not interact
    if(tempStats.fill_percent > 82 || tempStats.temperature > 90 || tempStats.pressure >= 210){
        await outputValve.changeStatus(vesselID, 'open');
        if(IVState == 'open'){
            await inputValve.changeStatus(vesselID, 'closed');
        }
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

}

//similar bundle for final processes
async function vesselFinalProcess(){
    let finalStats = await vessel.getVesselStats(vesselID)
    vesselStats.fill_level = finalStats.fill_percent
    vesselValidation = vessel.validate(finalStats)
    vessel.batchRecord(vesselStats, vesselValidation, {'start_time': startTime, 'end_time': endTime})
}

async function updateCheck(){
    if(vesselStatsUpdate === true){
        vesselStatsProcess()
        window.setTimeout(updateCheck, 500)
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
    vesselStats.vessel_id = vesselID
    vesselStats.fill_level = initialStats.fill_percent
    vesselStats.temp_low = initialStats.temperature
    vesselStats.temp_high = initialStats.temperature
    vesselStats.ph_low = initialStats.pH
    vesselStats.ph_high = initialStats.pH
    vesselStats.pressure_low = initialStats.pressure
    vesselStats.pressure_high = initialStats.pressure
    //Initiate Vessel Stats Interval Here
    updateCheck()
    document.getElementById('startVessel').style.display = 'none'
    document.getElementById('startVessel').disabled = 'true'
    document.getElementById('inputValveControl').style.display = 'block'
    document.getElementById('outputValveControl').style.display = 'block'
});


// Should only show valve control after intiating vessel

//Input Valve Control
document.getElementById('inputValveControl').addEventListener('click', async function(){
    IVState = await inputValve.getStatus(vesselID)
    let newState;
    if(IVState == 'closed' && OVState !== 'open'){
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
    OVState = await outputValve.getStatus(vesselID)
    let newState;
    if(OVState == 'closed' && IVState !== 'open'){
        newState = 'open'
        // End timer here
        endTime = new Date()
        // End Vessel stats here due to purge.
        vesselStatsUpdate = false;
    }else if(OVState == 'closed' && IVState == 'open'){
        await inputValve.changeStatus(vesselID, 'closed')
        newState = 'open'
        endTime = new Date()
        vesselStatsUpdate = false;
    }else{
        newState = 'closed'
    }
    OVState = await outputValve.changeStatus(vesselID, newState)
});

//Next Button

document.getElementById('nextVessel').addEventListener('click', function(){
    inputValve= undefined;
    outputValve= undefined;
    vesselID = undefined;
    startTime = undefined;
    endTime = undefined;
    vesselStats = {"vessel_id": "", "fill_level": "", "temp_low": "", "temp_high": "", "ph_low": "", "ph_high": "", "pressure_low": "", "pressure_high": "", "time_elapsed": "" };
    IVState = undefined;
    OVState = undefined;
    vesselValidation = undefined;
    vesselStatsUpdate = false;
    vessel = new Vessel
    document.getElementById('nextVessel').style.display = 'none'
    document.getElementById('vesselStatisticsTable').style.display = 'table'
    document.getElementById('startVessel').style.display = 'block'
    document.getElementById('batchRecordsTable').style.display = 'none'

});
