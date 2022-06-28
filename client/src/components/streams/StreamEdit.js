import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {connect} from "react-redux";
import {fetchStream, editStream} from '../../Actions';
import StreamForm from './StreamForm';

const StreamEdit = ({fetchStream, editStream, stream}) => {
    const {id} = useParams();
    //stream = stream[id];
    useEffect(() => {
        if (!stream)
            fetchStream(id);
    }, [])

    const onSubmit = (formValues) => {
        console.log(id, formValues);
        editStream(id,formValues);
    }

    if (stream) {
        console.log(stream)
        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm
                    onSubmit={onSubmit}
                    initialValues={{title: stream.title, description: stream.description}}
                />
            </div>
        )
    } else {
        return (<div>Loading...</div>)
    }
};
const mapStateToProps = (state) => ({
    stream: state.streams[window.location.pathname.split("/")[window.location.pathname.split('/').length - 1]]
});

// const mapDispatchToProps = { fetchStream, editStream };

export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit);