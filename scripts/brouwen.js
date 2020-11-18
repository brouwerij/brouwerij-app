function visualiseSteps(parentel, steps) {

    for (let i = 0; i < steps.length; ++i) {
        let el = `
            <section id="step${i}" class="step">
                <a href="#step${i-1}" class="material-icons step-btn-back">expand_less</a>
                <div class="step-content">
                    <h1>STAP ${i+1}</h1>
                    <p>${steps[i].stap}</p>
                </div>
                <a href="#step${i+1}" class="material-icons step-btn-next">expand_more</a>
            </section>
        `;
        parentel.innerHTML += el;
    }

}

function createBrewingStepsJSON(recipe) {
    let voorbereidenMaisch = [
        {
            "stap": `Gistvat desinfecteren en koeler desinfecteren`
        },
        {
            "stap": `Mout schroten`
        },
        {
            "stap": `Waterketel vullen met ${recipe.water + recipe.spoelwater}L water`
        },
        {
            "stap": `${recipe.water}L water uit waterketel overbrengen naar maischketel`
        },
        {
            "stap": `Branders van waterketel en maischketel aanzetten`
        },
        {
            "stap": `Water in waterketel verwarmen tot 80 graden`
        },
        {
            "stap": `Water maischketel verwarmen tot ${recipe.maischschema[0].temp + 2} graden`
        },
        {
            "stap": `Brander maischketel uitzetten`
        },
        {
            "stap": `Geschrote mout toevoegen aan maischketel en roeren`
        }
    ];

    let maischen = [];
    for (let i = 0; i < recipe.maischschema.length; ++i) {
        maischen.push(
            {
                "stap": `Maisch ${recipe.maischschema[i].tijd} minuten op ${recipe.maischschema[i].temp} graden houden`
            }
        );
        if (i+1 < recipe.maischschema.length) {
            maischen.push(
                {
                    "stap": `Maisch verwarmen tot ${recipe.maischschema[i+1].temp} graden`
                }
            );
        }
    }

    let voorbereidenKoken = [
        {
            "stap": `Maischketel 1 liter aftappen in maatbeker`
        },
        {
            "stap": `Troebel? Voorzichtig terug in maischketel gieten en herhaal`
        },
        {
            "stap": `Niet troebel? Brander kookketel aanzetten en maisch Voorzichtig in kookketel laten lopen. Het bostel mag niet droog komen te staan!`
        },
        {
            "stap": `Water in maischketel is gezakt tot vlak boven graanresten (bostel)? Voeg voorzichtig spoelwater toe in stappen van 5 liter. Herhaal tot spoelwater op is of ketel vol is`
        },
        {
            "stap": `Laat maischketel helemaal leeglopen tot de wort troebel is, draai dan de kraan toe`
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
                "stap": `${ingredienten.join(', ')} toevoegen aan kookketel`
            }
        );

        koken.push(
            {
                "stap": `Wort in de kookketel laten koken (max 102 graden) gedurende ${recipe.kookschema[i].tijd} minuten`
            }
        );
    }

    let afwerken = [
        {
            "stap": `Koeler in kookketel plaatsen en mee laten koken`
        },
        {
            "stap": `Wort in de kookketel laten koken (max 102 graden) gedurende 10 minuten`
        },
        {
            "stap": `Brander kookketel uitzetten`
        },
        {
            "stap": `Koeler aansluiten en 5 minuten wachten`
        },
        {
            "stap": `Wort afkoelen tot [22] graden`
        },
        {
            "stap": `Wort voorzichtig in gistvat laten lopen`
        },
        {
            "stap": `Gist toevoegen aan het gistvat en gistvat afsluiten`
        },
        {
            "stap": `Schoonmaken`
        }
    ];

    let stappen = voorbereidenMaisch.concat(maischen, voorbereidenKoken, koken, afwerken);
    return stappen;
}