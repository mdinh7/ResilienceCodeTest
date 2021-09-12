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

        vesselID = await fetch(vesselRequest)
        .then(response => response.json())
        .then(data => {
            return data
        })

        return vesselID.id
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

            vesselStats = await fetch(vesselStatsRequest)
            .then(response => response.json())
            .then(data => {
                return data
            });

            return vesselStats

    }

    // update UI table with most up to date vessel data
    updateStatsUI(){

    }

    // function to fetch state of input valve
    async getInputValve(vesselID){
        let vesselIVState;
        const testHeaders = new Headers();
        testHeaders.append('Content-Type', 'application/json');
        testHeaders.append('Accept', 'application/json');

        const vesselIVRequest = new Request('http://mini-mes.resilience.com/bioreactor/' + vesselID + '/input-valve', {
            method: 'GET',
            headers: testHeaders,
            mode: 'cors',
            cache: 'default',
        });

            vesselIVState = await fetch(vesselIVRequest)
            .then(response => response.json())
            .then(data => {
                return data
            });

            return vesselIVState.state
    }

    // function to change state of input valve
    putInputValve(vesselID){

    }

    // function to fetch state of output valve
    async getOutputValve(vesselID){
        let vesselOVState;
        const testHeaders = new Headers();
        testHeaders.append('Content-Type', 'application/json');
        testHeaders.append('Accept', 'application/json');

        const vesselOVRequest = new Request('http://mini-mes.resilience.com/bioreactor/' + vesselID + '/output-valve', {
            method: 'GET',
            headers: testHeaders,
            mode: 'cors',
            cache: 'default',
        });

            vesselOVState = await fetch(vesselOVRequest)
            .then(response => response.json())
            .then(data => {
                return data
            });

            return vesselOVState.state

    }

    // function to change state of output valve
    putOutputValve(vesselID){

    }

}

export default Vessel;