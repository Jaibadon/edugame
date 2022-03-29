document.addEventListener("DOMContent Loaded", event => {

    const app = firebas.app();  I
    console.log(app)
});



function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)

            .then(result => {
                const user = result.user;
                doecument.write( 'hello ${user.displayName} ');
})
};