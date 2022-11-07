import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
// import Moment from 'react-moment';
import moment from 'moment'

import { useDispatch, useSelector } from 'react-redux'
import { Card, Container, Form, Button, Row, Col, Table } from 'react-bootstrap'
import axios from 'axios'
import { membersTaskslist } from '../../actions/memberActions'

import { listMembers } from '../../actions/memberActions'
import Loader from '../../components/Loader'
import Message from '../../components/Message'


function MemberViewTasksScreen({ memberTasks, history }) {


    const dispatch = useDispatch()
    const memberTasksList = useSelector(state => state.memberTasksList)
    const { error, loading, memberTask } = memberTasksList


    const memberLogin = useSelector(state => state.memberLogin)
    const { memberInfo } = memberLogin


    useEffect(() => {
        if (!memberLogin) {
            history.push('/MemberLoginScreen')
        } else {
            dispatch(membersTaskslist(memberInfo._id))


        }
    }, [dispatch, history])



    // <video controls width="250">



    //                             <source src="../../../../static/images/videos/Islands_-_2119_1.mp4"
    //                                 type="video/webm" />

    //                             <source src="/media/cc0-videos/flower.mp4"
    //                                 type="video/mp4" />

    //                             Sorry, your browser doesn't support embedded videos.
    //                         </video>
    return (
        <div>
            <Card className='my-3 p-3 rounded'>
                {/* {member.name}    <img src={image} style={{ width: '100%' }} />  */}
                {loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                        :
                        <div class='GetOrganizationPosts'> <h2 style={{ 'textAlign': 'center' }}>The Member's AssignedTask Details Screen </h2>




                            <Table striped bordered hover variant="light">
                                <thead>
                                    <tr>
                                        <th style={{ 'font-size': '13px' }}>Organization Post Id:</th>
                                        <th style={{ 'font-size': '13px' }}>Organization Requirement Information:</th>
                                        <th style={{ 'font-size': '13px' }}>Posted by Organization email:</th>
                                        <th style={{ 'font-size': '13px' }}>Video:</th>


                                    </tr>
                                </thead>

                                {memberTask.map(memberTask => (

                                    <tbody>

                                        <tr>
                                            <td key={memberTask._id} >
                                                <p>  {memberTask.id} </p></td>
                                            <td key={memberTask._id} >
                                                <p>  {memberTask.description} </p></td>

                                            <td key={memberTask._id} >
                                                <p>


                                                    <video controls width="250">



                                                        <source src={"http://127.0.0.1:8000" + memberTask.video_file}
                                                            type="video/webm" />
                                                    </video>
                                                </p> </td>

                                            <td key={memberTask._id}><p>
                                                {moment(memberTask.createdAt).format('DD-MMM-YYYY')}
                                            </p> </td>

                                        </tr>
                                        {/* < h1 hidden (organizationPost.MemberSelected ? i++ : 'NULL) /> */}
                                    </tbody>
                                    // getValueOfI(organizationPost)


                                ))}
                            </Table>
                            <h5 classNmae='my-2 p-2' style={{ margin: '0 auto', 'text-align': 'center' }}>
                                Number of Tasks Assigned: {Object.keys(memberTask).length}
                            </h5>
                            <h5 classNmae='my-2 p-2' style={{ margin: '0 auto', 'text-align': 'center' }}>
                                {/* Number of Members assigned: {i} */}
                            </h5>

                        </div >}





            </Card >

        </div>
    )
}

export default MemberViewTasksScreen
