function checkSpeed(speed) {
    const speedLimit = 70;
    const demeritPointsPer5KmOver = 1;
    const pointsThresholdForSuspension = 12;

    if (speed < speedLimit) {
        console.log("Ok");
    } else {
        const demeritPoints = Math.floor((speed - speedLimit) / 5);

        if (demeritPoints > 0) {
            console.log("Points: " + demeritPoints);

            if (demeritPoints >= pointsThresholdForSuspension) {
                console.log("License suspended");
            }
        } else {
            console.log("Ok");
        }
    }
}

// Example usage:
checkSpeed(180);