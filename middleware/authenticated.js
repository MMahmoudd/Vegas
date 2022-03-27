export default function({ store, redirect, app }) {
    // console.log('store.state', store.state.login)
    if (!store.state.login.token) {
        return redirect('/login');
    }
}