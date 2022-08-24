import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../Actions";
import jwt_decode from "jwt-decode";
import { Button, Badge, Grid, Avatar } from "@mantine/core";

class GoogleAuth2 extends React.Component {
  componentDidMount() {
    // window.gapi.load('client:auth2', () => {
    //     window.gapi.client.init({
    //         clientId: '1030502307448-nmhaj2n273ahcd1ededol73i83arfotc.apps.googleusercontent.com',
    //         scope: 'email',
    //         plugin_name: "streams"
    //     }).then(() => {
    //         this.auth = window.gapi.auth2.getAuthInstance();
    //         this.onAuthChange(this.auth.isSignedIn.get());
    //         this.auth.isSignedIn.listen(this.onAuthChange);
    //     });
    // });
    window.google.accounts.id.initialize({
      client_id:
        "1030502307448-nmhaj2n273ahcd1ededol73i83arfotc.apps.googleusercontent.com",
      callback: this.handleCallbackResponse,
    });
    if (!this.props.UserId)
      window.google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {
          theme: "outline",
          size: "large",
          type: "standard",
        }
      );
  }

  handleCallbackResponse = (response) => {
    console.log(response.credential);
    let userObject = jwt_decode(response.credential);
    console.log(userObject.name);
    console.log(userObject.sub);
    this.props.signIn(userObject.sub, userObject.name);
    document.getElementById("signInDiv").hidden = true;
    return userObject;
  };

  // renderAuthButton() {
  //     console.log("czy zalogowano: " + this.props.isSignedIn +" " + this.props.userId)
  //     if (this.props.isSignedIn === null) {
  //         return null
  //     } else if (this.props.isSignedIn) {
  //         return (<button onClick={this.onSignOutClick} className="ui red google button">
  //             <i className="google icon"></i>
  //             Sign Out
  //         </button>)
  //     } else {
  //         return (<button onClick={this.onSignInClick} className="ui red google button">
  //             <i className="google icon"></i>
  //             Sign In with Google
  //         </button>)
  //     }
  // }
  handleSignOut = () => {
    document.getElementById("signInDiv").hidden = false;
    this.props.signOut();
  };

  renderLogOutButton = () => {
    if (this.props.userId)
      return (
        <Button
          onClick={this.handleSignOut}
          style={{ marginLeft: "10px" }}
          size="xs"
          variant="gradient"
          gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
        >
          Sign Out
        </Button>
      );
  };

  renderLoggedInUserBadge = () => {
    if (this.props.userId) {
      let avatarContent = this.props.userName.split(" ");
      return (
        <>
          <Avatar color="violet" radius="xl">
            {avatarContent[0].charAt(0)}
            {avatarContent[1].charAt(0)}
          </Avatar>
          {/* <Badge size="lg" radius='md' color="violet">{this.props.userName}</Badge> */}
        </>
      );
    }
  };

  render() {
    return (
      <div>
        <div id="signInDiv"></div>
        <Grid justify="flex-end" align="center">
          {this.renderLoggedInUserBadge()}
          {this.renderLogOutButton()}
        </Grid>
      </div>
    );
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
const mapStateToProps = (state, ownProps) => {
  return {
    userId: state.auth.userId,
    userName: state.auth.userName,
  };
};
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth2);
