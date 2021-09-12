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

            await fetch(vesselIVRequest)
            .then(response => response.json())
            .then(data => {
                vesselIVState = data.state
            });

            return vesselIVState
    }

    // function to change state of input valve
    async putInputValve(vesselID, updatedState){
        const testHeaders = new Headers();
        testHeaders.append('Content-Type', 'application/json');
        testHeaders.append('Accept', 'application/json');

        const vesselIVPutRequest = new Request('http://mini-mes.resilience.com/bioreactor/' + vesselID + '/input-valve', {
            method: 'PUT',
            headers: testHeaders,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify({'state': updatedState})
        });

        await fetch(vesselIVPutRequest)
        .then(response => {
            if(response.ok){
                return response
            }else{
                console.log('ERROR IV PUT REQUEST')
            }
        })

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

            await fetch(vesselOVRequest)
            .then(response => response.json())
            .then(data => {
                vesselOVState = data.state
            });

            return vesselOVState

    }

    // function to change state of output valve
    async putOutputValve(vesselID, updatedState){
        const testHeaders = new Headers();
        testHeaders.append('Content-Type', 'application/json');
        testHeaders.append('Accept', 'application/json');

        const vesselOVPutRequest = new Request('http://mini-mes.resilience.com/bioreactor/' + vesselID + '/output-valve', {
            method: 'PUT',
            headers: testHeaders,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify({'state': updatedState})
        });

        await fetch(vesselOVPutRequest)
        .then(response => {
            if(response.ok){
                return response
            }else{
                console.log('ERROR IV PUT REQUEST')
            }
        })
    }

}

export default Vessel;