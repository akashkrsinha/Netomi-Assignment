var select = document.getElementById('countries')


const countryDrop = document.querySelector('#countries');
const stateEle = document.querySelector('#states');
let outputCountry = "<option></option>";



fetch('https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json').then(
    res=>{
        return res.json();
    }).then(data=>{
        data.forEach(country=>{
            outputCountry += `<option value="${country.name}">${country.name}</option>`;
        })

        countryDrop.innerHTML = outputCountry;
    }).catch(error=>{
        console.log(error);
    })


countryDrop.addEventListener("change", ()=>{
    stateEle.style.display = "block";
})


function fillState(s1, s2)
{
    var s1 = document.getElementById(s1);
    var s2 =document.getElementById(s2);
    const stateDrop = document.querySelector('#states');


    s2.innerHTML = "";

    fetch('https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json').then(
        res=>{
            return res.json();
        }).then(data=>{
            let outputState = "";

            data.forEach(country=>{

                if(country.name == s1.value)
                {
                    country.states.forEach(stateArr=>{
                        outputState+= `<option value="${stateArr.name}">${stateArr.name}</option>`;
                    })
                }
                
            })
            stateDrop.innerHTML = outputState;

        }).catch(error=>{
            console.log(error);
        })
}


function seterror(error, field){
    var messageDiv = document.getElementById('message')

    messageDiv.innerHTML= `Result: {${field} : {"error" : ${error}}}`;
    console.log(messageDiv);

}


function successFnc(){
         var messageDiv = document.getElementById('message')

         messageDiv.innerHTML='Result: {"Success" : "All fields are valid"}';
}


function validateForm(){
    var returnval = true


    var name = document.forms["form"]["name"].value;

    if(name.length<4 || name.length>10)
    {
        seterror("Length should be between 4-10 characters", "Name")
        returnval = false
    }

    var number = document.forms["form"]["number"].value;

    if(number.length != 10)
    {
        seterror("mobile number should be of 10 digits", "Contact Number" )
        returnval = false
    }

    if(returnval)
    {
        successFnc();
        returnval = false
    }
    return returnval
}