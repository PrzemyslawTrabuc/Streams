import React from 'react';
import {connect} from "react-redux";
import {fetchStreams} from "../../Actions";
import {Link} from 'react-router-dom';
import { Button } from '@mantine/core';

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    renderAdminButtons(stream) {
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`}>
                    <Button variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>Edit</Button>                    
                    </Link>
                    <Link to={`/streams/delete/${stream.id}`}>
                    <Button variant="gradient" gradient={{ from: '#A40000', to: '#C60E0E' }}>Delete</Button>
                    </Link>
                </div>
            )
        }
    }

    renderCreate() {
        if(this.props.isSignedIn){
            return(
                <div style={{textAlign:'right'}}>
                    <Link to="/streams/new">
                    <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Create Stream</Button>
                    </Link>
                </div>
            )
        }
    }

    renderList() {
        return this.props.streams.map(stream => {
          return (
            <div className="item" key={stream.id}>
              {this.renderAdminButtons(stream)}
              <i className="large middle aligned icon camera" />
              <div className="content">
                <Link to={`/streams/${stream.id}`} className="header">
                  {stream.title}
                </Link>
                <div className="description">{stream.description}</div>
              </div>
            </div>
          );
        });
      }

    render() {
        console.log(this.props.streams)
        return (
            <div>
                <h2>Watch STREAMY streams</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
                {this.renderCreate()}
            </div>
        )
    };
}

const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userData.id,
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, {fetchStreams})(StreamList);