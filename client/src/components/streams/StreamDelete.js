import React, {useEffect} from 'react';
import Modal from '../Modal'
import history from '../../history'
import {useParams} from 'react-router-dom';
import {connect} from "react-redux";
import {fetchStream, deleteStream} from '../../Actions';
import {Link} from 'react-router-dom'


const StreamDelete = ({deleteStream, fetchStream, stream}) => {
    const {id} = useParams();

    const actions = (id) => {
        return (
            <div>
                <button onClick={() => deleteStream(id)} className="ui negative button">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </div>
        )
    };

    const renderStreamContent = (stream) => {
        console.log(stream)
        if (stream) {
            return (
                `Are you sure you want to delete stream with title: ${stream.title}?`
            )
        }
    }

    useEffect(() => {
        fetchStream(id);
    }, [])

    return (
        <div>
            <Modal
                title={"Delete Stream"}
                content={renderStreamContent(stream)}
                actions={actions(id)}
                onDismiss={() => history.push("/")}
            />
        </div>)
};
const mapStateToProps = (state) => ({
    stream: state.streams[window.location.pathname.split("/")[window.location.pathname.split('/').length - 1]]
});

const mapDispatchToProps = {fetchStream, deleteStream};


export default connect(mapStateToProps, mapDispatchToProps)(StreamDelete);