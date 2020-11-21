
let recipes;
let recipe;

function readMenuFromFirebase() {
    return firebase.database().ref('recipes').once('value').then(function(snapshot) {
        recipes = snapshot;

        snapshot.forEach(function(childSnapshot) {
            recipe = childSnapshot.val();
            visualiseRecipeLink(document.querySelector("#recipes"), recipe.naam, recipe.id);
        });
        
    });
}

function readRecipeFromFirebase() {
    return firebase.database().ref('recipes').once('value').then(function(snapshot) {
        recipes = snapshot;

        const urlParams = new URLSearchParams(window.location.search);
        let recipeId = urlParams.get('select');

        snapshot.forEach(function(childSnapshot) {
            recipe = childSnapshot.val();
            if (recipeId == null || recipeId == recipe.id) {
                document.querySelector("#recipeName").innerHTML = childSnapshot.val().naam;
                visualiseIngredients(document.querySelector("#ingredients"), childSnapshot.val());
                visualiseProcess(document.querySelector("#brewingProcess"), childSnapshot.val());
                visualiseSteps(document.querySelector("#steps"), createBrewingStepsJSON(childSnapshot.val()));
                return true;
            }
        });
        
    });
}

function readRecipeToFormFromFirebase() {
    return firebase.database().ref('recipes').once('value').then(function(snapshot) {
        recipes = snapshot;

        const urlParams = new URLSearchParams(window.location.search);
        let recipename = urlParams.get('select');

        let valueFound = snapshot.forEach(function(childSnapshot) {
            recipe = childSnapshot.val();
            if (recipename == recipe.naam) {
                fillForm(recipe);
                return true;
            }
        });

        if (valueFound === false) {
            fillForm();
        }
        
    });
}


function saveToFirebase(JSONrecipe) {
    /*let JSONrecipes = [
        {
            "naam": "Tripel Pils Nottingham",
            "water": 15,
            "spoelwater": 10,
            "koeltemp": 22,
            "mout": [
                {
                    "naam": "Pilsmout",
                    "hoeveelheid": 5000
                }
            ],
            "gist": "Danstar Nottingham",
            "maischschema": [
                {
                    "temp": 62,
                    "tijd": 30
                },
                {
                    "temp": 72,
                    "tijd": 60
                },
                {
                    "temp": 78,
                    "tijd": 5
                }
            ],
            "kookschema": [
                {
                    "tijd": 60,
                    "toevoegen": [
                        {
                            "naam": "Nothern Brewer",
                            "hoeveelheid": 20,
                            "eenheid": "gram",
                            "type": "hop"
                        }
                    ]
                },
                {
                    "tijd": 15,
                    "toevoegen": [
                        {
                            "naam": "Saaz",
                            "hoeveelheid": 20,
                            "eenheid": "gram",
                            "type": "hop"
                        }
                    ]
                },
                {
                    "tijd": 10,
                    "toevoegen": [
                        {
                            "naam": "Suiker",
                            "hoeveelheid": 250,
                            "eenheid": "gram",
                            "type": "suiker"
                        }
                    ]
                }
            ]
        },
        {
            "naam": "Weizen Pils-Tarwe Weihenstephan",
            "water": 15,
            "spoelwater": 10,
            "koeltemp": 22,
            "mout": [
                {
                    "naam": "Pilsmout",
                    "hoeveelheid": 2000
                },
                {
                    "naam": "Tarwemout",
                    "hoeveelheid": 2500
                }
            ],
            "gist": "Wyeast 3068 Weihenstephan Weizen",
            "maischschema": [
                {
                    "temp": 40,
                    "tijd": 20
                },
                {
                    "temp": 50,
                    "tijd": 15
                },
                {
                    "temp": 62,
                    "tijd": 30
                },
                {
                    "temp": 72,
                    "tijd": 30
                },
                {
                    "temp": 78,
                    "tijd": 5
                }
            ],
            "kookschema": [
                {
                    "tijd": 60,
                    "toevoegen": [
                        {
                            "naam": "Hallertau Perle",
                            "hoeveelheid": 20,
                            "eenheid": "gram",
                            "type": "hop"
                        }
                    ]
                }
            ]
        }
    ];*/

    /*for (let i = 0; i < JSONrecipes.length; ++i) {
        let JSONrecipe = JSONrecipes[i];*/

        firebase.database().ref('recipes').child(JSONrecipe.naam).set(JSONrecipe)
            .then(function(snapshot) {
                //success(); // some success method
            }, function(error) {
                console.log('error' + error);
                //error(); // some error method
            });
    //}
}