import { TimerStatus } from "./enum.js";
import { TimeDisplay } from "./TimeDisplay.js";

class Timer {
    constructor() {
        this.lastLapTotal = 0;

        this.status = TimerStatus.STOPPED;
        this.started = false;
        this.timeInterval = null;
        this.time = new TimeDisplay();
    }

    display(element) {
        element.innerText = this.time.format();
    }

    updateTimer() {
        this.time.total++;
        this.time.seconds++;
        if(this.time.seconds === 60) {
            this.time.seconds = 0;
            this.time.minutes++;
        }
        if(this.time.minutes === 60) {
            this.time.minutes = 0;
            this.time.hours++;
        }
    }

    tick(element) {
        this.updateTimer();
        this.display(element);
    }

    start(element) {
        this.status = TimerStatus.RUNNING;
        this.timeInterval = setInterval(() => this.tick(element), 1000);
    }

    pause() {
        this.status = TimerStatus.PAUSED;
        clearInterval(this.timeInterval);
    }

    reset() {
        this.time.reset();
        this.lastLapTotal = 0;
        return this;
    }

    createLap(element) {
        const totalTime = new TimeDisplay(this.time.values);

        const totalInterval = totalTime.total - this.lastLapTotal;
        console.log(totalTime.total, this.lastLapTotal);


        const hours = Math.floor(totalInterval / 3600);
        const minutes = Math.floor(totalInterval / 60);
        const seconds =  totalInterval % 60;

        const lapTime = new TimeDisplay({total: totalInterval, hours, minutes, seconds });
        this.lastLapTotal = totalTime.total;

        element.innerHTML += `
        <div class="lap__row">
            <div>${lapTime.format()}</div>
            <div>${totalTime.format()}</div>
        </div>
        `;
    }
}

export default Timer;