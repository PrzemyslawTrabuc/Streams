import React from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../Actions";
import { Link } from "react-router-dom";
import { Button, Card } from "@mantine/core";
import { Image, Text, Badge, Group, Grid } from "@mantine/core";
import streamImage_16 from "../../style/16.jpeg";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdminButtons(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`}>
            <Button
              size="sm"
              variant="gradient"
              gradient={{ from: "teal", to: "lime", deg: 105 }}
            >
              Edit
            </Button>
          </Link>
          <Link to={`/streams/delete/${stream.id}`}>
            <Button
              size="sm"
              variant="gradient"
              gradient={{ from: "#A40000", to: "#C60E0E" }}
            >
              Delete
            </Button>
          </Link>
        </div>
      );
    }
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "left" }}>
          <Link to="/streams/new">
            <Button
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan" }}
            >
              Create Stream
            </Button>
          </Link>
        </div>
      );
    }
  }

  renderList() {
    return this.props.streams.map((stream) => {
      return (
        <div
          span={10}
          style={{ width: "200px", margin: "auto", height: "500px" }}
          className="item"
          key={stream.id}
        >
          <Card shadow="xs" p="lg">
            <Card.Section>
            <Link to={`/streams/${stream.id}`}>
              <Image src={streamImage_16}></Image>
            </Link>
            </Card.Section>
            <Group position="left" style={{ marginBottom: 5 }}>
              <Text size="md" weight={500}>
                <Link to={`/streams/${stream.id}`} className="header">
                  <h2>
                    {stream.title} 
                    {stream.userId === this.props.currentUserId ? 
                        <Badge size="md">
                        {stream.id}
                        </Badge> 
                        : null}
                  
                  </h2>
                </Link>
              </Text>
            </Group>
            <Text
              className="description"
              weight={500}
              style={{
                height: "100px",
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              {stream.description}
            </Text>
            {this.renderAdminButtons(stream)}
          </Card>
        </div>
      );
    });

    // return this.props.streams.map(stream => {
    //   return (
    //     <div className="item" key={stream.id}>
    //       {this.renderAdminButtons(stream)}
    //       <i className="large middle aligned icon camera" />
    //       <div className="content">
    //         <Link to={`/streams/${stream.id}`} className="header">
    //           {stream.title}
    //         </Link>
    //         <div className="description">{stream.description}</div>
    //       </div>
    //     </div>
    //   );
    // });
  }

  render() {
    console.log(this.props.streams);
    return (
      <div>
        <h2>Watch STREAMY streams</h2>
        <div className="ui celled list">
            {this.renderList()}
        </div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
