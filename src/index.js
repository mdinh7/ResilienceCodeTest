import Vessel from './vessel.js'
let vessel = new Vessel
let vesselID;



document.getElementById('getID').addEventListener('click', async function(){
    vesselID = await vessel.getVessel()
    let vesselStats = await vessel.getVesselStats(vesselID)

    console.log(vesselID)
    console.log(vesselStats)
});

document.getElementById('inputValveControl').addEventListener('click', async function(){
    let IVState = await vessel.getInputValve(vesselID)
    console.log('IV BEFORE:' + IVState)
    if(IVState = 'open'){
        await vessel.putInputValve(vesselID, 'closed')
    }else{
        await vessel.putInputValve(vesselID, 'open')
    }
    console.log('IV AFTER:' + IVState)
});


document.getElementById('outputValveControl').addEventListener('click', async function(){
    let OVState = await vessel.getOutputValve(vesselID)
    console.log('OV BEFORE:' + OVState)
    if(OVState = 'open'){
        await vessel.putOutputValve(vesselID, 'closed')
    }else{
        await vessel.putOutputValve(vesselID, 'open')
    }
    console.log('OV AFTER:' + OVState)
});
