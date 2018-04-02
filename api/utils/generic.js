module.exports = {
    divideTime: () => {
        let time = []
        time[0] = new Date(new Date().setHours(0, 0, 0, 0))
        time[1] = new Date(new Date().setHours(4, 0, 0, 0))
        time[2] = new Date(new Date().setHours(8, 0, 0, 0))
        time[3] = new Date(new Date().setHours(12, 0, 0, 0))
        time[4] = new Date(new Date().setHours(16, 0, 0, 0))
        time[5] = new Date(new Date().setHours(20, 0, 0, 0))
        time[6] = new Date(new Date().setHours(24, 0, 0, 0))
        return time
    }
}