// Mouse object to handle events
var mouse = {
    init: function() {
        var canvas = document.getElementById("gamecanvas");
        canvas.addEventListener("mousemove",
            mouse.mousemovehandler, false);
        var homeBtn = document.getElementById("prev");
        homeBtn.addEventListener("click", mouse.mouseClickHomeBtnHandler, false);

        var musicBtn = document.getElementById("togglemusic");
        musicBtn.addEventListener("click", mouse.mouseClickSoundBtnHandler, false );

        var reloadBtn = document.getElementById("reload");
        reloadBtn.addEventListener("click", mouse.mouseClickReloadBtnHandler, false);

        var restartBtn = document.getElementById("playcurrentlevel");
        restartBtn.addEventListener("click", mouse.mouseClickRestartLevelBtnHandler, false);

        var playNextLelBtn = document.getElementById("playnextlevel");
        playNextLelBtn.addEventListener("click", mouse.mouseClickNextLevelBtn, false);

        var levelScreenBtn = document.getElementById("returntolevelscreen");
        levelScreenBtn.addEventListener("click", mouse.mouseClickLevelsScreen, false);

        var settingsBtn = document.getElementById("setupBtn");
        settingsBtn.addEventListener("click", mouse.mouseClickSettingScreen, false);

        var returnBtn = document.getElementById("returntostartscreen");
        returnBtn.addEventListener("click", mouse.mouseClickReturnBtnHandler, false);

        var easyLevelBtn = document.getElementById("defaultlevel");
        easyLevelBtn.addEventListener("click", () => { mouse.mouseClickChooselevel(50)}, false);

        var midLevelBtn = document.getElementById("experiencedLevel");
        midLevelBtn.addEventListener("click",() => { mouse.mouseClickChooselevel(40)}, false);

        var hardLevelBtn = document.getElementById("maniaklevel");
        hardLevelBtn.addEventListener("click",() => { mouse.mouseClickChooselevel(15)}, false);

    },
    mousemovehandler: function(event) {
        game.ship.x=event.offsetX-25;
        game.ship.y=event.offsetY-13;
    },

    mouseClickHomeBtnHandler: function() {

        if(!game.isSafari) {
            game.currentLevel.sounds.buttonPress.play();
        }
        game.finish();

        if(!game.isSafari) {
            game.currentLevel.sounds.buttonPress.currentTime = 0;
        }
    },

    mouseClickSoundBtnHandler: function() {
        game.currentLevel.sounds.buttonPress.play();
            let sounds = Object.values(game.currentLevel.sounds);

            for(var sound of sounds) {
                sound.muted = !sound.muted;
            }

        game.currentLevel.sounds.buttonPress.currentTime = 0;
    },

    mouseClickReloadBtnHandler: function() {

        if(!game.isSafari) {
            game.currentLevel.sounds.buttonPress.play();
        }

        game.score = 0;
        document.getElementById("score").innerHTML = "Score: " + game.score;
        // Call game.start() once the assets have loaded
        game.asteroids = [];
        game.fires = [];
        game.explosions = [];
        game.ship = {x:350,y:350,animx:0,animy:0};
        game.Timer = 0;
        game.currentLevel.sounds.buttonPress.currentTime = 0;
    },

    mouseClickRestartLevelBtnHandler: function () {

        if(!game.isSafari) {
            game.currentLevel.sounds.buttonPress.play();
        }

        levels.load(game.currentLevel.number);

        if(!game.isSafari) {
            game.currentLevel.sounds.buttonPress.currentTime = 0;
        }
    },

    mouseClickNextLevelBtn: function() {

        if(!game.isSafari) {
            game.currentLevel.sounds.buttonPress.play();
        }

        var curLevel = game.currentLevel.number;

        if(levels.data.length > (curLevel + 1)) {
            levels.load(curLevel + 1);
        } else {
            levels.load(0);
        }
        if(!game.isSafari) {
            game.currentLevel.sounds.buttonPress.currentTime = 0;

        }

    },

    mouseClickLevelsScreen: function() {

        if(!game.isSafari) {
            game.currentLevel.sounds.buttonPress.play();
        }

        game.hideScreens();
        game.showScreen("levelselectscreen");

        if(!game.isSafari) {
            game.currentLevel.sounds.buttonPress.currentTime = 0;
        }

        var rulesDivLeft = document.getElementById("leftDiv");
        var rulesDivRight = document.getElementById("rightDiv");
        setTimeout(() => {
            rulesDivLeft.classList.add("left");
            rulesDivRight.classList.add("right");

            if(!game.isSafari) {
                var sound = new Audio();
                sound.src = "sounds/sweep.mp3";
                sound.play();
            }
        }, 100);

    },

    mouseClickSettingScreen: function() {

        if(!game.isSafari) {
            var sound = new Audio();
            sound.src = "sounds/buttonPres.mp3";
            sound.play();
        }
        game.hideScreens();
        game.showScreen("setupscreen");

        if(!game.isSafari) {
            sound.currentTime = 0;
        }
    },

    mouseClickChooselevel: function(rate) {

        if(!game.isSafari) {
            var sound = new Audio();
            sound.src = "sounds/buttonPres.mp3";
            sound.play();
        }

        game.complexityControl = rate;

        // Hide Screen
        game.hideScreens();
        // Display the game canvas and score
        game.showScreen("gamestartscreen");

        if(!game.isSafari) {
            sound.currentTime = 0;
        }
    },

    mouseClickReturnBtnHandler: function() {

        if(!game.isSafari) {
            var sound = new Audio();
            sound.src = "sounds/buttonPres.mp3";
            sound.play();
        }

        // Hide Screen
        game.hideScreens();
        // Display the game canvas and score
        game.showScreen("gamestartscreen");

        if(!game.isSafari) {
            sound.currentTime = 0;
        }
    }
};