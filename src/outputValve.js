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
            let newData = {'state': updatedState}
            console.log(newData)
            let newState;
            const testHeaders = new Headers();
            testHeaders.append('Content-Type', 'application/json');
            testHeaders.append('Accept', 'application/json');
    
            const vesselOVPutRequest = new Request('http://mini-mes.resilience.com/bioreactor/' + vesselID + '/output-valve', {
                method: 'PUT',
                headers: testHeaders,
                mode: 'cors',
                cache: 'default',
                body: JSON.stringify(newData)
            });
    
            await fetch(vesselOVPutRequest)
            .then(response => {
                return response.json()
            }) .then(data => {
                newState = data.state
            })

            return newState
        }   
}

export default OutputValve