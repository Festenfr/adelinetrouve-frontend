<template>
    <div style="position: fixed;">
        <svg class="cursor" width="280" height="280" viewBox="0 0 280 280">
            <defs>
                <filter
                    id="filter-1"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                    filterUnits="objectBoundingBox"
                >
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.02 0.15"
                        numOctaves="3"
                        result="warp"
                    ></feTurbulence>
                    <feDisplacementMap
                        xChannelSelector="R"
                        yChannelSelector="G"
                        scale="0"
                        in="SourceGraphic"
                        in2="warp"
                    ></feDisplacementMap>
                </filter>
            </defs>
            <circle class="cursor__inner" cx="140" cy="140" r="50"></circle>
        </svg>
    </div>
</template>
<style lang="scss">
body {
    --cursor-stroke: #a2564b;
    --cursor-fill: none;
    --cursor-stroke-width: 1px;
}
.cursor {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    opacity: 0;
}
.cursor__inner {
    fill: var(--cursor-fill);
    stroke: var(--cursor-stroke);
    stroke-width: var(--cursor-stroke-width);
    mix-blend-mode: difference;
}
</style>
