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

}

export default Vessel;