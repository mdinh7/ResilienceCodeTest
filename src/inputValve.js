class InputValve{
    constructor(vesselID){
        this.vesselID = vesselID
    }

        // function to fetch state of input valve
        async getStatus(vesselID){
            let vesselIVState;
            const testHeaders = new Headers();
            testHeaders.append('Content-Type', 'application/json');
    
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
            let newData = {'state': updatedState}
            console.log(newData)
            let newState;
            const testHeaders = new Headers();
            testHeaders.append('Content-Type', 'application/json');

    
            const vesselIVPutRequest = new Request('http://mini-mes.resilience.com/bioreactor/' + vesselID + '/input-valve', {
                method: 'PUT',
                headers: testHeaders,
                mode: 'cors',
                cache: 'default',
                body: JSON.stringify(newData)
            });
    
            await fetch(vesselIVPutRequest )
            .then(response => {
                return response.json()
            }) .then(data => {
                newState = data.state
            })

            return newState
        }   
}

export default InputValve