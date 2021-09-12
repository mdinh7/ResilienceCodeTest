import InputValve from './inputValve.js';
import OutputValve from './outputValve.js';
import Vessel from './vessel.js'

let inputValve;
let outputValve;
let vesselID;
let counter;
let vesselStats = {"fill_level": "", "temp_low": "", "temp_high": "", "ph_low": "", "ph_high": "", "pressure_low": "", "pressure_high": "", "time_elapsed": "" };
let vesselStatsUpdate = false;
let vessel = new Vessel

function updateCheck(){
    if(vesselStatsUpdate === true){
        vessel.getVesselStats(vesselID)
        window.setTimeout(updateCheck, 100)
    }else{

    }
}

// Initiate vessel/bioreactor and valves
document.getElementById('getID').addEventListener('click', async function(){
    vesselID = await vessel.getVessel()
    inputValve = new InputValve(vesselID)
    outputValve = new OutputValve(vesselID)
    vesselStatsUpdate = true;
    //Initiate Vessel Stats Interval Here
    updateCheck()
    console.log(vesselID)
});


// Should only show valve control after intiating vessel

//Input Valve Control
document.getElementById('inputValveControl').addEventListener('click', async function(){
    console.log("IV Vessel ID:" + inputValve.vesselID)
    let IVState = await inputValve.getStatus(vesselID)
    let newState;
    console.log('IV BEFORE:' + IVState)
    if(IVState == 'closed'){
        newState = 'open'
        //Initiate timer here
        vesselStatsUpdate = false;
    }else{
        newState = 'closed'
        // End Vessel stats here due to process end
        vesselStatsUpdate = false;
    }
    IVState = await inputValve.changeStatus(vesselID, newState)
    console.log('IV AFTER:' + IVState)
});


//Output Valve Control
document.getElementById('outputValveControl').addEventListener('click', async function(){
    console.log("OV Vessel ID:" + outputValve.vesselID)
    let OVState = await outputValve.getStatus(vesselID)
    let newState;
    console.log('OV BEFORE:' + OVState)
    if(OVState == 'closed'){
        newState = 'open'
        // End timer here
        // End Vessel stats here due to purge.
        vesselStatsUpdate = false;
    }else{
        newState = 'closed'
    }
    OVState = await outputValve.changeStatus(vesselID, newState)
    console.log('OV AFTER:' + OVState)
});
