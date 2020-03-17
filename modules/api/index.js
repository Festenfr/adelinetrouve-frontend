module.exports = function() {
    console.log(this.options.dev)
    if (this.options.dev || this.options._start) {
        this.addServerMiddleware('~/api/')
    }
}
