class InputValve{
    constructor(vesselID){
        this.vesselID = vesselID
    }

        // function to fetch state of input valve
        async getStatus(vesselID){
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
        async changeStatus(vesselID, updatedState){
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
}

export default InputValve