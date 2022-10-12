class TimeDisplay {
    constructor(time) {
        this.total = time?.total ?? 0;

        this.hours = time?.hours ?? 0;
        this.minutes = time?.minutes ?? 0;
        this.seconds = time?.seconds ?? 0;
    }

    format () {
        const formatedHours = String(this.hours).padStart("2", 0);
        const formatedMinutes = String(this.minutes).padStart("2", 0);
        const formatedSeconds = String(this.seconds).padStart("2", 0);
        return `${formatedHours}:${formatedMinutes}:${formatedSeconds}`;
    }

    reset() {
        this.total = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
    }

    get values() {
        return {
            total: this.total,
            hours: this.hours,
            minutes: this.minutes,
            seconds: this.seconds
        }
    }
};

export { TimeDisplay };