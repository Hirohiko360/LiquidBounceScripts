/// api_version=2
var script = registerScript({
    name: "GradualTimer",
    version: "1.0",
    authors: ["chocopie"]
});

var ticks = 0;
var currentTimer = 1;

script.registerModule({
    name: "GradualTimer",
    category: "Misc", 
    description: "sigma jello",
    settings: {
        startTimer: Setting.float({
            name: "StartTimer",
            min: 0.1,
            max: 10,
            default: 1.85
		}),
		endTimer: Setting.float({
            name: "EndTimer",
            min: 0.1,
            max: 10,
            default: 1.0
		}),
        speed: Setting.integer({
            name: "Speed",
            min: 1,
            max: 20,
            default: 1
		}),
		delay: Setting.integer({
            name: "Delay",
            min: 1,
            max: 20,
            default: 3
		})
	}
}, function (GradualTimer) {
    GradualTimer.on("enable", function() {
        currentTimer = GradualTimer.settings.startTimer.get(); 
        ticks = 0;
        mc.thePlayer.motionY = 0.09;
    });
    GradualTimer.on("update", function() {
        ticks++;
        mc.timer.timerSpeed = currentTimer;
        if(currentTimer > GradualTimer.settings.endTimer.get() && ticks == GradualTimer.settings.delay.get()) {
            currentTimer -= 0.05 * GradualTimer.settings.speed.get()
            ticks = 0;
        }
    });
    GradualTimer.on("disable", function() {
        mc.timer.timerSpeed = 1;
    });
});
