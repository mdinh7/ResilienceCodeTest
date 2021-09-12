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
        let validObject = {"valid": "", "pressure_pass": "", "temperature_pass": "", "fill_percent_pass": "", "final_temp": "", "final_pressure": "", "final_fill_level": ""}

        // Pressure Check
        if(data.pressure < 200){
            validObject.pressure_pass = "pass"
            validObject.final_pressure = data.pressure
        }else{
            validObject.pressure_pass = "fail"
            validObject.final_pressure = data.pressure
        }
        //Temp Check
        if(data.temperature < 81){
            validObject.temperature_pass = "pass"
            validObject.temperature = data.temperature
        }else{
            validObject.temperature_pass = "fail"
            validObject.temperature = data.temperature
        }
        //Fill % Check
        if(data.fill_percent < 72){
            validObject.fill_percent_pass = "pass"
            validObject.final_fill_level = data.fill_percent_pass
        }else{
            validObject.fill_percent_pass = "fail"
            validObject.final_fill_level = data.fill_percent_pass
        }

        if(data.pressure < 200 && data.temperature < 81 && data.fill_percent < 72){
            validObject.valid = "pass"
        }else{
            validObject.valid = "fail"
        }

        return validObject;
    }

    // batch record
    batchRecord(data, validation, timeSet){
        //If vesselValidate passsed
        //Statistics: Fill level reached, temp range(lowest, highest, avg), pH range(lowest, highest, avg), pressure range(lowest,highest, avg), total time
        //Takes in data, calculates total time, then shows and updates final UI
        document.getElementById('vesselStatisticsTable').style.display = 'none'
        document.getElementById('batchRecordsTable').style.display = 'block'
    }

}

export default Vessel;