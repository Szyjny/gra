////////////////////////////////////// TEST LINES //////////////////////////////////////

onload = () =>
{
    console.log("start")

    playerCharacter = new PlayerCharacter(localStorage.getItem("character"), 0);
    console.log(playerCharacter)
    
    backgroundMusic = new createSFX("yes", "yes")
    console.log(backgroundMusic);

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
        this.maxHp = Math.ceil((this.baseHp * 0.05 * level) + this.baseHp)
        this.hp = this.maxHp

        this.baseAd = characterBaseAd
        this.maxAd = Math.ceil((this.baseAd * 0.05 * level) + this.baseAd)
        this.Ad = this.maxAd

        this.baseArmor = characterBaseArmor
        this.armor = this.baseArmor

        this.level = level
        this.exp = 0
        this.neededExp = Math.floor(50 * this.level * 0.25 + 100)
        //lvl 0 -> 100 | level 1 -> 112 | level 5 -> 162 | level 10 -> 225

        this.activePassiveEffects = true
        this.bleedStacks = 0
    }

    //#region attack & his components

    attack()
    {
        //TODO:
        if (turn % 2)
        {
            let hit = Math.ceil(Math.random() * playerCharacter.Ad)
            console.log(`Enamy hit: ${hit}ad`)

            if (playerCharacter.activePassiveEffects)
            {
                if (playerCharacter.bleedStacks)
                {
                    let bleedHit = enemyCharacter.bleedStackAD * playerCharacter.bleedStacks
                    console.log(`bleed dmg to player: ${bleedHit} : ${playerCharacter.bleedStacks}`);
                    playerCharacter.hp -= bleedHit
                }
            }

            if (playerCharacter.bleed)
            {
                this.#effectBleed()
            }

            addElement(`Enemy hp => ${enemyCharacter.hp} - ${hit} = ${enemyCharacter.hp - hit}`)

            playerCharacter.SFX.playSound(playerCharacter.SFX.atack, NORMAL_VOLUME, false)
            enemyCharacter.SFX.playSound(enemyCharacter.SFX.hurtSound, QUITER_VOLUME, false)

            if (playerCharacter.crit)
            {
                hit = playerCharacter.#effectCrit()
            }
            hit -= enemyCharacter.armor

            if (hit > 0)
                enemyCharacter.hp -= hit
            else    
                console.log(`arrmor bock player hit`)

            if (playerCharacter.berserker)
                if (playerCharacter.berserkerActivateChance >= Math.random())
                {
                    playerCharacter.activePassiveEffects = false
                    playerCharacter.SFX.playSound(playerCharacter.SFX.berserker, QUIET_VOLUME, false)
                    return playerCharacter.attack()
                }
        }
        else
        {
            let hit = Math.floor(Math.random() * enemyCharacter.Ad)
            console.log(`Enamy hit: ${hit}ad`)


            if (enemyCharacter.activePassiveEffects)
            {
                if (enemyCharacter.bleedStacks)
                {
                    let bleedHit = playerCharacter.bleedStackAD * enemyCharacter.bleedStacks
                    console.log(`bleed dmg to enemy: ${bleedHit} : ${enemyCharacter.bleedStacks}`);
                    enemyCharacter.hp -= bleedHit
                }
            }

            if (enemyCharacter.bleed)
            {
                this.#effectBleed()
            }

            addElement(`Player hp => ${playerCharacter.hp} - ${hit} = ${playerCharacter.hp - hit}`)

            enemyCharacter.SFX.playSound(enemyCharacter.SFX.atack, NORMAL_VOLUME, false)
            playerCharacter.SFX.playSound(playerCharacter.SFX.hurtSound, QUITER_VOLUME, false)

            if (enemyCharacter.crit)
            {
                hit = enemyCharacter.#effectCrit()
            }
            hit -= playerCharacter.armor

            if (hit > 0)
                playerCharacter.hp -= hit
            else    
                console.log(`arrmor bock enemy hit`)

            if (enemyCharacter.berserker)
                if (enemyCharacter.berserkerActivateChance >= Math.random())
                {
                    enemyCharacter.activePassiveEffects = false
                    enemyCharacter.SFX.playSound(enemyCharacter.SFX.berserker, QUIET_VOLUME, false)
                    return enemyCharacter.attack()
                }
        }

        console.log(`Player hp: ${playerCharacter.hp}\nEnamy hp: ${enemyCharacter.hp}`);
    }
    #effectStun()
    {
        //TODO:
    }
    #effectBleed()
    {
        if (turn % 2)
        {
            if (playerCharacter.bleed)
            {
                enemyCharacter.bleedStacks++
                addElement(`Enemy bleed stacks: ${enemyCharacter.bleedStacks}`)
            }
        }
        else
        {
            if (enemyCharacter.bleed)
            {
                playerCharacter.bleedStacks++
                addElement(`Player bleed stacks: ${playerCharacter.bleedStacks}`)
            }
        }
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
    #effectCrit(hit)
    {
        if (turn % 2)
        {
            if (Math.random() <= playerCharacter.critChance)
            {
                playerCharacter.SFX.playSound(playerCharacter.SFX.crit, QUIET_VOLUME, false)
                console.log("kryt gracza --------");
                return hit *= 2
            }
            return hit
        }
        else
        {
            if (Math.random() <= enemyCharacter.critChance)
            {
                enemyCharacter.SFX.playSound(enemyCharacter.SFX.crit, QUIET_VOLUME, false)
                console.log("kryt enemy --------");
                return hit *= 2
            }
            return hit
        }
    }
    #effectDodged()
    {
        if (turn % 2)
        {
            if (Math.random() <= playerCharacter.dodgedChance)
            {
                return true
            }
            return false
        }
        else
        {
            if (Math.random() <= enemyCharacter.dodgedChance)
            {
                return true
            }
            return false
        }
    }
    #eat()
    {
        if (turn % 2)
        {
            const FOOD_INDEX = Math.floor(Math.random() * playerCharacter.food.length)

            switch (playerCharacter.food[FOOD_INDEX])
            {
                case 'Pizzerka':
                    playerCharacter += playerCharacter.maxHp * 0.20
                    break
            }
        }
        else
        {
            const FOOD_INDEX = Math.floor(Math.random() * enemyCharacter.food.length)

            switch (enemyCharacter.food[FOOD_INDEX])
            {
                case 'Pizzerka':
                    enemyCharacter += enemyCharacter.maxHp * 0.20
                    break
            }
        }
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
        if (turn % 2)
        {
            playerCharacter.hp += playerCharacter.buffStatsOverTimeHp
            playerCharacter.ad += playerCharacter.buffStatsOverTimeAd
            playerCharacter.armor += playerCharacter.buffStatsOverTimeArmor
        }
        else
        {
            enemyCharacter.hp += enemyCharacter.buffStatsOverTimeHp
            enemyCharacter.ad += enemyCharacter.buffStatsOverTimeAd
            enemyCharacter.armor += enemyCharacter.buffStatsOverTimeArmor
        }
    }
    #mutagen()
    {
        if (turn % 2)
        {
            if ((turn % 2) % playerCharacter.evolutionNeedTurns)
            {
                addMutagens(playerCharacter.evolutionMutagens[playerCharacter.evolutionStage])
            }
        }
        else
        {
            if ((turn % 2) % enemyCharacter.evolutionNeedTurns)
            {
                addMutagens(enemyCharacter.evolutionMutagens[enemyCharacter.evolutionStage])
            }
        }

        addMutagens(mutagenName)
        {
            switch (mutagenName)
            {
                case 'bleed':
                    this.crit = true
                    this.randomCritChance = 0.10
                    break
                case 'crit':
                    this.bleed = true
                    this.bleedStackAD = 5
                    break
            }
        }
    }
    #ram()
    {
        //TODO:
    }
    #summon()
    {
        if (turn % 2)
        {
            const SUMMONED_CHARACTER_INDEX = Math.floor(Math.random() * playerCharacter.summoners.length)
            playerSummoners += new SummonersCharacter(playerCharacter.summoners[SUMMONED_CHARACTER_INDEX])
        }
        else
        {
            const SUMMONED_CHARACTER_INDEX = Math.floor(Math.random() * enemyCharacter.summoners.length)
            enemySummoners += new SummonersCharacter(enemyCharacter.summoners[SUMMONED_CHARACTER_INDEX])
        }
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
                this.crit = true
                this.critChance = 0.25         // że 25%
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

        this.SFX = new createSFX(character, "player")
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
                super(650, 100, 5, level)
                this.weapon = true
                this.weaponUsed = "Usp-s"
                this.ammo = 3
                this.dodged = true
                this.dodgedChance = 0.1
                break;
            case "Szymon Oiginal":
                super(220, 0, -5, 350)
                this.weapon = true
                this.weaponUsed = "Awp"
                this.ammo = 1
                break;
        }

        this.character = character

        this.SFX = new createSFX(character, "enemy")
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

        this.SFX = new createSFX(character, "summoner")
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
    constructor(character, who)
    {
        if (who == "player")
        {
            switch (character)
            {
                case "Sagan":
                    this.atack = `/SFX/Sagan/SaganAtack.mp3`
                    this.hurtSound = `/SFX/Sagan/SaganTakingDamage.mp3`
                    this.win = '/SFX/Sagan/SaganWin.mp3'
                    this.rip = '/SFX/Sagan/SaganDie.mp3'
                    this.theft = '/SFX/Sagan/SaganStealing.mp3'
                    break
                case "Bejrowicz":
                    this.atack = `/SFX/Benger/BengerAtack.mp3`
                    this.hurtSound = `/SFX/Benger/BengerTakingDMG.mp3`
                    this.win = '/SFX/Benger/BengerWin.mp3'
                    this.rip = '/SFX/Benger/BengerDies.mp3'
                    this.summon = '/SFX/Benger/BengerSummon.mp3'
                    break
                case "Czupryńska":
                    this.atack = `/SFX/Czupryńska/CzupKrzyk.mp3`
                    this.hurtSound = `/SFX/Czupryńska/CzupTakingDamage.mp3`
                    this.win = '/SFX/Czupryńska/CzupWin.mp3'
                    this.rip = '/SFX/Czupryńska/CzupDeath.mp3'
                    this.berserker = `/SFX/Czupryńska/CzupAnotherAtack.mp3`
                    this.crit = '/SFX/Czupryńska/CzupCrit.mp3'
                    break
                case "Dolega":
                    this.atack = `/SFX/Dolega/DolegaAtack.mp3`
                    this.hurtSound = `/SFX/Dolega/DolegaTakingDMG.mp3`
                    this.win = '/SFX/Dolega/DolegaWin.mp3'
                    this.rip = '/SFX/Dolega/DolegaDies.mp3'
                    this.warShout = '/SFX/Dolega/DolegaWarShout.mp3'
                    break
                case "Krystian":
                    this.atack = `/SFX/Krystian/krystianAtack.mp3`
                    this.hurtSound = `/SFX/Krystian/KrystaintakingDamage.mp3`
                    this.win = '/SFX/Krystian/KrystianWin.mp3'
                    this.rip = '/SFX/Krystian/KrystianDies.mp3'
                    this.ram = '/SFX/Krystian/KrystainRam.mp3'
                    this.eat = '/SFX/Krystian/KrystianEating.mp3'
                    break
                case "Szkolny laptop":
                    this.atack = `/SFX/Laptop/LaptopAtack.mp3`
                    this.hurtSound = `/SFX/Laptop/LaptopTakingDamage.mp3`
                    this.win = '/SFX/Laptop/LaptopWin.mp3'
                    this.rip = '/SFX/Laptop/LaptopDeath.mp3'
                    this.summon = '/SFX/Laptop/LaptopProgramists.mp3'
                    break
            }
        }
        else if (who == "enemy")
        {
            switch (character)
            {
                case "Szymon Asasyn":
                    this.atack = `/SFX/SzymonAssasyn/AssasinAtack.mp3`
                    this.hurtSound = `/SFX/SzymonAssasyn/AssasintakingDMG.mp3`
                    this.win = '/SFX/SzymonAssasyn/AssasinWin.mp3'
                    this.rip = '/SFX/SzymonAssasyn/AssasinDies.mp3'
                    this.stun = '/SFX/SzymonAssasyn/AssasinDzwignia.mp3'
                    break
                case "Szymon Artysta":
                    this.atack = `/SFX/SzymonArtist/SzymonArtistAtack.mp3`
                    this.hurtSound = `/SFX/SzymonArtist/SzymonArtistTakingDMG.mp3`
                    this.win = '/SFX/SzymonArtist/SzymonArtistWin.mp3'
                    this.rip = '/SFX/SzymonArtist/SzymonArtistRIP.mp3'
                    this.buffStatsOverTime = '/SFX/SzymonArtist/SzymonArtistBuff.mp3'
                    break
                case "Szymon Hitman":
                    this.atack = `/SFX/SzymonHitman/HitmanSzymonAtack.mp3`
                    this.hurtSound = `/SFX/SzymonHitman/SzymonHitmanTakingDMG.mp3`
                    this.win = '/SFX/SzymonHitman/SzymonHitmanWin.mp3'
                    this.rip = '/SFX/SzymonHitman/SzymonHitmanDie.mp3'
                    this.reloadGun = '/SFX/SzymonHitman/HitmanSzymonReload.mp3'
                    this.dodge = '/SFX/SzymonHitman/HitmanSzymonDodge.mp3'
                    break
                case "Szymon Oiginal":
                    this.atack = `/SFX/Szymon/SzymonAtack.mp3`
                    this.hurtSound = `/SFX/Szymon/SzymonTakingDMG.mp3`
                    this.win = '/SFX/Szymon/SzymonWin.mp3'
                    this.rip = '/SFX/Szymon/SzymonDies.mp3'
                    this.broke = '/SFX/Szymon/SzymonŁamanie.mp3'
                    break
            }
        }
        else
        {
            switch (character) 
            {
                case "Ekonimistka":
                    this.atack = `/SFX/Summoners/EkonomistkiAtack.mp3`
                    this.hurtSound = `/SFX/Summoners/EkonomistkiDies.mp3`
                    break
                case "Rozjuszony programista":
                    this.atack = `/SFX/Summoners/ProgramisciAtack.mp3`
                    this.hurtSound = `/SFX/Summoners/ProgramisciDies.mp3`
                    break
                default:
                    this.selectCharacter = `/Music/Background/CharacterSelect.mp3`
                    this.loginAndSing = `/Music/Background/CreateAcountAndLogin.mp3`
                    this.gameBackground = `/Music/Background/GameBackground.mp3`
                    this.menu = `/Music/Background/MainMenu.mp3`
                    this.bossFight = `/Music/Location/BossFight.mp3`
                    this.fight = `/Music/Location/Fight.mp3`
                    this.shopkepper = `/Music/Location/Shopkepper.mp3`
                    this.village = `/Music/Location/Village.mp3`
            }
        }
    }

    playSound(soundSrc, volume, loopStatus)
    {
        let audio = new Audio(soundSrc)
        audio.loop = loopStatus
        audio.volume = volume

        audio.play()
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
    turn = 1; //będzie podmianka na "console.count(label)"

//#endregion

//#region static variables

const enemyList = ["Szymon Asasyn", "Szymon Artysta", "Szymon Hitman", "Szymon Oiginal"]
const
    NORMAL_VOLUME = 1,
    QUITER_VOLUME = 0.67,
    QUIET_VOLUME = 0.34

//#endregion

//#region other

let
    backgroundMusic,
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

//#endregion

//#region funkcje do gry

function fight()
{
    let autoPlay = setInterval(() =>
    {
        console.log(`------- tura: ${turn} -------\n`)

        if (turn % 2)
        {
            playerCharacter.attack()
            console.log("gracz zaatakował")
            addElement(`🪖 tura gracza ${turn} 🪖`)
        }
        else
        {
            enemyCharacter.attack()
            console.log("enemy zaatakował");
            addElement(`🪖 tura enemy ${turn} 🪖`)
        }

        if (playerCharacter.hp < 1)
        {
            console.log("gracz zmarł")

            enemyCharacter.SFX.playSound(enemyCharacter.SFX.win, NORMAL_VOLUME, false)
            playerCharacter.SFX.playSound(playerCharacter.SFX.rip, QUITER_VOLUME, false)

            addElement(`⛔ END FIGHT 😵`)
            clearInterval(autoPlay)
        }
        else if (enemyCharacter.hp < 1)
        {
            console.log("oponent zmarł");

            playerCharacter.SFX.playSound(playerCharacter.SFX.win, QUITER_VOLUME, false)
            enemyCharacter.SFX.playSound(enemyCharacter.SFX.rip, QUITER_VOLUME, false)

            addElement(`🏆 END FIGHT 🥊`)
            clearInterval(autoPlay)
        }

        upadateCharactersStats()
        turn++
    }, 1750)
}

function addLevel()
{
    console.log("widzisz mnie?");
}

function genNextStage()
{
    if (enemyAlive)
    {
        let character = enemyList[Math.floor(Math.random() * enemyList.length)]
        let enemyLvl = Math.floor(Math.random() * 5) + stage
        enemyCharacter = new EnemyCharacter(character, enemyLvl)

        console.log(`${enemyCharacter.character} z poziomem ${enemyCharacter.level}`);
        console.log(enemyCharacter);
    }
}

function addElement(text)
{
    const adwentureHistoryWrapper = document.getElementById("adwentureHistory")
    const addedHistory = document.createElement("p")

    addedHistory.innerHTML = text
    adwentureHistoryWrapper.insertBefore(addedHistory, adwentureHistoryWrapper.firstChild)
}

function newBgMusic()
{
    console.log(`ys`);
    backgroundMusic.playSound(backgroundMusic.menu, QUITER_VOLUME, true)
}

function startGame()
{
    let button = document.querySelector(".gameStartButton")
    console.log(button);
    button.style.display = "none"

    genNextStage()

    let playerSide = document.getElementById("playerSide")
    let playerFightCard = document.getElementById("playerFightCard")
    let enemySide = document.getElementById("enemySide")
    let enemyFightCard = document.getElementById("enemyFightCard")

    let playerName = document.getElementById("playerName")
    let enemyName = document.getElementById("enemyName")

    playerName.innerHTML = playerCharacter.character
    enemyName.innerHTML = enemyCharacter.character

    let playerAvatar = document.getElementById("playerAvatar")
    let enemyAvatar = document.getElementById("enemyAvatar")

    playerAvatar.src = `/photos/${playerCharacter.character}.png`
    enemyAvatar.src = `/photos/${enemyCharacter.character}.png`

    upadateCharactersStats()

    playerSide.className = "show"
    playerFightCard.className = "show"
    enemySide.className = "show"
    enemyFightCard.className = "show"

    fight()
}

function upadateCharactersStats()
{
    let playerCardBody = document.getElementById("playerCardBody")
    let enemyCardBody = document.getElementById("enemyCardBody")

    let playerParms = playerCardBody.querySelectorAll("p")
    let enemyParms = enemyCardBody.querySelectorAll("p")

    playerParms[0].innerHTML = `Lvl: ${playerCharacter.level}`
    playerParms[1].innerHTML = `hp: ${playerCharacter.hp}`
    playerParms[2].innerHTML = `ad: ${playerCharacter.Ad}`
    playerParms[3].innerHTML = `armor: ${playerCharacter.armor}`

    enemyParms[0].innerHTML = `Lvl: ${enemyCharacter.level}`
    enemyParms[1].innerHTML = `hp: ${enemyCharacter.hp}`
    enemyParms[2].innerHTML = `ad: ${enemyCharacter.Ad}`
    enemyParms[3].innerHTML = `armor: ${enemyCharacter.armor}`
}

//#endregion

//#region create testing area for game

function openTestingGround()
{
    let passCheck = prompt("Podaj haslo")

    if (passCheck == "woda")
    {
        const audio = new Audio("/SFX/Sagan/SaganDie.mp3")
        audio.play()

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

        const testingFight = document.createElement("button")
        testingFight.innerHTML = "testowa walka"
        testingFight.onclick = () => { genNextStage(); fight() }



        mainScene.append(addLvlBtn, newEnemy, nextStage, earlierStage, testingFight)
    }
}

//#endregion

//#region dialogs

function openSelectCharacterDialog(character)
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
            characterSpecification.innerHTML = `Jest to postać która przez tureta posiada ${manekin.berserkerActivateChance * 100}% na wykonanie kolejnego ataku oraz ${manekin.critChance * 100}% na wykonanie ciosu krytycznego`
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

function closeSelectCharacterDialog()
{
    let dialog = document.getElementById("characterSpecificationDialog")
    dialog.close()
}

function openAccountStatsDialog()
{
    let showAccountStats = document.getElementById("showAccountStats")
    showAccountStats.showModal()
}

function closeAccountStatsDialog()
{
    let showAccountStats = document.getElementById("showAccountStats")
    showAccountStats.close()
}

//#endregion
