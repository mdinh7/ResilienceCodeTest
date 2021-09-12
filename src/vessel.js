class Vessel{
    
    // function to fetch vessel id
    async getVessel(){
        let vesselID;

        const testHeaders = new Headers();
        testHeaders.append('Content-Type', 'application/json');
        testHeaders.append('Accept', 'application/json');
        testHeaders.append('Access-Control-Allow-Origin', '*');

        const vesselRequest = new Request('http://mini-mes.resilience.com/bioreactor/0', {
            method: 'GET',
            headers: testHeaders,
            mode: 'cors',
            cache: 'default',
        });

        await fetch(vesselRequest)
        .then(response => response.json())
        .then(data => {
           vesselID = data.id
        })
        
        return vesselID
    }   

    // function to fetch vessel state
    async getVesselStats(vesselID){
        let vesselStats;

        const testHeaders = new Headers();
        testHeaders.append('Content-Type', 'application/json');
        testHeaders.append('Accept', 'application/json');

        const vesselStatsRequest = new Request('http://mini-mes.resilience.com/bioreactor/' + vesselID, {
            method: 'GET',
            headers: testHeaders,
            mode: 'cors',
            cache: 'default',
        });
        await fetch(vesselStatsRequest)
        .then(response => response.json())
        .then(data => {
            vesselStats = data
        });

        return vesselStats
    }

    // update UI table with most up to date vessel data
    updateStatsUI(data){

    }

    // stats warning
    statsWarning(data){
        //Within 10% of fill level warning
        //Within 20kPa of pressure
        //Within 10 degrees C
    }

    // validate batch success
    validate(data){
        //Over 72%
        //Pressure is equal to or greater than 200kPa
        //Temperature is over 81 degrees C
        //Returns what passed and what failed, as well as overall pass/fail
    }

    // batch record
    batchRecord(data, validation, timeSet){
        //If vesselValidate passsed
        //Statistics: Fill level reached, temp range(lowest, highest, avg), pH range(lowest, highest, avg), pressure range(lowest,highest, avg), total time
    }

}

export default Vessel;