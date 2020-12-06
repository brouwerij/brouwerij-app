function visualiseSteps(parentel, steps) {

    for (let i = 0; i < steps.length; ++i) {
        let prev = i === 0 ? "overzicht" : `step${i-1}`;

        let el = `
            <section id="step${i}" class="step" style="background-image: url('./images/svg/${steps[i].afbeelding}.svg');">
                <a href="#${prev}" class="material-icons step-btn-back">expand_less</a>
                <div class="step-content">
                    <h2>STAP ${i+1}</h2>
                    <p>${steps[i].stap}</p>
                </div>
                <a href="#step${i+1}" class="material-icons step-btn-next">expand_more</a>
            </section>
        `;
        parentel.innerHTML += el;
    }
}

function visualiseIngredients(parentel, recipe) {
    // mout
    let moutEl = `
    <h3>Mout</h3>
    <ul>
    `;
    for (let i = 0; i < recipe.mout.length; ++i) {
        moutEl += `
            <li>
                ${recipe.mout[i].naam}, ${recipe.mout[i].hoeveelheid} gram
            </li>
        `;
    }
    moutEl += `</ul>`;
    parentel.innerHTML += moutEl;

    // gist
    let gistEl = `
    <h3>Gist</h3>
    <ul>`;
    gistEl += `
        <li>
            ${recipe.gist}
        </li>
    `;
    gistEl += `</ul>`;
    parentel.innerHTML += gistEl;

    // hop en andere ingredienten
    let hopEl = `
    <h3>Hop en andere ingredienten</h3>
    <ul>`;
    for (let i = 0; i < recipe.kookschema.length; ++i) {
        for (let j = 0; j < recipe.kookschema[i].toevoegen.length; ++j) {
            hopEl += `
                <li>
                    ${recipe.kookschema[i].toevoegen[j].naam}, ${recipe.kookschema[i].toevoegen[j].hoeveelheid} ${recipe.kookschema[i].toevoegen[j].eenheid}
                </li>
            `;
        }
    }
    hopEl += `</ul>`;
    parentel.innerHTML += hopEl;

    // water
    // spoelwater
}

function visualiseProcess(parentel, recipe) {
    // maisch schema
    
    // hop en andere ingredienten
    let maischEl = `
    <h3>Maisch Schema</h3>
    <ol>`;
    for (let i = 0; i < recipe.maischschema.length; ++i) {
        maischEl += `
            <li>
            ${recipe.maischschema[i].temp}°C, ${recipe.maischschema[i].tijd} min
            </li>
        `;
    }
    maischEl += `</ol>`;
    parentel.innerHTML += maischEl;
    
    // hop en andere ingredienten
    let kookEl = `
    <h3>Kook Schema</h3>
    <ol>`;
    for (let i = 0; i < recipe.kookschema.length; ++i) {
        let kookStepEl = `
        <li>
            ${recipe.kookschema[i].tijd} min koken met:
            <ul>`;
        for (let j = 0; j < recipe.kookschema[i].toevoegen.length; ++j) {
            kookStepEl += `
                <li>
                    ${recipe.kookschema[i].toevoegen[j].naam}, ${recipe.kookschema[i].toevoegen[j].hoeveelheid} ${recipe.kookschema[i].toevoegen[j].eenheid}
                </li>
            `;
        }
        kookStepEl += `</ul>`;
        kookEl += kookStepEl;
    }
    kookEl += `</ol>`;
    parentel.innerHTML += kookEl;
}

