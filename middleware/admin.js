export default function({ store, redirect }) {
    if (store.state.me.itemMe.role !== 'administrateur') {
        return redirect('/')
    }
}
