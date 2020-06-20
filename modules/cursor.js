import { gsap } from 'gsap/all'
import { EventEmitter } from 'events'
export default class Cursor extends EventEmitter {
    constructor(el) {
        super()
        this.DOM = { el: el }
        this.DOM.el.style.opacity = 0
        this.DOM.circleInner = this.DOM.el.querySelector('.cursor__inner')

        this.filterId = '#filter-1'
        this.DOM.feDisplacementMap = document.querySelector(
            `${this.filterId} > feDisplacementMap`
        )
        this.primitiveValues = { scale: 0 }

        this.mouse = { x: 0, y: 0 }
        window.addEventListener('mousemove', (ev) => {
            this.mouse = this.getMousePos(ev)
        })

        this.createTimeline()

        this.bounds = this.DOM.el.getBoundingClientRect()

        this.renderedStyles = {
            tx: { previous: 0, current: 0, amt: 0.14 },
            ty: { previous: 0, current: 0, amt: 0.14 },
            radius: { previous: 50, current: 50, amt: 0.14 }
        }

        this.listen()

        this.onMouseMoveEv = () => {
            this.renderedStyles.tx.previous = this.renderedStyles.tx.current =
                this.mouse.x - this.bounds.width / 2
            this.renderedStyles.ty.previous = this.renderedStyles.ty.previous =
                this.mouse.y - this.bounds.height / 2
            gsap.to(this.DOM.el, {
                duration: 1.2,
                ease: 'Power3.easeOut',
                opacity: 1
            })
            requestAnimationFrame(() => this.render())
            window.removeEventListener('mousemove', this.onMouseMoveEv)
        }
        window.addEventListener('mousemove', this.onMouseMoveEv)
    }
    getMousePos = (e) => {
        let posx = 0
        let posy = 0
        if (!e) e = window.event
        if (e.clientX || e.clientY) {
            posx = e.clientX
            posy = e.clientY
        }
        return { x: posx, y: posy }
    }
    lerp = (a, b, n) => (1 - n) * a + n * b
    render() {
        this.renderedStyles['tx'].current = this.mouse.x - this.bounds.width / 2
        this.renderedStyles['ty'].current =
            this.mouse.y - this.bounds.height / 2

        for (const key in this.renderedStyles) {
            this.renderedStyles[key].previous = this.lerp(
                this.renderedStyles[key].previous,
                this.renderedStyles[key].current,
                this.renderedStyles[key].amt
            )
        }

        this.DOM.el.style.transform = `translateX(${this.renderedStyles['tx'].previous}px) translateY(${this.renderedStyles['ty'].previous}px)`
        this.DOM.circleInner.setAttribute(
            'r',
            this.renderedStyles['radius'].previous
        )

        requestAnimationFrame(() => this.render())
    }
    createTimeline() {
        // init timeline
        this.tl = gsap
            .timeline({
                paused: true,
                onStart: () => {
                    this.DOM.circleInner.style.filter = `url(${this.filterId}`
                },
                onUpdate: () => {
                    this.DOM.feDisplacementMap.scale.baseVal = this.primitiveValues.scale
                },
                onComplete: () => {
                    this.DOM.circleInner.style.filter = 'none'
                }
            })
            .to(this.primitiveValues, {
                duration: 0.2,
                ease: 'Expo.easeOut',
                startAt: { scale: 0 },
                scale: 60
            })
            .to(this.primitiveValues, {
                duration: 0.6,
                ease: 'Power3.easeOut',
                scale: 0
            })
    }
    reduce() {
        if (this.renderedStyles['radius'].current !== 0) {
            this.renderedStyles['radius'].current = 0
            this.tl.progress(1).kill()
        }
    }
    increase() {
        if (this.renderedStyles['radius'].current !== 40) {
            this.renderedStyles['radius'].current = 40
            this.tl.restart()
        }
    }
    enter() {
        this.renderedStyles['radius'].current = 80
        this.tl.restart()
    }
    leave() {
        this.renderedStyles['radius'].current = 40
        this.tl.progress(1).kill()
    }
    listen() {
        this.on('enter', () => this.enter())
        this.on('leave', () => this.leave())
        this.on('increase', () => this.increase())
        this.on('reduce', () => this.reduce())
        this.on('increase2', () => this.increase2())
        this.on('reduce2', () => this.reduce2())
    }
}