function fillForm(JSONrecipe) {
    let form = document.querySelector("form#editRecipe");
    if (form == null) {
        return;
    }

    document.querySelector("form#editRecipe").jsonForm({
        "schema": {
            "naam": {
                "type": "string"
            },
            "id": {
                "type": "hidden"
            },
            "water": {
                "type": "integer",
                "placeholder": "liter"
            },
            "spoelwater": {
                "type": "integer",
                "placeholder": "liter"
            },
            "koeltemp": {
                "type": "integer",
                "placeholder": "° Celcius"
            },
            "mout": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "naam": {
                            "type": "string",
                            "title": "naam"
                        },
                        "hoeveelheid": {
                            "type": "integer",
                            "title": "hoeveelheid"
                        }
                    }
                }
            },
            "gist": {
                "type": "string"
            },
            "maischschema": {
                "type": "array",
                "htmlClass": "brewsection",
                "items": {
                    "type": "object",
                    "properties": {
                        "temp": {
                            "type": "integer",
                            "title": "temperatuur",
                            "placeholder": "° Celcius"
                        },
                        "tijd": {
                            "type": "integer",
                            "title": "tijd",
                            "placeholder": "minuten"
                        }
                    }
                }
            },
            "kookschema": {
                "type": "array",
                "htmlClass": "brewsection",
                "items": {
                    "type": "object",
                    "properties": {
                        "tijd": {
                            "type": "integer",
                            "title": "tijd"
                        },
                        "toevoegen": {
                            "type": "array",
                            "title": "ingredienten",
                            "htmlClass": "brewsection",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "naam": {
                                        "type": "string",
                                        "title": "naam"
                                    },
                                    "hoeveelheid": {
                                        "type": "integer",
                                        "title": "hoeveelheid",
                                        "placeholder": 0
                                    },
                                    "eenheid": {
                                        "type": "string",
                                        "title": "eenheid",
                                        "placeholder": "bv. gram"
                                    },
                                    "type": {
                                        "type": "string",
                                        "title": "type",
                                        "placeholder": "bv. hop, suiker, andere, ..."
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "value": JSONrecipe,
        onSubmit: function (errors, values) {
        if (errors) {
        }
        else {
            if (values.id === '') {
                values.id = Date.now();
            }
            console.log(values);
            saveToFirebase(values);
        }
        }
    });
}

function visualiseRecipeLink(parentel, recipename, recipeId) {
        let el = `
            <li>
                <a href="index.html?select=${recipeId}#overzicht">${recipename}</a>
            </li>
        `;
        parentel.innerHTML += el;
}

function visualiseAdminRecipeLink(parentel, recipename, recipeId) {
        let el = `
            <li>
                <a href="admin.html?select=${recipeId}#overzicht">${recipename}</a>
            </li>
        `;
        parentel.innerHTML += el;
}

function createBrewingStepsJSON(recipe) {
    let voorbereidenMaisch = [
        {
            "stap": `Gistvat desinfecteren en koeler desinfecteren`,
            "afbeelding": "gistvat-koeler"
        },
        {
            "stap": `Mout schroten`,
            "afbeelding": "schrootmolen"
        },
        {
            "stap": `Waterketel vullen met ${recipe.water + recipe.spoelwater}L water`,
            "afbeelding": "waterketel-vullen"
        },
        {
            "stap": `${recipe.water}L water uit waterketel overbrengen naar maischketel`,
            "afbeelding": "waterketel-naar-maischketel"
        },
        {
            "stap": `Branders van waterketel en maischketel aanzetten`,
            "afbeelding": "branders-waterketel-maischketel"
        },
        {
            "stap": `Water in waterketel verwarmen tot 80 graden`,
            "afbeelding": "waterketel-opwarmen"
        },
        {
            "stap": `Water maischketel verwarmen tot ${recipe.maischschema[0].temp + 2} graden`,
            "afbeelding": "maischketel-opwarmen"
        },
        {
            "stap": `Brander maischketel uitzetten`,
            "afbeelding": "brander-maischketel-uitzetten"
        },
        {
            "stap": `Geschrote mout toevoegen aan maischketel en roeren`,
            "afbeelding": "mout-naar-maischketel"
        }
    ];

    let maischen = [];
    for (let i = 0; i < recipe.maischschema.length; ++i) {
        maischen.push(
            {
                "stap": `Maisch ${recipe.maischschema[i].tijd} minuten op ${recipe.maischschema[i].temp} graden houden`,
                "afbeelding": "maischketel-warmhouden"
            }
        );
        if (i+1 < recipe.maischschema.length) {
            maischen.push(
                {
                    "stap": `Maisch verwarmen tot ${recipe.maischschema[i+1].temp} graden`,
                    "afbeelding": "maischketel-opwarmen"
                }
            );
        }
    }

    let voorbereidenKoken = [
        {
            "stap": `Maischketel 1 liter aftappen in maatbeker`,
            "afbeelding": "maischketel-naar-maatbeker"
        },
        {
            "stap": `Troebel? Voorzichtig terug in maischketel gieten en herhaal`,
            "afbeelding": "wort-naar-maischketel"
        },
        {
            "stap": `Niet troebel? Brander kookketel aanzetten en maisch Voorzichtig in kookketel laten lopen. Het bostel mag niet droog komen te staan!`,
            "afbeelding": "maischketel-naar-kookketel"
        },
        {
            "stap": `Water in maischketel is gezakt tot vlak boven graanresten (bostel)? Voeg voorzichtig spoelwater toe in stappen van 5 liter. Herhaal tot spoelwater op is of ketel vol is`,
            "afbeelding": "spoelwater-toevoegen"
        },
        {
            "stap": `Laat maischketel helemaal leeglopen tot de wort troebel is, draai dan de kraan toe`,
            "afbeelding": "maischketel-naar-kookketel"
        }
    ];

    let koken = [];
    for (let i = 0; i < recipe.kookschema.length; ++i) {
        let ingredienten = [];
        for (let j = 0; j < recipe.kookschema[i].toevoegen.length; ++j) {
            ingredienten.push(`${recipe.kookschema[i].toevoegen[0].hoeveelheid} ${recipe.kookschema[i].toevoegen[0].eenheid} ${recipe.kookschema[i].toevoegen[0].naam}`);
        }
        
        koken.push(
            {
                "stap": `${ingredienten.join(', ')} toevoegen aan kookketel`,
                "afbeelding": "toevoegen-aan-kookketel"
            }
        );

        koken.push(
            {
                "stap": `Wort in de kookketel laten koken (max 102 graden) gedurende ${recipe.kookschema[i].tijd} minuten`,
                "afbeelding": "kookketel-koken"
            }
        );
    }

    let afwerken = [
        {
            "stap": `Koeler in kookketel plaatsen en mee laten koken`,
            "afbeelding": "koeler-in-kookketel"
        },
        {
            "stap": `Wort in de kookketel laten koken (max 102 graden) gedurende 10 minuten`,
            "afbeelding": "kookketel-koken"
        },
        {
            "stap": `Brander kookketel uitzetten`,
            "afbeelding": "brander-kookketel-uitzetten"
        },
        {
            "stap": `Koeler aansluiten en 5 minuten wachten`,
            "afbeelding": "koeler-aansluiten"
        },
        {
            "stap": `Wort afkoelen tot [22] graden`,
            "afbeelding": "wort-koelen"
        },
        {
            "stap": `Wort voorzichtig in gistvat laten lopen`,
            "afbeelding": "kookketel-naar-gistvat"
        },
        {
            "stap": `Gist toevoegen aan het gistvat en gistvat afsluiten met een waterslot`,
            "afbeelding": "gistvat-gist-toevoegen"
        },
        {
            "stap": `Schoonmaken`,
            "afbeelding": "brouwproces-2"
        }
    ];

    let stappen = voorbereidenMaisch.concat(maischen, voorbereidenKoken, koken, afwerken);
    return stappen;
}