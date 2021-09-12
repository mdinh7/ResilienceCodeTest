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

//Statistics: Fill level reached, temp range(lowest, highest, avg), pH range(lowest, highest, avg), pressure range(lowest,highest, avg), total time

// Initiate vessel/bioreactor and valves
document.getElementById('getID').addEventListener('click', async function(){
    vesselID = await vessel.getVessel()
    inputValve = new InputValve(vesselID)
    outputValve = new OutputValve(vesselID)
    vesselStatsUpdate = true;
    //Initiate Vessel Stats Interval Here
    while(vesselStatsUpdate = true){
        setInterval(await vessel.getVesselStats(vesselID), 10000)
    }

    console.log(vesselID)
});

//Input Valve Control
document.getElementById('inputValveControl').addEventListener('click', async function(){
    console.log("IV Vessel ID:" + inputValve.vesselID)
    let IVState = await inputValve.getStatus(vesselID)
    console.log('IV BEFORE:' + IVState)
    if(IVState = 'open'){
        await inputValve.changeStatus(vesselID, 'closed')
        // End Vessel stats here due to process end
        vesselStatsUpdate = false;
    }else{
        await inputValve.changeStatus(vesselID, 'open')
        //Initiate timer here
    }
    console.log('IV AFTER:' + IVState)
});


//Output Valve Control
document.getElementById('outputValveControl').addEventListener('click', async function(){
    console.log("OV Vessel ID:" + outputValve.vesselID)
    let OVState = await outputValve.getStatus(vesselID)
    console.log('OV BEFORE:' + OVState)
    if(OVState = 'open'){
        await outputValve.changeStatus(vesselID, 'closed')
    }else{
        await outputValve.changeStatus(vesselID, 'open')
        // End timer here
        // End Vessel stats here due to purge.
        vesselStatsUpdate = false;
    }
    console.log('OV AFTER:' + OVState)
});
