function visualiseSteps(parentel, steps) {

    for (let i = 0; i < steps.length; ++i) {
        let prev = i === 0 ? "" : `step${i-1}`;

        let el = `
            <section id="step${i}" class="step">
                <a href="#${prev}" class="material-icons step-btn-back">expand_less</a>
                <div class="step-content" style="background-image: url('./images/svg/${steps[i].afbeelding}.svg');">
                    <h2>STAP ${i+1}</h2>
                    <p>${steps[i].stap}</p>
                </div>
                <a href="#step${i+1}" class="material-icons step-btn-next">expand_more</a>
            </section>
        `;
        parentel.innerHTML += el;
    }

}

function visualiseRecipeLink(parentel, recipename) {
        let el = `
            <li>
                <a href="?select=${recipename}">${recipename}</a>
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
            "stap": `Gist toevoegen aan het gistvat en gistvat afsluiten`,
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