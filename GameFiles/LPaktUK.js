////////////////////////////////////// TEST LINES ////////////////////////////////////// yes

onload = () =>
{
    console.log("start")

    playerCharacter = new PlayerCharacter(localStorage.getItem("character"), 0);
    console.log(playerCharacter)
    playerCharacter.attack()

    // if (summoners.length)
    //     console.log("jest");
    // else
    //     console.log("ema");

    // playerSummoners = []
    // enemySummoners = []

    // if (summoners.length)
    //     console.log("jest");
    // else
    //     console.log("ema");

    let ile = 25
    while (ile--)
    {
        //czekam na testy
    }
}

/////////////////////////////////////// CLASS-Y ///////////////////////////////////////

class Fighter
{
    constructor(characterBaseHp, characterBaseAd, characterBaseArmor, level)
    {
        this.baseHp = characterBaseHp
        this.maxHp = (this.baseHp * 0.05) * level + this.baseHp
        this.hp = this.maxHp

        this.baseAd = characterBaseAd
        this.maxAd = this.baseAd
        this.Ad = this.maxAd

        this.level = level
        this.exp = 0
        this.neededExp = Math.floor(50 * this.level * 0.25 + 100)
        //lvl 0 -> 100 | level 1 -> 112 | level 5 -> 162 | level 10 -> 225

        this.baseArmor = characterBaseArmor
        this.armor = this.baseArmor
    }

    //#region attack & his components

    attack()
    {
        //TODO:
        console.log("yeyey");
    }
    #effectStun()
    {
        //TODO:
    }
    #effectBleed()
    {
        //TODO:
    }
    #effectWeak()
    {
        //TODO:
    }
    #effectWarShout()            //okrzyk bojowy
    {
        //TODO:
    }
    #effectHardSkin()
    {
        //TODO:
    }
    #effectIncreaseAttacks()     //zwiększanie sobie obrażeń
    {
        //TODO:
    }
    #effectCrit()
    {
        //TODO:
    }
    #effectDodged()
    {
        //TODO:
    }
    #effectBerserk() 
    {
        //TODO:
    }
    #eat()
    {
        //TODO:
    }
    #reloadGun()
    {
        //TODO:
    }
    #theftItem()
    {
        //TODO:
    }
    #buffStatsOverTime()
    {
        //TODO:
    }
    #ram()
    {
        //TODO:
    }
    #summon(summonedCharacter)
    {
        //TODO:
    }
    //TODO: dodaj sternicką co będzie dawała efekt tygodnia

    //#endregion
}

class PlayerCharacter extends Fighter
{
    constructor(character, lvl)
    {
        switch (character)
        {
            case "Sagan":
                super(1000, 100, 5, lvl)
                this.theft = true
                this.theftCooldown = 5
                break;
            case "Czupryńska":
                super(750, 75, 15, lvl)
                this.berserker = true
                this.berserkerActivateChance = 0.5   // że 50%
                this.randomCrit = true
                this.randomCritChance = 0.25         // że 25%
                break;
            case "Bejrowicz":
                super(750, 50, 20, lvl)
                this.summoner = true
                this.summoners = ["Ekonimistka"]
                break;
            case "Dolega":
                super(900, 75, 5, lvl)
                this.warShout = true
                this.warShoutCooldown = 3
                break;
            case "Krystian":
                super(800, 90, 10, lvl)
                this.ram = true
                this.ramCooldown = 4
                this.bleedStacks = 0
                this.bleedStackAD = 5
                this.eat = true
                this.eatCooldown = 10
                this.food = ["Pizzerka"]
                break;
            case "Szkolny laptop":
                super(600, 0, 0, lvl)
                this.debuffer = true
                this.addDebuffs = ["wkurw"] // FIXME: we coś jeszcze dodaj
                this.summoner = true
                this.summoners = ["Rozjuszony programista"]
                break;
        }

        this.character = character

        this.SFX = new createSFX(character)

        // no i będą odwołania w stylu
        // playerCharacter.SFX.win()
    }
    showGear()
    {
        //TODO:
    }
    wearItem()
    {
        //TODO:
    }
}

class EnemyCharacter extends Fighter
{
    constructor(character, level)
    {
        //TODO:
        switch (character)
        {
            case "Szymon Asasyn":
                super(550, 125, 5, level)
                this.stun = true
                this.stunCooldown = 0
                this.stunChance = 0.10
                break;
            case "Szymon Artysta":
                super(500, 60, 0, level)
                this.buffStatsOverTime = true
                this.buffStatsOverTimeAd = 8
                this.buffStatsOverTimeHp = 20
                this.buffStatsOverTimeArmor = 3
                this.evolutionStage = 0
                this.evolutionNeedTurns = 5
                this.evolutionMutagens = ["bleed", "crit"]
                break;
            case "Szymon Hitman":
                super(1000, 1000, 1000, level) //FIXME:
                this.theft = true
                break;
            case "Szymon Oiginal":
                super(1000, 1000, 1000, level) //FIXME:
                this.theft = true
                break;
        }

        this.character = character
    }
}

class SummonersCharacter extends Fighter
{
    constructor(summonedCharacter)
    {
        switch (summonedCharacter)
        {
            case "Ekonimistka":
                super(250, 0, 0, 0)
                break;
            case "Rozjuszony programista":
                super(250, 30, 0, 0)
                break;
        }
    }
}

//#region Items & Equipment

class Item
{
    constructor(character)
    {
        //TODO:
    }
}

class Equipment
{
    constructor()
    {
        this.equipment = []
    }
    showEquipment()
    {
        //TODO:
    }
}

//#endregion

//#region sound

