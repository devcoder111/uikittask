import React, { Component } from "react";
import TaskSearch from "./TaskSearch";
import TaskSort from "./TaskSort";

class Control extends Component {
    render() {
        return (
            <div uk-grid="true">
                <TaskSearch />
                <TaskSort />
            </div>
        )
    }
}
export default Control;