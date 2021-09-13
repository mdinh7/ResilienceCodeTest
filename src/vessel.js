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
        document.getElementById('fillPercentUpdate').innerHTML = data.fill_percent
        document.getElementById('pHUpdate').innerHTML = data.pH
        document.getElementById('tempUpdate').innerHTML = data.temperature
        document.getElementById('pressureUpdate').innerHTML = data.pressure
    }

    // stats warning
    statsWarning(data){
        if(data.fill_percent >= 60){
            //fill percent warning
        }

        if(data.temperature >= 65){
            //temp warning
        }

        if(data.pressure >= 185){
            // pressure warning
        }
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
            validObject.temperature = data.final_temp
        }else{
            validObject.temperature_pass = "fail"
            validObject.temperature = data.final_temp
        }
        //Fill % Check
        if(data.fill_percent < 72){
            validObject.fill_percent_pass = "pass"
            validObject.final_fill_level = data.fill_percent
        }else{
            validObject.fill_percent_pass = "fail"
            validObject.final_fill_level = data.fill_percent
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
        console.log(data)
        console.log(validation)
        console.log(timeSet)
        //If vesselValidate passsed
        //Statistics: Fill level reached, temp range(lowest, highest, avg), pH range(lowest, highest, avg), pressure range(lowest,highest, avg), total time
        //Takes in data, calculates total time, then shows and updates final UI
        let newRow = document.getElementById('batchRecordsTable').insertRow()
        let validCell = newRow.insertCell(0)
        let validCellText = document.createTextNode(validation.valid)
        validCell.append(validCellText)

        let fillCell = newRow.insertCell(1)
        let fillCellText = document.createTextNode(validation.final_fill_level + " %")
        fillCell.append(fillCellText)

        let phLowCell = newRow.insertCell(2)
        let phLowCellText = document.createTextNode(data.ph_low)
        phLowCell.append(phLowCellText)

        let phHighCell = newRow.insertCell(3)
        let phHighCellText = document.createTextNode(data.ph_high)
        phHighCell.append(phHighCellText)

        let phAvgCell = newRow.insertCell(4)
        let phAvg = (data.ph_high + data.ph_low)/2
        let phAvgCellText = document.createTextNode(phAvg)
        phAvgCell.append(phAvgCellText)

        let tempLowCell = newRow.insertCell(5)
        let tempLowCellText = document.createTextNode(data.temp_low + " C")
        tempLowCell.append(tempLowCellText)

        let tempHighCell = newRow.insertCell(6)
        let tempHighCellText = document.createTextNode(data.temp_high + " C")
        tempHighCell.append(tempHighCellText)

        let tempAvgCell = newRow.insertCell(7)
        let tempAvg = (data.temp_high + data.temp_low)/2
        let tempAvgCellText = document.createTextNode(tempAvg + " C")
        tempAvgCell.append(tempAvgCellText)

        let pressureLowCell = newRow.insertCell(8)
        let pressureLowCellText = document.createTextNode(data.pressure_low + " kPa")
        pressureLowCell.append(pressureLowCellText)

        let presureHighCell = newRow.insertCell(9)
        let presureHighCellText = document.createTextNode(data.pressure_high + " kPa")
        presureHighCell.append(presureHighCellText)

        let pressureAvgCell = newRow.insertCell(10)
        let pressureAvg = (data.pressure_high + data.pressure_low)/2
        let pressureAvgCellText = document.createTextNode(pressureAvg + " kPa")
        pressureAvgCell.append(pressureAvgCellText)

        let timeCell = newRow.insertCell(11)
        let elapsedTime = Math.abs(timeSet.start_time - timeSet.end_time);
        let timeCellText = document.createTextNode(elapsedTime + " ms")
        timeCell.append(timeCellText)


        document.getElementById('vesselStatisticsTable').style.display = 'none'
        document.getElementById('inputValveControl').style.display = 'none'
        document.getElementById('outputValveControl').style.display = 'none'
        document.getElementById('batchRecordsTable').style.display = 'block'
        document.getElementById('nextVessel').style.display = 'block'
    }

}

export default Vessel;