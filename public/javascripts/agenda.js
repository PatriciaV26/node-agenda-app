var allPersons = [];

fetch('data/persons.json').then(function (r) {
    return r.json();
}).then(function (persons) {
    allPersons = persons;
    display(persons);
})

function display(persons) {
    var list = persons.map(function (a) {
        return `<tr><td>${a.firstName}</td><td>${a.lastName}</td><td>${a.phone}</td><td></td></tr>`;
    });
    document.querySelector('#agenda tbody').innerHTML = list.join("");
    
}

function savePerson(){
    var firstName = document.querySelector('[name=firstName]').value; //getting the value out of the input
    var lastName = document.querySelector('[name=lastName]').value; 
    var phone = document.querySelector('[name=phone]').value; 
    
    submitNewPerson(firstName, lastName, phone);
}

function submitNewPerson(firstName, lastName, phone) {
    
    var body = null;
    fetch('data/add.json', {
        method: 'GET', //can't send info directly with get
        body: body
        //body: JSON.stringify({
            //firstName: firstName,
            //lastName: lastName,
            //phone: phone
        //})
    }).then(function(r){
        return r.json();
    }).then(function(status){
        if(status.success){
            inlineAddPerson(firstName, lastName, phone);
        } else {
            console.warn('not saved', status);
        }
    });
}

function inlineAddPerson(firstName, lastName, phone) {
    allPersons.push({
        firstName: firstName,
        lastName: lastName,
        phone: phone
    });
    display(allPersons);
}