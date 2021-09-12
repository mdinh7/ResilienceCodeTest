import Vessel from './vessel.js'

document.getElementById('getID').addEventListener('click', function(){
    var vessel = new Vessel
    vessel.getVessel().then(data => {
        vessel.getVesselStats(data)
        vessel.getInputValve(data)
        vessel.getOutputValve(data)
    })
});

document.getElementById('getID2').addEventListener('click', function(){
    let vesselStats = vessel.getVesselStats(vesselID)
    let IVState = vessel.getInputValve(vesselID)
    let OVState = vessel.getOutputValve(vesselID)
});