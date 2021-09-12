class OutputValve{
    constructor(vesselID){
        this.vesselID = vesselID
    }

        // function to fetch state of output valve
        async getStatus(vesselID){
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
        async changeStatus(vesselID, updatedState){
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

export default OutputValve