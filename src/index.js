import InputValve from './inputValve.js';
import OutputValve from './outputValve.js';
import Vessel from './vessel.js'

let inputValve;
let outputValve;
let vesselID;
let vessel = new Vessel



document.getElementById('getID').addEventListener('click', async function(){
    vesselID = await vessel.getVessel()
    let vesselStats = await vessel.getVesselStats(vesselID)

    console.log(vesselID)
    console.log(vesselStats)
});

document.getElementById('inputValveControl').addEventListener('click', async function(){
    inputValve = new InputValve(vesselID)
    console.log("IV Vessel ID:" + inputValve.vesselID)
    let IVState = await inputValve.getStatus(vesselID)
    console.log('IV BEFORE:' + IVState)
    if(IVState = 'open'){
        await inputValve.changeStatus(vesselID, 'closed')
    }else{
        await inputValve.changeStatus(vesselID, 'open')
    }
    console.log('IV AFTER:' + IVState)
});


document.getElementById('outputValveControl').addEventListener('click', async function(){
    outputValve = new OutputValve(vesselID)
    console.log("OV Vessel ID:" + outputValve.vesselID)
    let OVState = await outputValve.getStatus(vesselID)
    console.log('OV BEFORE:' + OVState)
    if(OVState = 'open'){
        await outputValve.changeStatus(vesselID, 'closed')
    }else{
        await outputValve.changeStatus(vesselID, 'open')
    }
    console.log('OV AFTER:' + OVState)
});
