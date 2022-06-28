import React from 'react';
import {useEffect} from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from '../Actions';

class GoogleAuth2 extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '1030502307448-nmhaj2n273ahcd1ededol73i83arfotc.apps.googleusercontent.com',
                scope: 'email',
                plugin_name: "streams"
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        }else{
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        console.log("czy zalogowano: " + this.props.isSignedIn +" " + this.props.userId)
        if (this.props.isSignedIn === null) {
            return null
        } else if (this.props.isSignedIn) {
            return (<button onClick={this.onSignOutClick} className="ui red google button">
                <i className="google icon"></i>
                Sign Out
            </button>)
        } else {
            return (<button onClick={this.onSignInClick} className="ui red google button">
                <i className="google icon"></i>
                Sign In with Google
            </button>)
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    }
}


// class GoogleAuth2 extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.handleCredentialResponse = this.handleCredentialResponse.bind(this)
//     }
//
//     handleCredentialResponse(response){
//         console.log("Encoded JWT ID token: " + response.credential);
//     }
//
//
//     componentDidMount() {
//         //this.handleCredentialResponse("test")
//         window.onload = () => {
//            console.log(this.handleCredentialResponse)
//            window.google.accounts.id.initialize({
//                 client_id: '1030502307448-nmhaj2n273ahcd1ededol73i83arfotc.apps.googleusercontent.com',
//                 callback: this.handleCredentialResponse
//
//             })
//             window.google.accounts.id.prompt();
//
//         }
//     }
//
//
//     render() {
//         return <div>GoogleAuth</div>
//     }
// }
//
//
// export default GoogleAuth2;

// const GoogleAuth2 = ()=>{
//
//     const handleCredentialResponse = (response) => {
//         console.log("Encoded JWT ID token: " + response.credential);
//   }
//
//   useEffect(()=>{
//       window.onload = function () {
//           window.google.accounts.id.initialize({
//               client_id: '1030502307448-nmhaj2n273ahcd1ededol73i83arfotc.apps.googleusercontent.com',
//               callback: handleCredentialResponse
//           });
//           window.google.accounts.id.prompt();
//       };
//   })
//     return(
//         <div>Zaloguj</div>
//     )
//
// }
//
const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn, userId: state.auth.userId};
};
export default connect(mapStateToProps, {signIn, signOut}) (GoogleAuth2);
