import React, {Component} from 'react';
import {
  ScrollView,
  BackHandler,
} from 'react-native';


import {Button, Divider} from 'react-native-elements';
import AddStudent from './AddStudent.js';
import TakeAttendance from './TakeAttendance.js';
import RenderAttendanceCourse from './RenderAttendanceCourse.js';

/**
 * UI Component to render the list of actions which can be taken on any course.
 * This component applies to the faculties.
 */
export default class RenderCourseActions extends Component{
    constructor(props){

        super(props);

        this.state = {
            renderCourseAttendance: false,
            takeAttendance: false,
            addStudent: false,
        };

        // Binding all the functions to current context so that they can be called
        // from the context of other components as well.
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    /**
     * Handler which is called when the user hits back button on his/her device
     */
    handleBackButtonClick(){
        this.props.goBack();
        return true;
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    /**
     * The function which is passed to other components which they can call to return back to this component.
     */
    goBack(){
        this.setState({
            renderCourseAttendance: false,
            takeAttendance: false,
            addStudent: false,
        });
    }

    render(){
        return (
            this.state.renderCourseAttendance ?
            <RenderAttendanceCourse
                goBack={this.goBack}
                course={this.props.course}
            /> :
            this.state.addStudent ?
            <AddStudent
                goBack={this.goBack}
                course={this.props.course}
            /> :
            this.state.takeAttendance ?
            <TakeAttendance
                goBack={this.goBack}
                course={this.props.course}
            /> :
            <ScrollView>
                <Button
                    title="Take Attendance"
                    onPress={() => {
                        this.setState({
                            takeAttendance: true,
                        });
                    }}
                />
                <Divider />
                <Button
                    title="See Attendance"
                    onPress={() => {
                        this.setState({
                            renderCourseAttendance: true,
                        });
                    }}
                />
                <Divider />
                <Button
                    title="Add Student"
                    onPress={() => {
                        this.setState({
                            addStudent: true,
                        });
                    }}
                />
            </ScrollView>
        );
    }
}
