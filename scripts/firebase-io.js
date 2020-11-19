
let recipes;
let recipe;

function readFromFirebase() {
    return firebase.database().ref('recipes').once('value').then(function(snapshot) {
        recipes = snapshot;

        const urlParams = new URLSearchParams(window.location.search);
        let recipename = urlParams.get('select');

        snapshot.forEach(function(childSnapshot) {
            recipe = childSnapshot.val();
            visualiseRecipeLink(document.querySelector("#recipes"), recipe.naam);
        });

        snapshot.forEach(function(childSnapshot) {
            recipe = childSnapshot.val();
            if (recipename == null || recipename == recipe.naam) {
                visualiseSteps(document.querySelector("#steps"), createBrewingStepsJSON(childSnapshot.val()));
                return true;
            }
        });
        
    });
}


function saveToFirebase() {
    var recipe = {
        naam: "Tripel Pils Nottingham",
        water: 15,
        spoelwater: 10,
        koeltemp: 22,
        mout: [
            {
                naam: "Pilsmout",
                hoeveelheid: 5000
            }
        ],
        gist: "Danstar Nottingham",
        maischschema: [
            {
                temp: 62,
                tijd: 30
            },
            {
                temp: 72,
                tijd: 60
            },
            {
                temp: 78,
                tijd: 5
            }
        ],
        kookschema: [
            {
                tijd: 60,
                toevoegen: [
                    {
                        naam: "Nothern Brewer hop",
                        hoeveelheid: 20,
                        eenheid: "gram"
                    }
                ]
            },
            {
                tijd: 15,
                toevoegen: [
                    {
                        naam: "Saaz hop",
                        hoeveelheid: 20,
                        eenheid: "gram"
                    }
                ]
            },
            {
                tijd: 10,
                toevoegen: [
                    {
                        naam: "Nothern Brewer",
                        hoeveelheid: 20,
                        eenheid: "gram"
                    }
                ]
            }
        ]
    };

    firebase.database().ref('recipes').child(recipe.naam).set(recipe)
        .then(function(snapshot) {
            //success(); // some success method
        }, function(error) {
            console.log('error' + error);
            //error(); // some error method
        });
    
    var recipe = {
        naam: "Weizen Pils-Tarwe Weihenstephan",
        water: 15,
        spoelwater: 10,
        koeltemp: 22,
        mout: [
            {
                naam: "Pilsmout",
                hoeveelheid: 2000
            },
            {
                naam: "Tarwemout",
                hoeveelheid: 2500
            }
        ],
        gist: "Wyeast 3068 Weihenstephan Weizen",
        maischschema: [
            {
                temp: 40,
                tijd: 20
            },
            {
                temp: 50,
                tijd: 15
            },
            {
                temp: 62,
                tijd: 30
            },
            {
                temp: 72,
                tijd: 30
            },
            {
                temp: 78,
                tijd: 5
            }
        ],
        kookschema: [
            {
                tijd: 60,
                toevoegen: [
                    {
                        naam: "Hallertau Perle",
                        hoeveelheid: 20,
                        eenheid: "gram"
                    }
                ]
            }
        ]
    };

    firebase.database().ref('recipes').child(recipe.naam).set(recipe)
        .then(function(snapshot) {
            //success(); // some success method
        }, function(error) {
            console.log('error' + error);
            //error(); // some error method
        });
}