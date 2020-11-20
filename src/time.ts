export default class Time {
    public static lastTimestamp: number = performance.now();
    public static deltaTime: number;
    public static fps: number;

    public static calculateDeltaTime(time: number): void {
        if(!Time.lastTimestamp) {
            Time.lastTimestamp = time;
            Time.fps = 0;
            return;
         }

         Time.deltaTime = (time - Time.lastTimestamp)/1000;
         Time.lastTimestamp = time;
         Time.fps = 1/ Time.deltaTime;

        // var delta = (time - this.lastTimestamp) / 1000.0;
        // delta = Math.min(delta, 0.25); // maximum delta of 250 ms
        // this.lastTimestamp = delta;
        // this.fps = 1 / Time.deltaTime;
        // console.log(delta)
    }
}