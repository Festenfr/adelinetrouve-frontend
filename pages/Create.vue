<template>
    <div>
        <p>
            {{ hello }}
        </p>
        <div>
            <input v-model="newContact" type="text" placeholder="Name" />
            <button @click="addContact">Add Contact</button>
            <button @click="sortContacts">Sort Contact</button>
            <transition-group tag="ul" name="slide-up" mode="out-in" appear>
                <li v-for="contact in contacts" :key="contact">
                    {{ contact }}
                </li>
            </transition-group>
        </div>
        <div>
            <nuxt-link to="/">
                Index
            </nuxt-link>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            hello: 'Bonjour à vous',
            newContact: '',
            contacts: ['Beau', 'cindy', 'Alice']
        }
    },
    methods: {
        addContact() {
            this.contacts.push(this.newContact)
            this.newContact = ''
        },
        sortContacts() {
            this.contacts.sort()
            this.newContact = ''
        }
    }
}
</script>
