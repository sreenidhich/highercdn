import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
// import Moment from 'react-moment';
import moment from 'moment'

import { useDispatch, useSelector } from 'react-redux'
import { Card, Container, Form, Button, Row, Col, Table, Modal } from 'react-bootstrap'
import Select from 'react-select'

import axios from 'axios'
import { organizationPostslist, organizationsPostsUpdatePost } from '../../actions/organizationActions'

import { listMembers } from '../../actions/memberActions'
import Loader from '../../components/Loader'
import Message from '../../components/Message'



function OrganizationPostsViewPostsScreen({ organizationPost, history }) {

    //const organizationPost = []
    // const dateToFormat = '1976-04-19T12:59-0500';
    const [editModel, setEditmodel] = useState(false)
    const [selectedPost, setSelectedPost] = useState({})

    const [requirementInformation, setRequirementInformation] = useState('')
    const [addressLocation, setAddressLocation] = useState('')
    const [addressStreet, setAddressStreet] = useState('')
    const [MemberSelected, setMemberSelected] = useState('')
    const [post_id, setPost_id] = useState('')
    const [post, setPost] = useState('')

    //Video file
    const [selectedFile, setSelectedFile] = useState('')
    //Video file description
    const [description, setDescription] = useState('')
    const [videoPost_id, setVideoPost_id] = useState('')


    const dispatch = useDispatch()

    const memberList = useSelector(state => state.memberList)
    const { error: errorMemberList, loading: loadingMembers, members } = memberList

    const organizationPostList = useSelector(state => state.organizationPostList)
    const { error, loading, organizationPosts } = organizationPostList


    const organizationLogin = useSelector(state => state.organizationLogin)
    const { organizationInfo } = organizationLogin

    const organizationPostUpdateList = useSelector(state => state.organizationPostUpdateList)
    const { error: errorOrganizationPostUpdateList, loading: loadingOrganizationPostUpdateList, organizationPostsUpdatePost } = organizationPostUpdateList

    useEffect(() => {
        if (!organizationInfo) {
            history.push('/OrganizationLoginScreen')
        } else {
            dispatch(listMembers())
            dispatch(organizationPostslist(organizationInfo._id))


        }
    }, [history, organizationPostsUpdatePost, errorOrganizationPostUpdateList])



    const editOrganizationPost = (data) => {

        console.log(data)


        setEditmodel(true)
        setSelectedPost(data)

        setRequirementInformation(data.requirementInformation)
        setAddressLocation(data.addressLocation)
        setMemberSelected(data.MemberSelected)

        //For Edit Model
        setPost_id(data.id) //post ID
        setVideoPost_id(data.id)
        setDescription(data.description)


        console.log(members)

    }
    const handleClose = () => {

        setEditmodel(false)


    }
    const handleChange = (e) => {
        console.log(e)
        setMemberSelected(e.value)
        setPost(e)

    }


    const submitHandler = (e) => {
        e.preventDefault()
        setEditmodel(false)

        console.log(requirementInformation)
        console.log(addressLocation)
        console.log(MemberSelected)
        console.log(post_id)


        // dispatch(organizationsPostsUpdatePost(post_id, requirementInformation, addressLocation, MemberSelected))
        // dispatch(organizationsPostsCreatePost(organizationInfo._id, requirementInformation, organizationInfo.email, addressLocation))

    }


    const onChangeHandler1 = (e) => {
        // this.setState({
        //     selectedFile: e.target.files[0],
        //     loaded: 0,
        // });
        setSelectedFile(e.target.files[0]);
        console.log(e.target.files[0]);
    };

    const handleSubmit1 = (e) => {
        e.preventDefault();
        const formData = new FormData();
        // const { selectedFile } = this.state;
        // formData.append('VideopostId', organizationInfo._id);
        formData.append('postedByOrganization', organizationInfo._id);
        formData.append('postedByOrganizationEmail', organizationInfo.email);

        formData.append('description', description);

        formData.append('video_file', selectedFile);
        console.log(formData);
        fetch('/api/organization/createVideoPost/', {
            method: 'POST',
            body: formData,
        });
        alert('The file has been uploaded successfully. Refresh the page');
        dispatch(organizationPostslist(organizationInfo._id))
    };

    const handleSubmit2 = (e) => {
        e.preventDefault();
        setEditmodel(false)
        const formData = new FormData();
        // const { selectedFile } = this.state;
        formData.append('videoPost_id', videoPost_id);
        formData.append('postedByOrganization', organizationInfo._id);
        formData.append('postedByOrganizationEmail', organizationInfo.email);

        formData.append('description', description);

        formData.append('video_file', selectedFile);
        console.log(formData);
        fetch('/api/organization/updateVideoPost/', {
            method: 'POST',
            body: formData,
        });
        alert('The file has been saved successfully. Refresh the page');


    };

    // // When user selects a file, set state
    // onFileChange = e => {
    //     setSelectedFile(e.target.files[0]);
    // };
    // // when user uploads file this function should execute
    // onFileUpload = () => {
    //     const formData = new FormData();
    //     formData.append(
    //         "myFile",
    //         selectedFile,
    //         selectedFile.name
    //     );
    //     // console log uploaded file details
    //     console.log(selectedFile);
    //     // user send req to the server
    //     axios.post("api/uploadfile", formData);
    // };


    return (
        <div>

            <Card className='my-3 p-3 rounded'>
                {/* {member.name} */}
                {loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                        :
                        <div class='GetOrganizationPosts'> <h2 style={{ 'textAlign': 'center' }}>The Video Posts Details: </h2>


                            <form onSubmit={handleSubmit1}>


                                <h3>Upload a new file:</h3>


                                <Form.Group controlId="formGridDescription" style={{ display: 'flex' }}>
                                    <Form.Label style={{ width: '30%' }}>File Description: </Form.Label>
                                    <Form.Control type="text" placeholder="Enter File Description" style={{ width: '70%' }}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)} />
                                </Form.Group>
                                <label>
                                    <input type="file" name="file" onChange={onChangeHandler1} />
                                </label>
                                <button style={{ 'background-color': '#008CBA' }} type="submit">
                                    Upload
                                </button>
                                <br /><br />

                            </form>


                            <Table striped bordered hover variant="light">
                                <thead>
                                    <tr>
                                        <th style={{ 'font-size': '13px' }}>Post Id:</th>
                                        <th style={{ 'font-size': '13px' }}>(Reference)Description:</th>
                                        <th style={{ 'font-size': '13px' }}>Posted by email:</th>
                                        <th style={{ 'font-size': '13px' }}> Video:</th>
                                        <th style={{ 'font-size': '13px' }} > Timeline:</th>

                                    </tr>
                                </thead>

                                {organizationPosts.map((organizationPost, index) => (
                                    // <Row>

                                    //     <Col key={organizationPost._id} sm={12} lg={4} xl={3}>
                                    //         <p> Organization Requirement Information: {organizationPost.requirementInformation}  </p>


                                    //     </Col>
                                    //     <Col key={organizationPost._id} sm={12} lg={4} xl={3}>
                                    //         <p> Posted by: {organizationInfo.username}  </p>


                                    //     </Col>
                                    //     <Col key={organizationPost._id} sm={12} lg={4} xl={3}>
                                    //         <p> Assigned to : {organizationPost.MemberSelected_id ? organizationPost.MemberSelected_id : 'None'}  </p>


                                    //     </Col>
                                    //     <Col key={organizationPost._id} sm={12} lg={4} xl={3}>
                                    //         <p> Timeline : <moment >  </moment> </p>


                                    //     </Col>

                                    // </Row>
                                    <tbody>

                                        <tr>
                                            <td key={organizationPost._id} >
                                                <p> {index + 1} </p></td>
                                            <td key={organizationPost._id} >
                                                <p>({organizationPost.id}){organizationPost.description} </p></td>
                                            <td key={organizationPost._id} >
                                                <p>  {organizationPost.postedByOrganizationEmail}  </p> </td>


                                            <td key={organizationPost._id}  ><p>

                                                <video controls width="250">



                                                    <source src={organizationPost.video_file}
                                                        type="video/webm" />
                                                </video>



                                            </p></td>

                                            {/*
                                                {organizationPost.MemberSelected ? (organizationPost.MemberSelected) : 'None'}
                                                
                                                
                                                <td key={organizationPost._id}  >

                                                <input
                                                    type="text"
                                                    placeholder="Company"
                                                    name="company"
                                                    value={organizationPost.MemberSelected}
                                                    onChange={(e) => onChange(e)}
                                                />
                                            </td> */}


                                            <td key={organizationPost._id}><p>
                                                {moment(organizationPost.createdAt).format('DD-MMM-YYYY')}
                                            </p> </td>
                                            <td key={organizationPost._id}>
                                                <p>

                                                    <button type="button" onClick={() => editOrganizationPost(organizationPost)} >Edit Post</button>
                                                </p>
                                            </td>

                                        </tr>
                                        {/* < h1 hidden (organizationPost.MemberSelected ? i++ : 'NULL) /> */}
                                    </tbody>
                                    // getValueOfI(organizationPost)


                                ))}
                            </Table>
                            <h5 className='my-2 p-2' style={{ margin: '0 auto', 'text-align': 'center' }}>
                                Number of Video Posts: {Object.keys(organizationPosts).length}
                            </h5>
                            <h5 className='my-2 p-2' style={{ margin: '0 auto', 'text-align': 'center' }}>
                                {/* Number of Members assigned: {i} */}
                            </h5>

                        </div >}



                <Modal show={editModel} onHide={handleClose} animation={false} style={{ top: '20vh' }}>
                    <Modal.Header closeButton>
                        <Modal.Title style={{ 'max-width': '90%', margin: '0 28px' }} >Video Post Details Reference: {post_id} </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {loadingOrganizationPostUpdateList ? <Loader />
                            : errorOrganizationPostUpdateList ? <Message variant='danger'>{errorOrganizationPostUpdateList}</Message> : ''}
                        <Form className='p-2' style={{ 'max-width': '95%', margin: '0 auto' }}>

                            <Form.Group controlId="formGridDescription" style={{ display: 'flex' }}>
                                <Form.Label style={{ width: '30%' }}>File Description: </Form.Label>
                                <Form.Control type="text" placeholder="Enter File Description" style={{ width: '70%' }}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)} />
                            </Form.Group>
                            <label>
                                <h3>Upload a new file:</h3>
                                <input type="file" name="file" onChange={onChangeHandler1} />
                            </label>

                            {/* <Form.Group controlId="formGridMemberSelected" style={{ display: 'flex' }}>
                                <Form.Label style={{ width: '30%' }}>Member Selected_id</Form.Label>
                                <Form.Control type="text" placeholder="Enter Username" style={{ width: '70%' }}
                                    value={MemberSelected}
                                    onChange={(e) => setMemberSelected(e.target.value)} />
                            </Form.Group> 
                            <span>Select Member: </span><Select
                                value={post}
                                onChange={handleChange}
                                options={members && members.map(e => ({ value: e._id, label: e.username + " from " + e.addressLocation }))}
                            />      */}

                        </Form>



                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSubmit2}  >
                            Save Post
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/*  Use the a href to navigate through other url-> Load a new windows */}
                {/* <Card.body>
               
                 <Card.text as div>
                    <div className='my-3'>
                        {member.name} </div>
                </Card.text> 

           </Card.body>  */}

            </Card >




        </div >
    )
}


export default OrganizationPostsViewPostsScreen
