////////////////////////////////////// TEST LINES //////////////////////////////////////

onload = () =>
{
    console.log("start")

    playerCharacter = new PlayerCharacter(localStorage.getItem("character"), 0);
    console.log(playerCharacter)
    playerCharacter.attack()

    if (summoners.length)
        console.log("jest");
    else
        console.log("ema");

    summoners = []

    if (summoners.length)
        console.log("jest");
    else
        console.log("ema");

    let ile = 25
    while (ile--)
    {
        //czekam na testy
    }
}

/////////////////////////////////////// CLASS-Y ///////////////////////////////////////

class fighter
{
    constructor(characterBaseHp, characterBaseAd, characterBaseArmor, level)
    {
        this.baseHp = characterBaseHp
        this.maxHp = (this.baseHp * 0.05) * level + this.baseHp
        this.hp = this.maxHp

        this.baseAd = characterBaseAd
        this.maxAd = (this.baseAd * 0.05) * level + this.baseAd
        this.Ad = this.maxAd

        this.level = level
        this.neededExp = 50 * this.level * 0.25 + 100//lvl 0 -> 100 | level 1 -> 144 | level 10 -> 225
        this.exp = 0

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
    #summon(summonedCharacter)
    {
        //TODO:
    }
    //TODO: dodaj sternicką co będzie dawała efekt tygodnia

    //#endregion
}

class PlayerCharacter extends fighter
{
    constructor(character, lvl)
    {
        //TODO:
        switch (character)
        {
            case "Sagan":
                super(1000, 1000, 1000, lvl) //FIXME:
                this.theft = true
                break;
            case "Czupryńska":
                super(1000, 1000, 1000, lvl) //FIXME:
                this.theft = true
                break;
            case "Bejrowicz":
                super(1000, 1000, 1000, lvl) //FIXME:
                this.theft = true
                break;
            case "Dolega":
                super(1000, 1000, 1000, lvl) //FIXME:
                this.theft = true
                break;
            case "Krystian":
                super(1000, 1000, 1000, lvl) //FIXME:
                this.theft = true
                break;
            case "Szkolny laptop":
                super(1000, 1000, 1000, lvl) //FIXME:
                this.theft = true
                break;
        }

        this.character = character
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

class EnemyCharacter extends fighter
{
    constructor(character, level)
    {
        //TODO:
        switch (character)
        {
            case "Szymon Asasyn":
                super(1000, 1000, 1000, level) //FIXME:
                this.theft = true
                break;
            case "Szymon Artysta":
                super(1000, 1000, 1000, level) //FIXME:
                this.theft = true
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

/////////////////////////////////////// ZMIENNE ///////////////////////////////////////

//#region obiekty postaci

let
    playerCharacter,
    enemyCharacter,
    summoners = ["maslo"];

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

    localStorage.setItem("character", character.value);

    console.log(playerCharacter)
}

//#endregion

//#region funkcje do gry

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