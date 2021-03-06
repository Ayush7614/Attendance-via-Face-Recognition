import React from 'react';
import {
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import {Button, Divider, Text} from 'react-native-elements';
import Courses from '../AdminScreen/Courses.js';
import RenderAttendanceStudent from '../AdminScreen/RenderAttendanceStudent';
import {AppContext} from '../../../Contexts.js';

/**
 * UI Component to show all the courses belonging to the relevant student.
 * This component applies to the students.
 */
export default class MyCourses extends Courses{

    /**
     * Getting the current nearest context to get the data from.
     * This context will have id and token of the faculty to authenticate him on the server
     * along with other useful information.
     */
    static contextType = AppContext;

    constructor(props){

        super(props);

        this.state = Object.assign({}, this.state, {
            renderAttendance: false,
        });

        // Binding all the functions to current context so that they can be called
        // from the context of other components as well.
        this.goBack = this.goBack.bind(this);
        this.renderAttendance = this.renderAttendance.bind(this);
    }

    /**
     * The function which is passed to other components which they can call to return back to this component.
     */
    goBack(){
        this.setState({
            renderAttendance: false,
        });
    }

    /**
     * The Function which is called when user clicks on some course description.
     * Renders the attendance of the student in the corresponding course.
     * @param {Object} course - Object representing the course the attendance is rendered for.
     */
    renderAttendance(course){

        this.setState({
            currentCourse: course,
            renderAttendance: true,
        });
    }

    render(){
        return (
            this.state.isLoading ? <ActivityIndicator/> :
            this.state.hasError ? <Text style={{color: 'red'}}> {this.state.errorMessage} </Text> :
            this.state.renderAttendance ?
            <RenderAttendanceStudent
                goBack={this.goBack}
                url={this.context.domain + '/api/user/' + this.context.id + '/' + this.state.currentCourse.courseId}
            /> :
            <ScrollView>
                {this.state.allCourses.map((val)=>{
                    return (
                            <Button
                                key = {val.courseId}
                                onPress={() => this.renderAttendance(val)}
                                title = {val.courseId + ': ' + val.courseName}
                            />
                        );
                })}
                <Divider />
                <Button
                    title="Back"
                    onPress={() => this.props.goBack()}
                />
            </ScrollView>
        );
    }
}
