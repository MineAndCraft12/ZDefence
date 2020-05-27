function getId(target){
    return document.getElementById(target);
}

function clearElement(targetElement){
    while(targetElement.firstChild){
        targetElement.removeChild(targetElement.firstChild);
    }
}

var ZDef = {
    levels: {
        mainMenu: {
            name: "Main Menu",
            levelType: "menu",
            background: "green",
            menu: {
                title: "ZDefence",
                options: {
                    beginGame: {
                        name: "Begin Game",
                        action: () => {
                            ZDef.loadLevel("game1_1");
                        }
                    },
                    levelSelect: {
                        name: "Level Select",
                        action: () => {
                            ZDef.loadLevel("levelSelect");
                        }
                    },
                    options: {
                        name: "Options",
                        action: () => {

                        }
                    }
                }
            }
        },
        levelSelect: {
            name: "Level Select",
            levelType: "menu",
            background: "green",
            menu: {
                title: "Level Select",
                buildScript: (newMenu) => {
                    for(var level in ZDef.levels){
                        if(level.indexOf("game") === 0){
                            var newButton = document.createElement("div");
                            newButton.classList.add("menuButton");
                            newButton.innerHTML = ZDef.levels[level].name || level;
                            newButton.setAttribute("onClick", 'ZDef.loadLevel("' + level + '")');
                            newMenu.appendChild(newButton);
                        }
                    }
                }
            }
        },
        /*
            Standard level size is 6 high, 9 wide.
            (that's 6 rows / lanes, and 9 columns per row)

            Standard levels have shock fences on left side.
            The first zombie to reach the left edge of the screen
            will destroy its lane's section of shock fence, and die.
            The shock fence acts as a sort of mercy protection,
            to ensure that the player doesn't die from the first
            zombie to breach their defenses.

            Standard levels grant some amount of time for the player
            to begin a basic set of defenses or preparations.

            Spawn event delays are in Seconds, and mark how long
            to wait before launching the **NEXT** event
        */
        game1_1: {
            name: "1 - 1",
            levelType: "normal",
            backgroundImage: "bg/grass.png",
            backgroundColor: "#00840D",
            boardProperties: {
                height: 6,
                width: 9,
                shockFences: true
            },
            levelProperties: {
                startingPower: 50,
                availableTools: [
                    "erase",
                    "solarPanel",
                    "dartShooter"
                ],
                spawnEvents: [
                    {   // if any of these are left blank, they are assumed -1
                        bossWave: -1,       // does this mark a boss wave? (-1 is no, 1 is yes)
                        spawnName: -1,      // name of enemy or selection of possible enemies to spawn (-1 is none)
                        spawnRow: -1,       // row (or range of rows) to spawn enemy (-1 is random)
                        spawnColumn: -1,    // column (or range of columns) to spawn enemy (-1 is beyond last column)
                        spawnCondition: -1, // must spawn on specific type of land (-1 is no condition)
                        spawnOnEach: -1,     // spawn one on every instance of object (-1 is none), not compatible with spawnCount
                        spawnCount: -1,     // number of enemies to spawn (-1 is the same as 1, 0 skips spawn), not compatible with spawnOnEach
                        delay: 45,          // delay (or range of possible delay) to next event
                                            // (-1 is none, 0 is next tick, any higher is seconds)
                                            // ("clear" will run the next event when all enemies are eliminated)
                    },  // if only delay is present, simply sets a timer to the next event
                    /*
                        this would have been identical as:
                        {
                            delay: 10
                        }
                    */
                    {
                        spawnName: "zombie",
                        delay: [35, 40]
                    },
                    {
                        spawnName: "zombie",
                        delay: [30, 35]
                    },
                    {
                        spawnName: "zombie",
                        delay: [25, 30]
                    },
                    {
                        spawnName: "zombie",
                        delay: 15
                    },
                    {
                        spawnName: "zombie",
                        delay: "clear"
                    },
                    // BOSS WAVE
                    {
                        bossWave: 1,
                        spawnName: "zombie",
                        spawnCount: 5,
                        delay: 2
                    },
                    {
                        bossWave: 1,
                        spawnName: "zombie",
                        spawnCount: 2,
                        delay: 2
                    },
                    {
                        bossWave: 1,
                        spawnName: "zombie",
                        spawnCount: 3,
                        delay: "clear"
                    },
                    {
                        trigger: "win",
                        nextLevel: "game1_2",
                        delay: 5
                    }
                ]
            }
        },
        game1_2: {
            name: "1 - 2",
            levelType: "normal",
            backgroundImage: "bg/grass.png",
            backgroundColor: "#00840D",
            boardProperties: {
                height: 6,
                width: 9,
                shockFences: true
            },
            levelProperties: {
                startingPower: 50,
                availableTools: [
                    "erase",
                    "solarPanel",
                    "dartShooter",
                    "tranqDartShooter"
                ],
                spawnEvents: [
                    {   // if any of these are left blank, they are assumed -1
                        bossWave: -1,       // does this mark a boss wave? (-1 is no, 1 is yes)
                        spawnName: -1,      // name of enemy or selection of possible enemies to spawn (-1 is none)
                        spawnRow: -1,       // row (or range of rows) to spawn enemy (-1 is random)
                        spawnColumn: -1,    // column (or range of columns) to spawn enemy (-1 is beyond last column)
                        spawnCondition: -1, // must spawn on specific type of land (-1 is no condition)
                        spawnOnEach: -1,     // spawn one on every instance of object (-1 is none), not compatible with spawnCount
                        spawnCount: -1,     // number of enemies to spawn (-1 is the same as 1, 0 skips spawn), not compatible with spawnOnEach
                        delay: 45,          // delay (or range of possible delay) to next event
                                            // (-1 is none, 0 is next tick, any higher is seconds)
                                            // ("clear" will run the next event when all enemies are eliminated)
                    },  // if only delay is present, simply sets a timer to the next event
                    /*
                        this would have been identical as:
                        {
                            delay: 10
                        }
                    */
                    {
                        spawnName: "zombie",
                        delay: [35, 40]
                    },
                    {
                        spawnName: "zombie",
                        delay: [30, 35]
                    },
                    {
                        spawnName: "zombie",
                        delay: [25, 30]
                    },
                    {
                        spawnName: "helmetZombie",
                        delay: [25, 30]
                    },
                    {
                        spawnName: "helmetZombie",
                        delay: 15,
                    },
                    {
                        spawnName: "zombie",
                        delay: "clear"
                    },
                    // BOSS WAVE
                    {
                        bossWave: 1,
                        spawnName: "zombie",
                        spawnCount: 5,
                        delay: 2
                    },
                    {
                        bossWave: 1,
                        spawnName: "helmetZombie",
                        spawnCount: 2,
                        delay: 2
                    },
                    {
                        bossWave: 1,
                        spawnName: "zombie",
                        spawnCount: 3,
                        delay: "clear"
                    },
                    {
                        spawnName: "zombie",
                        delay: 15
                    },
                    {
                        spawnName: "helmetZombie",
                        delay: 3
                    },
                    {
                        spawnName: "zombie",
                        delay: 15
                    },
                    {
                        spawnName: "zombie",
                        delay: 10
                    },
                    {
                        spawnName: "helmetZombie",
                        delay: "clear"
                    },
                    {
                        bossWave: 1,
                        spawnName: "zombie",
                        spawnCount: 4,
                        delay: 3
                    },
                    {
                        bossWave: 1,
                        spawnName: "helmetZombie",
                        spawnCount: 3,
                        delay: 3
                    },
                    {
                        bossWave: 1,
                        spawnName: "zombie",
                        spawnCount: 4,
                        delay: "clear"
                    },
                    {
                        trigger: "win",
                        nextLevel: "game1_3",
                        delay: 5
                    }
                ]
            }
        }
    },
    
    zombies: {
        zombie: {
            image: "zombies/zombie.png",
            imageSize: [80, 90],
            imageCenter: [40, 45],  // center point of image
            health: 100,            // 100 is standard
            speed: 20,              // 20 pixels per second
            damage: 10,             // 10 per attack
            attackSpeed: 1,         // attacks per second
            attackType: "melee",    // melee attack or ranged attack
            damageAction: (self, amount, type) => {
                self.health -= amount;
                if(type === "slow"){
                    self.speedModifier = 0.5;
                    self.speedModifierTime = performance.now();
                }
                if(self.health <= 0){
                    self.destroy = true;
                }
            },
            destroyAction: (self) => {

            }
        },
        helmetZombie: {
            image: "zombies/helmetZombie.png",
            imageSize: [80, 95],
            imageCenter: [40, 50],  // center point of image
            health: 200,            // 100 is standard
            speed: 20,              // 20 pixels per second
            damage: 10,             // 10 per attack
            attackSpeed: 1,         // attacks per second
            attackType: "melee",    // melee attack or ranged attack
            damageAction: (self, amount, type) => {
                self.health -= amount;
                if(type === "slow"){
                    self.speedModifier = 0.5;
                    self.speedModifierTime = performance.now();
                }
                if(self.health <= 0){
                    self.destroy = true;
                }else if(self.health <= 100){
                    self.name = "zombie";
                }
            },
            destroyAction: (self) => {

            }
        }
    },

    tools: {
        erase: {
            name: "erase",
            image: "tools/erase.png",
            cost: 0,
            cooldown: 0,
            clickAction: () => {
                ZDef.placePreview("erase", "erase");
            }
        },
        solarPanel: {
            name: "Solar Panel",
            image: "towers/solarPanel.png",
            cost: 50,
            cooldown: 5,
            clickAction: () => {
                ZDef.placePreview("solarPanel", "solarPanel");
            }
        },
        dartShooter: {
            name: "Dart Shooter",
            image: "towers/dartShooter.png",
            cost: 100,
            cooldown: 5,
            clickAction: () => {
                ZDef.placePreview("dartShooter", "dartShooter");
            }
        },
        tranqDartShooter: {
            name: "Tranquilizer Dart Shooter",
            image: "towers/tranqDartShooter.png",
            cost: 175,
            cooldown: 5,
            clickAction: () => {
                ZDef.placePreview("tranqDartShooter", "tranqDartShooter");
            }
        }
    },

    towers: {
        shockFence: {
            image: "towers/shockFence.png",
            imageSize: [40, 90],
            imageCenter: [20, 45]
        },
        solarPanel: {
            image: "towers/solarPanel.png",
            imageSize: [80, 90],
            imageCenter: [40, 45],
            health: 50,
            initialAttackSpeed: 5,
            attackSpeed: 15,
            attackType: "normal",
            attackProjectile: "power",
            attackPosition: [40, 40],
            damageAction: (self, amount, type) => {
                self.health -= amount;
                if(self.health <= 0){
                    self.destroy = true;
                }
            },
            destroyAction: (self) => {
                
            }
        },
        dartShooter: {
            image: "towers/dartShooter.png",
            imageSize: [80, 90],
            imageCenter: [40, 45],
            health: 50,
            attackSpeed: 2.5,
            initialAttackSpeed: 0.5,
            attackType: "normal",
            attackProjectile: "dart",
            attackPosition: [79, 57],
            attackCondition: "enemy",
            damageAction: (self, amount, type) => {
                self.health -= amount;
                if(self.health <= 0){
                    self.destroy = true;
                }
            },
            destroyAction: (self) => {

            }
        },
        tranqDartShooter: {
            image: "towers/tranqDartShooter.png",
            imageSize: [80, 90],
            imageCenter: [40, 45],
            health: 50,
            attackSpeed: 2.5,
            initialAttackSpeed: 0.5,
            attackType: "normal",
            attackProjectile: "tranqDart",
            attackPosition: [79, 57],
            attackCondition: "enemy",
            damageAction: (self, amount, type) => {
                self.health -= amount;
                if(self.health <= 0){
                    self.destroy = true;
                }
            },
            destroyAction: (self) => {

            }
        }
    },

    projectiles: {
        power: {
            image: "projectiles/power.png",
            imageSize: [40, 40],
            imageCenter: [20, 20],
            clickable: true,
            tickAction: (self) => {
                // todo - animate to fall onto ground when created
                if(performance.now() - self.createTime > 5000) {
                    self.destroy = true;
                }
            },
            clickAction: (self) => {
                // give user some power
                self.destroy = true;
                ZDef.userPower += 25;
            },
            destroyAction: (self) => {

            }
        },
        dart: {
            image: "projectiles/dart.png",
            imageSize: [12, 5],
            imageCenter: [10, 3],
            speed: 150,
            damage: 15,
            damageType: "normal",
            tickAction: (self) => {
                self.position[0] += ZDef.projectiles.dart.speed * ZDef.timeAdjust;
                if(self.position[0] > ZDef.levels[ZDef.currentLevel].boardProperties.width * 80 + 80){
                    self.destroy = true;
                }
            },
            collideAction: (self, targetType, target) => {
                if(targetType === "enemy"){
                    ZDef.zombies[target.name].damageAction(target, ZDef.projectiles.dart.damage, ZDef.projectiles.dart.damageType);
                    self.destroy = true;
                }
            },
            destroyAction: (self) => {

            }
        },
        tranqDart: {
            image: "projectiles/tranqDart.png",
            imageSize: [12, 5],
            imageCenter: [10, 3],
            speed: 150,
            damage: 15,
            damageType: "slow",
            tickAction: (self) => {
                self.position[0] += ZDef.projectiles.tranqDart.speed * ZDef.timeAdjust;
                if(self.position[0] > ZDef.levels[ZDef.currentLevel].boardProperties.width * 80 + 80){
                    self.destroy = true;
                }
            },
            collideAction: (self, targetType, target) => {
                if(targetType === "enemy"){
                    ZDef.zombies[target.name].damageAction(target, ZDef.projectiles.tranqDart.damage, ZDef.projectiles.tranqDart.damageType);
                    self.destroy = true;
                }
            },
            destroyAction: (self) => {

            }
        }
    },

    spawnProgress: 0,
    lastSpawn: 0,
    nextSpawnDelay: 0,

    skipSpawnDelay: () => {
        ZDef.nextSpawnDelay = 0;
    },

    userPower: 0,

    lastScreenDims: [0, 0],
    tickMoment: performance.now(),
    tickTime: 0,
    timeAdjust: 16 / 1000,
    gameTick: () => {
        requestAnimationFrame(ZDef.gameTick);

        var moment = performance.now();
        ZDef.tickTime = moment - ZDef.tickMoment;
        ZDef.tickMoment = moment;
        ZDef.timeAdjust = ZDef.tickTime / 1000;

        var displayCursor = "";

        if(window.innerWidth !== ZDef.lastScreenDims[0] || window.innerHeight !== ZDef.lastScreenDims[1]){
            ZDef.lastScreenDims = [window.innerWidth, window.innerHeight];
            if(getId("r0")){
                var boardRect = ZDef.playFieldElement.getBoundingClientRect();
                ZDef.boardPosition = [boardRect.left, boardRect.top];
            }else{
                ZDef.boardPosition = [NaN, NaN];
            }
        }
        if(isNaN(ZDef.boardPosition[0])){
            if(getId("r0")){
                var boardRect = ZDef.playFieldElement.getBoundingClientRect();
                ZDef.boardPosition = [boardRect.left, boardRect.top];
            }
        }

        // HANDLE SPAWN EVENTS
        if(ZDef.levels[ZDef.currentLevel].levelProperties){
            // if level has spawn events
            if(ZDef.levels[ZDef.currentLevel].levelProperties.spawnEvents){
                // if we have not completed all events
                if(ZDef.spawnProgress < ZDef.levels[ZDef.currentLevel].levelProperties.spawnEvents.length){
                    // count playfield zombies
                    var livingZombies = 0;
                    if(ZDef.nextSpawnDelay === "clear"){
                        for(var i in ZDef.laneEnemies){
                            livingZombies += ZDef.laneEnemies[i].length;
                        }
                    }
                    // if playfield is clear, or
                    // if enough time has passed since last event
                    if(
                        (ZDef.nextSpawnDelay === "clear" && livingZombies === 0) ||
                        (ZDef.nextSpawnDelay !== "clear" && moment - ZDef.nextSpawnDelay > ZDef.lastSpawn)
                    ){
                        // BEGIN SPAWN EVENT
                        ZDef.lastSpawn = moment;
                        ZDef.nextSpawnDelay = ZDef.levels[ZDef.currentLevel].levelProperties.spawnEvents[ZDef.spawnProgress].delay;
                        if(typeof ZDef.nextSpawnDelay === "number"){
                            if(ZDef.nextSpawnDelay < 0){
                                ZDef.nextSpawnDelay = 0;
                            }
                        }else if(typeof ZDef.nextSpawnDelay === "object"){
                            ZDef.nextSpawnDelay = Math.random() * (ZDef.nextSpawnDelay[1] - ZDef.nextSpawnDelay[0]) + ZDef.nextSpawnDelay[0];
                        }else if(ZDef.nextSpawnDelay !== "clear"){
                            ZDef.nextSpawnDelay = 0;
                        }
                        if(ZDef.nextSpawnDelay !== "clear"){
                            ZDef.nextSpawnDelay *= 1000;
                        }

                        var canSpawn = 1;

                        if(ZDef.levels[ZDef.currentLevel].levelProperties.spawnEvents[ZDef.spawnProgress].spawnName){
                            // if event's referenced zombie exists
                            if(ZDef.zombies[ZDef.levels[ZDef.currentLevel].levelProperties.spawnEvents[ZDef.spawnProgress].spawnName]){
                                // PREPARE TO SPAWN THE ZOMBIE

                                // determine number of zombies to spawn
                                var zombieCount = ZDef.levels[ZDef.currentLevel].levelProperties.spawnEvents[ZDef.spawnProgress].spawnCount
                                if(typeof zombieCount === "object"){
                                    zombieCount = Math.floor(Math.random(zombieCount[1] - zombieCount[0])) + zombieCount[0];
                                }else if(typeof zombieCount === "number"){
                                    if(zombieCount === -1){
                                        zombieCount = 1;
                                    }
                                }else{
                                    zombieCount = 1;
                                }

                                var spawnedOnRow = [];
                                var spawnRows = ZDef.levels[ZDef.currentLevel].levelProperties.spawnEvents[ZDef.spawnProgress].spawnRow;
                                if(typeof spawnRows === "object"){
                                    spawnRows = spawnRows.length;
                                }else if(typeof spawnRows === "number"){
                                    if(spawnRows >= 0 && spawnRows < ZDef.levels[ZDef.currentLevel].boardProperties.height);
                                    spawnRows = 1;
                                }else{
                                    spawnRows = ZDef.levels[ZDef.currentLevel].boardProperties.height;
                                }

                                console.log("Spawning " + zombieCount + " of " + ZDef.levels[ZDef.currentLevel].levelProperties.spawnEvents[ZDef.spawnProgress].spawnName);
                                for(var i = 0; i < zombieCount; i++){
                                    // prepare zombie properties
                                    var zombieName = ZDef.levels[ZDef.currentLevel].levelProperties.spawnEvents[ZDef.spawnProgress].spawnName;
                                    var zombieRow = ZDef.levels[ZDef.currentLevel].levelProperties.spawnEvents[ZDef.spawnProgress].spawnRow;
                                    var zombieColumn = ZDef.levels[ZDef.currentLevel].levelProperties.spawnEvents[ZDef.spawnProgress].spawnColumn;
                                    var zombieCondition = ZDef.levels[ZDef.currentLevel].levelProperties.spawnEvents[ZDef.spawnProgress].spawnCondition;
                                    var zombieOnEach = ZDef.levels[ZDef.currentLevel].levelProperties.spawnEvents[ZDef.spawnProgress].spawnOnEach;

                                    // select a row to spawn on
                                    if(typeof zombieRow === "object"){
                                        zombieRow = Math.floor(Math.random(zombieRow[1] - zombieRow[0])) + zombieRow[0];
                                    }else if(typeof zombieRow === "number"){
                                        if(zombieRow < 0 || zombieRow > ZDef.levels[ZDef.currentLevel].boardProperties.height){
                                            zombieRow = Math.floor(Math.random() * ZDef.levels[ZDef.currentLevel].boardProperties.height);
                                        }
                                    }else{
                                        zombieRow = Math.floor(Math.random() * ZDef.levels[ZDef.currentLevel].boardProperties.height);
                                    }

                                    // if all rows were spawned on, reset row tracker
                                    if(spawnedOnRow.length === spawnRows){
                                        spawnedOnRow = [];
                                    }
                                    // if row was already spawned on, select a new row
                                    while(spawnedOnRow.indexOf(zombieRow) !== -1){
                                        zombieRow = ZDef.levels[ZDef.currentLevel].levelProperties.spawnEvents[ZDef.spawnProgress].spawnRow;
                                        if(typeof zombieRow === "object"){
                                            zombieRow = Math.floor(Math.random(zombieRow[1] - zombieRow[0])) + zombieRow[0];
                                        }else if(typeof zombieRow === "number"){
                                            if(zombieRow < 0 || zombieRow > ZDef.levels[ZDef.currentLevel].boardProperties.height){
                                                zombieRow = Math.floor(Math.random() * ZDef.levels[ZDef.currentLevel].boardProperties.height);
                                            }
                                        }else{
                                            zombieRow = Math.floor(Math.random() * ZDef.levels[ZDef.currentLevel].boardProperties.height);
                                        }
                                    }
                                    // add current row to tracker
                                    spawnedOnRow.push(zombieRow);

                                    // select a column to spawn on
                                    if(typeof zombieColumn === "object"){
                                        zombieColumn = Math.floor(Math.random(zombieColumn[1] - zombieColumn[0])) + zombieColumn[0];
                                    }else if(typeof zombieColumn === "number"){
                                        if(zombieColumn < 0){
                                            zombieColumn = ZDef.levels[ZDef.currentLevel].boardProperties.width;
                                        }
                                    }else{
                                        zombieColumn = ZDef.levels[ZDef.currentLevel].boardProperties.width;
                                    }

                                    // todo - implement spawn conditions; re-roll the above randoms if condition is unsatisfied

                                    // todo - implement spawn-on-each; refactor spawn preparation loop and spawn a zombie on each occurence

                                    // SPAWN THE ZOMBIE
                                    console.log("Spawned on row " + zombieRow + ", column " + zombieColumn);
                                    ZDef.laneEnemies[zombieRow].push({
                                        name: zombieName,
                                        speedModifier: 1,
                                        health: ZDef.zombies[zombieName].health,
                                        position: 80 + (zombieColumn * 80),
                                        lastAttack: 0
                                    });
                                }
                            }
                        }

                        if(ZDef.levels[ZDef.currentLevel].levelProperties.spawnEvents[ZDef.spawnProgress].trigger){
                            if(ZDef.levels[ZDef.currentLevel].levelProperties.spawnEvents[ZDef.spawnProgress].trigger === "win"){
                                ZDef.winLevel(ZDef.levels[ZDef.currentLevel].levelProperties.spawnEvents[ZDef.spawnProgress].nextLevel);
                            }else if(ZDef.levels[ZDef.currentLevel].levelProperties.spawnEvents[ZDef.spawnProgress].trigger === "level"){
                                ZDef.loadLevel(ZDef.levels[ZDef.currentLevel].levelProperties.spawnEvents[ZDef.spawnProgress].nextLevel);
                            }
                        }

                        ZDef.spawnProgress++;
                    }
                }
            }
        }

        // todo - handle AI of entities
        if(ZDef.laneEntities){
            for(var lane in ZDef.laneEntities){
                for(var entity in ZDef.laneEntities[lane]){
                    // handle collision
                    var closestEnemy = 9999;
                    var closestEnemyID = -1;
                    for(var i in ZDef.laneEnemies[lane]){
                        if(Math.abs(ZDef.laneEnemies[lane][i].position - ZDef.laneEntities[lane][entity].position[0]) < closestEnemy){
                            if(ZDef.laneEnemies[lane][i].position - ZDef.laneEntities[lane][entity].position[0] >= 0){
                                closestEnemyID = i;
                                closestEnemy = Math.abs(ZDef.laneEnemies[lane][i].position - ZDef.laneEntities[lane][entity].position[0]);
                            }
                        }
                    }
                    if(closestEnemyID !== -1){
                        if(ZDef.laneEnemies[lane][closestEnemyID].position - ZDef.laneEntities[lane][entity].position[0] <= ZDef.zombies[ZDef.laneEnemies[lane][closestEnemyID].name].imageSize[1] / 3){
                            ZDef.projectiles[ZDef.laneEntities[lane][entity].name].collideAction(
                                ZDef.laneEntities[lane][entity],
                                "enemy",
                                ZDef.laneEnemies[lane][closestEnemyID]
                            );
                        }
                    }

                    // handle simulation
                    ZDef.projectiles[ZDef.laneEntities[lane][entity].name].tickAction(ZDef.laneEntities[lane][entity]);
                }
            }
        }

        // todo - handle AI of towers
        if(ZDef.playField){
            for(var lane in ZDef.playField.tiles){
                for(var tower in ZDef.playField.tiles[lane]){
                    if(ZDef.playField.tiles[lane][tower]){
                        // handle attack
                        if(!ZDef.towers[ZDef.playField.tiles[lane][tower].name].attackCondition){
                            if(ZDef.playField.tiles[lane][tower].firstAttack){
                                if(moment - ZDef.playField.tiles[lane][tower].lastAttack > ZDef.towers[ZDef.playField.tiles[lane][tower].name].initialAttackSpeed * 1000){
                                    ZDef.createProjectile(
                                        ZDef.towers[ZDef.playField.tiles[lane][tower].name].attackProjectile,
                                        lane,
                                        [
                                            (ZDef.towers[ZDef.playField.tiles[lane][tower].name].attackPosition || [0, 0])[0] + tower * 80 + 40,
                                            (ZDef.towers[ZDef.playField.tiles[lane][tower].name].attackPosition || [0, 0])[1] + lane * 90
                                        ]
                                    );
                                    ZDef.playField.tiles[lane][tower].lastAttack = moment;
                                    ZDef.playField.tiles[lane][tower].firstAttack = false;
                                }
                            }else if(moment - ZDef.playField.tiles[lane][tower].lastAttack > ZDef.towers[ZDef.playField.tiles[lane][tower].name].attackSpeed * 1000){
                                ZDef.createProjectile(
                                    ZDef.towers[ZDef.playField.tiles[lane][tower].name].attackProjectile,
                                    lane,
                                    [
                                        (ZDef.towers[ZDef.playField.tiles[lane][tower].name].attackPosition || [0, 0])[0] + tower * 80 + 40,
                                        (ZDef.towers[ZDef.playField.tiles[lane][tower].name].attackPosition || [0, 0])[1] + lane * 90
                                    ]
                                );
                                ZDef.playField.tiles[lane][tower].lastAttack = moment;
                            }
                        }else if(ZDef.towers[ZDef.playField.tiles[lane][tower].name].attackCondition === "enemy"){
                            if(ZDef.laneEnemies[lane].length > 0){
                                if(ZDef.playField.tiles[lane][tower].firstAttack){
                                    if(moment - ZDef.playField.tiles[lane][tower].lastAttack > ZDef.towers[ZDef.playField.tiles[lane][tower].name].initialAttackSpeed * 1000){
                                        ZDef.createProjectile(
                                            ZDef.towers[ZDef.playField.tiles[lane][tower].name].attackProjectile,
                                            lane,
                                            [
                                                (ZDef.towers[ZDef.playField.tiles[lane][tower].name].attackPosition || [0, 0])[0] + tower * 80 + 40,
                                                (ZDef.towers[ZDef.playField.tiles[lane][tower].name].attackPosition || [0, 0])[1] + lane * 90
                                            ]
                                        );
                                        ZDef.playField.tiles[lane][tower].lastAttack = moment;
                                        ZDef.playField.tiles[lane][tower].firstAttack = false;
                                    }
                                }else if(moment - ZDef.playField.tiles[lane][tower].lastAttack > ZDef.towers[ZDef.playField.tiles[lane][tower].name].attackSpeed * 1000){
                                    ZDef.createProjectile(
                                        ZDef.towers[ZDef.playField.tiles[lane][tower].name].attackProjectile,
                                        lane,
                                        [
                                            (ZDef.towers[ZDef.playField.tiles[lane][tower].name].attackPosition || [0, 0])[0] + tower * 80 + 40,
                                            (ZDef.towers[ZDef.playField.tiles[lane][tower].name].attackPosition || [0, 0])[1] + lane * 90
                                        ]
                                    );
                                    ZDef.playField.tiles[lane][tower].lastAttack = moment;
                                }
                            }
                        }
                    }
                }
            }
        }

        // HANDLE AI OF ZOMBIES
        if(ZDef.laneEnemies){
            for(var lane in ZDef.laneEnemies){
                for(var zombie in ZDef.laneEnemies[lane]){
                    if(!ZDef.laneEnemies[lane][zombie].destroy){
                        // wear off effects
                        if(ZDef.laneEnemies[lane][zombie].speedModifierTime){
                            if(moment - ZDef.laneEnemies[lane][zombie].speedModifierTime > 7000){
                                ZDef.laneEnemies[lane][zombie].speedModifierTime = null;
                                ZDef.laneEnemies[lane][zombie].speedModifier = 1;
                            }
                        }

                        // HANDLE MOVEMENT
                        var canMove = 1;
                        var occupiedTile = Math.floor((ZDef.laneEnemies[lane][zombie].position - 40) / 80);
                        if(occupiedTile < ZDef.levels[ZDef.currentLevel].boardProperties.width){
                            if(ZDef.playField.tiles[lane][occupiedTile]){
                                canMove = 0;
                            }
                        }

                        // move zombie
                        if(canMove && !ZDef.freezeZombies){
                            ZDef.laneEnemies[lane][zombie].position -= ZDef.timeAdjust * ZDef.zombies[ZDef.laneEnemies[lane][zombie].name].speed * ZDef.laneEnemies[lane][zombie].speedModifier;
                        }

                        // todo - handle electric wire
                        if(ZDef.laneEnemies[lane][zombie].position < 60){
                            if(ZDef.playField.shockFences[lane]){
                                for(var i in ZDef.laneEnemies[lane]){
                                    if(ZDef.laneEnemies[lane][i].position < 200){
                                        ZDef.laneEnemies[lane][i].destroy = true;
                                    }
                                }
                                ZDef.playField.shockFences[lane] = 0;
                            }
                        }

                        // HANDLE GAME OVER EVENT
                        if(ZDef.laneEnemies[lane][zombie].position < -40){
                            // todo - make this actually end the game and properly destroy the zombie
                            ZDef.loseLevel();
                            ZDef.laneEnemies[lane].splice(zombie, 1);
                        }

                        // HANDLE ATTACK
                        if(!canMove && !ZDef.freezeZombies){
                            if(ZDef.playField.tiles[lane][occupiedTile]){
                                if(moment - ZDef.laneEnemies[lane][zombie].lastAttack > ZDef.zombies[ZDef.laneEnemies[lane][zombie].name].attackSpeed * 1000 / ZDef.laneEnemies[lane][zombie].speedModifier){
                                    ZDef.towers[ZDef.playField.tiles[lane][occupiedTile].name].damageAction(
                                        ZDef.playField.tiles[lane][occupiedTile],
                                        ZDef.zombies[ZDef.laneEnemies[lane][zombie].name].damage,
                                        ZDef.zombies[ZDef.laneEnemies[lane][zombie].name].attackType
                                    );
                                    ZDef.laneEnemies[lane][zombie].lastAttack = moment;
                                }
                            }
                        }
                    }
                }
            }
        }
        
        // todo - handle AI of debris

        // destroy all objects marked destroyed
        if(ZDef.currentLevel.indexOf("game") === 0){
            // destroy marked towers
            for(var i in ZDef.playField.tiles){
                for(var j in ZDef.playField.tiles[i]){
                    if(ZDef.playField.tiles[i][j]){
                        if(ZDef.playField.tiles[i][j].destroy){
                            ZDef.towers[ZDef.playField.tiles[i][j].name].destroyAction(ZDef.playField.tiles[i][j]);
                            ZDef.playField.tiles[i][j] = null;
                        }
                    }
                }
            }
            // destroy marked projectiles
            for(var i in ZDef.laneEntities){
                for(var j in ZDef.laneEntities[i]){
                    if(ZDef.laneEntities[i][j].destroy){
                        ZDef.projectiles[ZDef.laneEntities[i][j].name].destroyAction(ZDef.laneEntities[i][j]);
                        ZDef.laneEntities[i].splice(j, 1);
                    }
                }
            }
            // destroy marked zombies
            for(var i in ZDef.laneEnemies){
                for(var j in ZDef.laneEnemies[i]){
                    if(ZDef.laneEnemies[i][j].destroy){
                        ZDef.zombies[ZDef.laneEnemies[i][j].name].destroyAction(ZDef.laneEnemies[i][j]);
                        ZDef.laneEnemies[i].splice(j, 1);
                    }
                }
            }
        }

        // CLEAR CANVAS
        if(ZDef.canvas){
            ZDef.ctx.clearRect(0, 0, 760, 540);
        }

        // DRAW ALL SHOCK FENCES
        if(ZDef.currentLevel.indexOf("game") === 0){
            for(var i in ZDef.playField.shockFences){
                if(ZDef.playField.shockFences[i]){
                    ZDef.ctx.drawImage(
                        ZDef.towers["shockFence"].image,
                        0,
                        i * 90
                    );
                }
            }
        }

        // DRAW ALL TURRETS
        if(ZDef.currentLevel.indexOf("game") === 0){
            for(var i in ZDef.playField.tiles){
                for(var j in ZDef.playField.tiles[i]){
                    if(ZDef.playField.tiles[i][j]){
                        ZDef.ctx.drawImage(
                            ZDef.towers[ZDef.playField.tiles[i][j].name].image,
                            j * 80 + 80 - ZDef.towers[ZDef.playField.tiles[i][j].name].imageCenter[0],
                            i * 90 + 45 - ZDef.towers[ZDef.playField.tiles[i][j].name].imageCenter[1]
                        );
                    }
                }
            }
        }

        // DRAW ALL DEBRIS

        // DRAW PLACEMENT PREVIEW
        if(ZDef.currentTool){
            if(ZDef.mousePosition[0] >= 40){
                var gamePreviewCoords = [
                    Math.floor((ZDef.mousePosition[0] - 40) / 80),
                    Math.floor(ZDef.mousePosition[1] / 90)
                ];

                var spaceOccupied = false;
                if(ZDef.playField.tiles[gamePreviewCoords[1]][gamePreviewCoords[0]]){
                    spaceOccupied = true;
                }
                if(ZDef.currentTool === "erase"){
                    if(spaceOccupied){
                        ZDef.ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
                        ZDef.ctx.fillRect(
                            gamePreviewCoords[0] * 80 + 40,
                            gamePreviewCoords[1] * 90,
                            80,
                            90
                        );
                    }
                }else{
                    if(spaceOccupied){
                        ZDef.ctx.fillStyle = "rgba(255, 255, 0, 0.5)";
                        ZDef.ctx.fillRect(
                            gamePreviewCoords[0] * 80 + 40,
                            gamePreviewCoords[1] * 90,
                            80,
                            90
                        );
                    }else{
                        ZDef.ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
                        ZDef.ctx.fillRect(
                            gamePreviewCoords[0] * 80 + 40,
                            gamePreviewCoords[1] * 90,
                            80,
                            90
                        );
                        ZDef.ctx.drawImage(
                            ZDef.towers[ZDef.currentTower].image,
                            gamePreviewCoords[0] * 80 + 80 - ZDef.towers[ZDef.currentTower].imageCenter[0],
                            gamePreviewCoords[1] * 90 + 45 - ZDef.towers[ZDef.currentTower].imageCenter[1],
                        );
                    }
                }
            }
        }
        
        // DRAW ALL ZOMBIES
        if(ZDef.canvas){
            if(ZDef.laneEnemies){
                for(var lane in ZDef.laneEnemies){
                    for(var zombie in ZDef.laneEnemies[lane]){
                        if(ZDef.zombies[ZDef.laneEnemies[lane][zombie].name].image){
                            ZDef.ctx.drawImage(
                                ZDef.zombies[ZDef.laneEnemies[lane][zombie].name].image,
                                ZDef.laneEnemies[lane][zombie].position - ZDef.zombies[ZDef.laneEnemies[lane][zombie].name].imageCenter[0],
                                lane * 90 + 45 - ZDef.zombies[ZDef.laneEnemies[lane][zombie].name].imageCenter[1]
                            );
                        }
                    }
                }
            }
        }

        // DRAW ALL ENTITIES
        if(ZDef.canvas){
            if(ZDef.laneEntities){
                for(var lane in ZDef.laneEntities){
                    for(var entity in ZDef.laneEntities[lane]){
                        ZDef.ctx.drawImage(
                            ZDef.projectiles[ZDef.laneEntities[lane][entity].name].image,
                            ZDef.laneEntities[lane][entity].position[0] - ZDef.projectiles[ZDef.laneEntities[lane][entity].name].imageCenter[0],
                            ZDef.laneEntities[lane][entity].position[1] - ZDef.projectiles[ZDef.laneEntities[lane][entity].name].imageCenter[1],
                            ZDef.projectiles[ZDef.laneEntities[lane][entity].name].imageSize[0],
                            ZDef.projectiles[ZDef.laneEntities[lane][entity].name].imageSize[1]
                        );
                        if(ZDef.projectiles[ZDef.laneEntities[lane][entity].name].clickable){
                            if(
                                Math.sqrt(
                                    Math.pow(ZDef.mousePosition[0] - ZDef.laneEntities[lane][entity].position[0], 2) +
                                    Math.pow(ZDef.mousePosition[1] - ZDef.laneEntities[lane][entity].position[1], 2)
                                ) < ZDef.projectiles[ZDef.laneEntities[lane][entity].name].imageSize[0] / 2
                            ){
                                displayCursor = "pointer";
                            }
                        }
                    }
                }
            }
        }

        // DRAW ALL TEXT
        if(ZDef.currentLevel.indexOf("game") === 0){
            if(ZDef.levels[ZDef.currentLevel].levelProperties.spawnEvents[ZDef.spawnProgress - 1].bossWave === 1 && moment - ZDef.lastSpawn < 2000){
                ZDef.ctx.font = "48px sans-serif";
                ZDef.ctx.fillStyle = "#AA0000";
                ZDef.ctx.fillText("BOSS WAVE", 200, 200);
            }
        }

        // DRAW ANY NEW SETTLED DEBRIS ON DEBRIS CANVAS

        // set cursor and power counter
        if(getId("powerCounter")){
            ZDef.playFieldElement.style.cursor = displayCursor;
            getId("powerCounter").innerHTML = ZDef.userPower;
        }

        // DISPLAY DEBUG INFO
        if(ZDef.debugElement){
            if(ZDef.currentLevel.indexOf("game") === 0){
                ZDef.debugElement.innerHTML = ZDef.spawnProgress + " / " + ZDef.levels[ZDef.currentLevel].levelProperties.spawnEvents.length;
            }
        }
    },

    mousePosition: [0, 0],
    boardPosition: [NaN, NaN],
    currentTower: null,
    currentTool: null,
    placePreview: (newTower, activeTool) => {
        if(ZDef.currentTool){
            ZDef.currentTower = null;
            ZDef.currentTool = null;
        }else{
            if(ZDef.userPower >= ZDef.tools[activeTool].cost){
                ZDef.currentTower = newTower;
                ZDef.currentTool = activeTool;
            }
        }
    },

    placeTower: (newTower, position, activeTool) => {
        ZDef.playField.tiles[position[1]][position[0]] = {
            name: newTower,
            health: ZDef.towers[newTower].health,
            lastAttack: performance.now(),
            firstAttack: true
        }
        // to-do: if tool was specified, activate cooldown
        ZDef.userPower -= ZDef.tools[activeTool].cost;
    },

    createProjectile: (newProjectile, lane, newPosition) => {
        ZDef.laneEntities[lane].push({
            name: newProjectile,
            position: newPosition,
            createTime: performance.now()
        });
    },

    gameClicked: () => {
        for(var i in ZDef.laneEntities){
            for(var j in ZDef.laneEntities[i]){
                if(ZDef.projectiles[ZDef.laneEntities[i][j].name].clickable){
                    if(
                        Math.sqrt(
                            Math.pow(ZDef.mousePosition[0] - ZDef.laneEntities[i][j].position[0], 2) +
                            Math.pow(ZDef.mousePosition[1] - ZDef.laneEntities[i][j].position[1], 2)
                        ) < ZDef.projectiles[ZDef.laneEntities[i][j].name].imageSize[0] / 2
                    ){
                        ZDef.projectiles[ZDef.laneEntities[i][j].name].clickAction(ZDef.laneEntities[i][j]);
                    }
                }
            }
        }
        if(ZDef.currentTool){
            if(ZDef.mousePosition[0] > 40){
                var gameCoords = [
                    Math.floor((ZDef.mousePosition[0] - 40) / 80),
                    Math.floor(ZDef.mousePosition[1] / 90)
                ];
                if(ZDef.currentTool === "erase"){
                    if(ZDef.playField.tiles[gameCoords[1]][gameCoords[0]]){
                        ZDef.playField.tiles[gameCoords[1]][gameCoords[0]] = null;
                        ZDef.currentTool = null;
                    }
                }else if(!ZDef.playField.tiles[gameCoords[1]][gameCoords[0]]){
                    ZDef.placeTower(ZDef.currentTower, gameCoords, ZDef.currentTool);
                    ZDef.currentTool = null;
                    ZDef.currentTower = null;
                }
            }
        }
    },

    hoveredGameboard: (event) => {
        if(
            event.clientX >= ZDef.boardPosition[0] &&
            event.clientX < ZDef.boardPosition[0] + 760 &&
            event.clientY >= ZDef.boardPosition[1] &&
            event.clientY < ZDef.boardPosition[1] + 540
        ){
            ZDef.mousePosition = [event.clientX - ZDef.boardPosition[0], event.clientY - ZDef.boardPosition[1]];
        }else{
            ZDef.mousePosition = [0, 0];
        }
    },

    clickedGameboard: (event) => {
        if(
            event.clientX >= ZDef.boardPosition[0] &&
            event.clientX < ZDef.boardPosition[0] + 760 &&
            event.clientY >= ZDef.boardPosition[1] &&
            event.clientY < ZDef.boardPosition[1] + 540
        ){
            ZDef.mousePosition = [event.clientX - ZDef.boardPosition[0], event.clientY - ZDef.boardPosition[1]];
            ZDef.gameClicked();
        }else{
            ZDef.mousePosition = [0, 0];
        }
    },

    gameBoard: getId("gameBoard"),
    debugElement: null,
    playField: null,
    laneFriendlies: null,
    laneEntities: null,
    laneEnemies: null,
    playFieldElement: null,
    canvas: null,
    ctx: null,
    canvasDebris: null,
    ctxDebris: null,
    currentLevel: "menu",

    buildMenu: (targetElement, menuName) => {
        var newMenu = document.createElement("div");
        newMenu.classList.add("menu");
        
        var newTitle = document.createElement("p");
        newTitle.classList.add("menuTitle");
        newTitle.innerHTML = ZDef.levels[menuName].menu.title;
        newMenu.appendChild(newTitle);

        if(ZDef.levels[menuName].menu.buildScript){
            ZDef.levels[menuName].menu.buildScript(newMenu);
        }else{
            for(var menuButton in ZDef.levels[menuName].menu.options){
                var newButton = document.createElement("div");
                newButton.classList.add("menuButton");
                newButton.innerHTML = ZDef.levels[menuName].menu.options[menuButton].name;
                newButton.addEventListener("click", ZDef.levels[menuName].menu.options[menuButton].action);
                newMenu.appendChild(newButton);
            }
        }

        targetElement.appendChild(newMenu);
    },

    freezeZombies: 0,

    noComplete: 0,

    winLevel: (nextLevel) => {
        if(!ZDef.noComplete){
            clearElement(getId("highMenu"));
            clearElement(getId("lowMenu"));

            ZDef.freezeZombies = 1;

            var tempYouWin = document.createElement("div");
            tempYouWin.classList.add("tool");
            tempYouWin.style.cursor = "default";
            tempYouWin.innerHTML = "<br>You win!";

            var tempGoMenu = document.createElement("div");
            tempGoMenu.classList.add("tool");
            tempGoMenu.innerHTML = "<br>Main Menu";
            tempGoMenu.setAttribute("onClick", 'ZDef.loadLevel("mainMenu")');

            var tempGoNext = document.createElement("div");
            tempGoNext.classList.add("tool");
            tempGoNext.innerHTML = "<br>Next Level";
            tempGoNext.setAttribute("onClick", 'ZDef.loadLevel("' + nextLevel + '")');

            getId("lowMenu").appendChild(tempYouWin);
            getId("lowMenu").appendChild(tempGoMenu);
            getId("lowMenu").appendChild(tempGoNext);
            ZDef.noComplete = 1;
        }
    },

    loseLevel: () => {
        if(!ZDef.noComplete){
            clearElement(getId("highMenu"));
            clearElement(getId("lowMenu"));
            
            ZDef.currentTool = null;
            ZDef.currentTower = null;

            var tempYouWin = document.createElement("div");
            tempYouWin.classList.add("tool");
            tempYouWin.style.cursor = "default";
            tempYouWin.innerHTML = "<br>You died!";

            var tempGoMenu = document.createElement("div");
            tempGoMenu.classList.add("tool");
            tempGoMenu.innerHTML = "<br>Main Menu";
            tempGoMenu.setAttribute("onClick", 'ZDef.loadLevel("mainMenu")');

            var tempGoNext = document.createElement("div");
            tempGoNext.classList.add("tool");
            tempGoNext.innerHTML = "<br>Try Again";
            tempGoNext.setAttribute("onClick", 'ZDef.loadLevel("' + ZDef.currentLevel + '")');

            getId("lowMenu").appendChild(tempYouWin);
            getId("lowMenu").appendChild(tempGoMenu);
            getId("lowMenu").appendChild(tempGoNext);
            ZDef.noComplete = 1;
        }
    },

    buildHighMenu: (levelName) => {
        var tempMenu = document.createElement("div");
        tempMenu.classList.add("highMenu");
        tempMenu.id = "highMenu";

        for(var i in ZDef.levels[levelName].levelProperties.availableTools){
            var tempTool = document.createElement("div");
            tempTool.classList.add("tool");
            tempTool.style.backgroundImage = 'url("' + ZDef.tools[ZDef.levels[levelName].levelProperties.availableTools[i]].image + '")';
            tempTool.innerHTML = '<div class="toolName">' + ZDef.tools[ZDef.levels[levelName].levelProperties.availableTools[i]].name + '</div><div class="toolCost">' + (ZDef.tools[ZDef.levels[levelName].levelProperties.availableTools[i]].cost || '&nbsp;') + '</div>';
            tempTool.addEventListener("click", ZDef.tools[ZDef.levels[levelName].levelProperties.availableTools[i]].clickAction);
            tempMenu.appendChild(tempTool);
        }

        ZDef.gameBoard.appendChild(tempMenu);
    },

    buildLowMenu: (levelName) => {
        var tempMenu = document.createElement("div");
        tempMenu.classList.add("lowMenu");
        tempMenu.id = "lowMenu";

        var tempPowerCounter = document.createElement("div");
        tempPowerCounter.classList.add("tool");
        tempPowerCounter.style.cursor = "default";
        tempPowerCounter.innerHTML = '<br>Power: <span id="powerCounter">' + ZDef.levels[levelName].levelProperties.startingPower + '</span>';

        tempMenu.appendChild(tempPowerCounter);

        ZDef.gameBoard.appendChild(tempMenu);
    },

    buildBoard: (levelName) => {
        var tempProps = ZDef.levels[levelName].boardProperties
        ZDef.playField = {
            tiles: new Array(tempProps.height),
            shockFences: new Array(tempProps.height).fill(0)
        };
        for(var i = 0; i < tempProps.height; i++){
            ZDef.playField.tiles[i] = [];
            for(var j = 0; j < tempProps.width; j++){
                ZDef.playField.tiles[i].push(null);
            }
        }
        ZDef.laneFriendlies = new Array(tempProps.height);
        for(var i = 0; i < ZDef.laneFriendlies.length; i++){
            ZDef.laneFriendlies[i] = [];
        }
        ZDef.laneEntities = new Array(tempProps.height);
        for(var i = 0; i < ZDef.laneEntities.length; i++){
            ZDef.laneEntities[i] = [];
        }
        ZDef.laneEnemies = new Array(tempProps.height);
        for(var i = 0; i < ZDef.laneEnemies.length; i++){
            ZDef.laneEnemies[i] = [];
        }
        if(tempProps.shockFences){
            ZDef.playField.shockFences = ZDef.playField.shockFences.fill(1);
        }
        for(var i in ZDef.playField.tiles){
            ZDef.playField.tiles[i] = new Array(tempProps.width).fill(null);
        }

        ZDef.playFieldElement = document.createElement("div");
        ZDef.playFieldElement.classList.add("playField");
        
        for(var i = 0; i < tempProps.height; i++){
            var tileRow = document.createElement("div");
            tileRow.classList.add("tileRow");
            tileRow.id = "r" + i;

            var shockFenceLayer = document.createElement("div");
            shockFenceLayer.classList.add("shockFence");
            tileRow.appendChild(shockFenceLayer);

            for(var j = 0; j < tempProps.width; j++){
                var tileColumn = document.createElement("div");
                tileColumn.classList.add("tile");
                tileColumn.id = "r" + i + "c" + j;
                tileRow.appendChild(tileColumn);
            }

            ZDef.playFieldElement.appendChild(tileRow);
        }

        ZDef.canvas = document.createElement("canvas");
        ZDef.canvas.classList.add("effectsCanvas");
        ZDef.canvas.width = 760;
        ZDef.canvas.height = 540;
        ZDef.playFieldElement.appendChild(ZDef.canvas);

        ZDef.gameBoard.appendChild(ZDef.playFieldElement);

        ZDef.ctx = ZDef.canvas.getContext("2d");

        ZDef.playFieldElement.addEventListener("click", ZDef.gameClicked);
    },

    loadLevel: (levelName) => {
        console.log("Loading level " + levelName);

        ZDef.currentLevel = levelName;
        ZDef.playField = null;
        ZDef.laneFriendlies = null;
        ZDef.laneEntities = null;
        ZDef.laneEnemies = null;
        ZDef.userPower = 0;
        ZDef.currentTool = null;
        ZDef.currentTower = null;
        ZDef.noComplete = 0;
        ZDef.freezeZombies = 0;
        ZDef.nextSpawnDelay = 0;
        ZDef.spawnProgress = 0;

        document.body.style.backgroundImage = "";
        document.body.style.backgroundColor = "";
        if(ZDef.levels[levelName]){
            clearElement(ZDef.gameBoard);

            ZDef.debugElement = document.createElement("div");
            ZDef.debugElement.style.position = "absolute";
            ZDef.debugElement.style.left = "0";
            ZDef.debugElement.style.top = "-16px";
            ZDef.gameBoard.appendChild(ZDef.debugElement);

            ZDef.spawnProgress = 0;
            ZDef.nextSpawnDelay = 0;
            if(ZDef.levels[levelName].levelProperties){
                if(ZDef.levels[levelName].levelProperties.startingPower){
                    ZDef.userPower = ZDef.levels[levelName].levelProperties.startingPower;
                }
            }
            
            if(ZDef.levels[levelName].levelType === "menu"){
                ZDef.buildMenu(ZDef.gameBoard, levelName);
            }else if(ZDef.levels[levelName].levelType === "normal"){
                if(ZDef.levels[levelName].backgroundImage){
                    document.body.style.backgroundImage = 'url("' + ZDef.levels[levelName].backgroundImage + '")';
                }
                if(ZDef.levels[levelName].backgroundColor){
                    document.body.style.backgroundColor = ZDef.levels[levelName].backgroundColor;
                }
                // to-do: build level UI that goes above playfield
                ZDef.buildHighMenu(levelName);
                ZDef.buildBoard(levelName);
                // to-do: build level UI that goes below playfield
                ZDef.buildLowMenu(levelName);

                // to-do: prepare UI for interaction

                // to-do: launch level logic (waves, etc)
            }
        }else{
            alert("Error - tried to load level that does not exist: " + levelName);
        }
    }
};

for(var i in ZDef.towers){
    if(ZDef.towers[i].image){
        var imageSrc = ZDef.towers[i].image;
        ZDef.towers[i].image = new Image(ZDef.towers[i].imageSize[0], ZDef.towers[i].imageSize[1]);
        ZDef.towers[i].image.src = imageSrc;
    }
}

for(var i in ZDef.projectiles){
    if(ZDef.projectiles[i].image){
        var imageSrc = ZDef.projectiles[i].image;
        ZDef.projectiles[i].image = new Image(ZDef.projectiles[i].imageSize[0], ZDef.projectiles[i].imageSize[1]);
        ZDef.projectiles[i].image.src = imageSrc;
    }
}

for(var i in ZDef.zombies){
    if(ZDef.zombies[i].image){
        var imageSrc = ZDef.zombies[i].image;
        ZDef.zombies[i].image = new Image(ZDef.zombies[i].imageSize[0], ZDef.zombies[i].imageSize[1]);
        ZDef.zombies[i].image.src = imageSrc;
    }
}

document.body.addEventListener("mousemove", ZDef.hoveredGameboard);

ZDef.loadLevel("mainMenu");
ZDef.gameTick();