<template>
    <div>
        <div class="home">
            Spaces Left: {{ spacesLeft }} capacity: {{ capacity }}
        </div>
        <button @click="increaseCapacity">Increase Capacity</button>
    </div>
</template>

<script>
import { reactive, computed, toRefs } from '@vue/composition-api'
export default {
    setup() {
        const event = reactive({
            capacity: 3,
            attending: ['Tim', 'Bob', 'Joe'],
            spacesLeft: computed(() => {
                return event.capacity - event.attending.length
            })
        })
        function increaseCapacity() {
            event.capacity++
        }
        console.log(event)

        return { ...toRefs(event), increaseCapacity }
    }
}
</script>