class createSFX
{
    constructor(character)
    {
        switch (character)
        {
            case "Sagan":
                // np   this.win = "src do pliku dzwiękowego z dzwiękiem zwycięstwa"
                break
        }
    }

    win()
    {
        // podmienia src i uruchamia audio
    }

}

//#endregion

/////////////////////////////////////// ZMIENNE ///////////////////////////////////////

//#region obiekty postaci

let
    playerCharacter,
    enemyCharacter,
    playerSummoners = ["maslo"]
enemySummoners = ["sraka"]

//#endregion

//#region extra player parametrs

let
    money = 0,
    buffs = {},
    debuffs = {}

//#endregion

//#region variables in fight

let
    turn = 1;

//#endregion

//#region static variables

const enemyList = ["Szymon Asasyn", "Szymon Artysta", "Szymon Hitman"]

//#endregion

//#region other

let
    enemyAlive = true,
    stage = 1

//#endregion

/////////////////////////////////////// FUNKCJE ///////////////////////////////////////

//#region to choose character

function chooseCharacter(character)
{
    goToGameButton.innerHTML = "Rozpocznij grę"
    goToGameButton.href = "/GameFiles/LPaktUKgameCard.html"
    goToGame.style.background = "linear-gradient(to left bottom, rgb(255, 60, 60) 0%, rgb(255, 208, 0) 100%)"

    localStorage.setItem("character", character.value);

    console.log(playerCharacter)
}

function openDialog(character)
{
    let dialog = document.getElementById("characterSpecificationDialog")
    let characterName = document.getElementById("characterName")
    let characterStats = document.getElementById("characterStats")
    let characterSpecification = document.getElementById("characterSpecification")

    let manekin = new PlayerCharacter(character.title, 0)

    console.log(manekin);

    characterName.innerHTML = manekin.character
    characterStats.innerHTML = ` hp - ${manekin.hp}<br> ad - ${manekin.Ad}<br> armor - ${manekin.armor}`

    switch (character.title)
    {
        case "Sagan":
            console.log("yes sanaga");
            characterSpecification.innerHTML = `Jest to posatać potrafiąca "pożyczać przedmioty bez pozwolenia", może to wykonywać co ${manekin.theftCooldown} tur`
            break
        case "Czupryńska":
            console.log("log yes czupa");
            characterSpecification.innerHTML = `Jest to postać która przez tureta posiada ${manekin.berserkerActivateChance * 100}% na wykonanie kolejnego ataku oraz ${manekin.randomCritChance * 100}% na wykonanie ciosu krytycznego`
            break
        case "Bejrowicz":
            characterSpecification.innerHTML = `Jest to postać która przywoływuje "${manekin.summoners}", za każdą żyjącą przywołaną postać dostaje buffy do statystyk bazowych`
            break
        case "Dolega":
            characterSpecification.innerHTML = `Jest to postać która posiada krzyk bojawy dzięki któremu staję się prawdziwym gorylem`
            break
        case "Krystian":
            characterSpecification.innerHTML = `Jest to postać wykonująca taran co ${manekin.ramCooldown} tur, który stunuje oraz nakłada krwawienie na okonenta (${manekin.bleedStackAD}dmg per stack) oraz co ${manekin.eatCooldown} tur zjada "${manekin.food}"`
            break
        case "Szkolny laptop":
            characterSpecification.innerHTML = `Jest to sprzęt który nakłada debufy a sam nic nie zadaje obrażeń, za niego to robią jego przywołańce "${manekin.summoners}"`
            break
        default:
            console.log("sraka nie działa");
    }

    dialog.showModal()
}

function closeDialog()
{
    let dialog = document.getElementById("characterSpecificationDialog")
    dialog.close()
}

//#endregion

//#region funkcje do gry

function fight()
{
    let autoPlay = setInterval(() =>
    {
        if (turn % 2)
        {
            enemyCharacter.attack()
            console.log("przeciwnik zaatakował")
        }
        else
        {
            playerCharacter.attack()
        }

        if (playerCharacter.hp < 1)
        {
            console.log("gracz zmarł")
            clearInterval(autoPlay)
        }
        else if (playerCharacter.hp < 1)
        {
            console.log("oponent zmarł");
            clearInterval(autoPlay)
        }
    }, 1500)
}

function addLevel()
{
    console.log("srasz?");
}

function genNextStage()
{
    if (enemyAlive)
    {
        let character = enemyList[Math.floor(Math.random() * enemyList.length)]
        let enemyLvl = Math.floor(Math.random() * 5) + stage
        enemyCharacter = new EnemyCharacter(character, enemyLvl)

        console.log(`${enemyCharacter.character} z poziomem ${enemyCharacter.level}`);
    }
}

//#endregion

//#region create testing area for game

function openTestingGround()
{
    let passCheck = prompt("Podaj haslo")

    if (passCheck == "woda")
    {
        const mainScene = document.getElementById("mainScene")
        mainScene.innerHTML = ""

        const addLvlBtn = document.createElement("button")
        addLvlBtn.innerHTML = "dodaj poziom postaci"
        addLvlBtn.onclick = addLevel

        const newEnemy = document.createElement("button")
        newEnemy.innerHTML = "pojaw nowego przeciwnika"
        newEnemy.onclick = genNextStage

        const nextStage = document.createElement("button")
        nextStage.innerHTML = "następny stage"
        nextStage.onclick = () => { console.log(++stage) }

        const earlierStage = document.createElement("button")
        earlierStage.innerHTML = "poprzedni stage"
        earlierStage.onclick = () => { console.log(--stage) }

        mainScene.append(addLvlBtn, newEnemy, nextStage, earlierStage)
    }
}

//#endregion