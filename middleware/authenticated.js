export default function({ store, redirect, app }) {
    // console.log('app.$cookies', app.$cookies.get('token'))
    if (!app.$cookies.get('token')) {
        return redirect('/login');
    }
}
