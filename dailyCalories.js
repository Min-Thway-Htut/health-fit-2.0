let button = document.getElementById('btn');

button.addEventListener('click', () => {
    const height = parseInt(document.getElementById('height').value);
    const weight = parseInt(document.getElementById('weight').value);
    const age = parseInt(document.getElementById('age').value);
    const result = document.getElementById('output');
    let height_status=false, weight_status=false, age_status=false;

    if(height === '' || isNaN(height) || (height <= 0)){
        document.getElementById('height_error').innerHTML = 'Please provide a valid height';
    }else{
        document.getElementById('height_error').innerHTML = '';
        height_status=true;
    }

    if(weight === '' || isNaN(weight) || (weight <= 0)){
        document.getElementById('weight_error').innerHTML = 'Please provide a valid weight';
    }else{
        document.getElementById('weight_error').innerHTML = '';
        weight_status=true;
    }

    if(age === '' || isNaN(age) || (age <= 0)){
        document.getElementById('age_error').innerHTML = 'Please provide a valid age';
    }else{
        document.getElementById('age_error').innerHTML = '';
        age_status=true;
    }

    if(height_status && weight_status && age_status){
        const dailyCalories = 66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age).toFixed(0);
        result.innerHTML = "You require " + dailyCalories + " per day.";}
    });