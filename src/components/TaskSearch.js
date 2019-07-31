import React, { Component } from "react";

import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskSearch extends Component {
    constructor(props){
        super(props);
        this.state={
            keyword: ''
        }
    }

    onChange=(e)=>{
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }

    onSearch=(keyword)=>()=>{
        this.props.onSearchTask(keyword);
    }

    render() {
        return (
            <div className="uk-width-1-2">
                <div className="uk-margin">
                    <form className="uk-search uk-search-medium">
                        <a className="uk-search-icon-flip" uk-search-icon="true" onClick={ this.onSearch(this.state.keyword) }></a>
                        <input 
                            className="uk-search-input" 
                            type="search" 
                            placeholder="Search..." 
                            name="keyword"
                            onChange = {this.onChange}
                            value={ this.state.keyword }
                            />
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {};
}
const mapDispatchToProps = (dispatch, props) =>{
    return {
        onSearchTask : (keyword) => {
            dispatch(actions.searchTask(keyword));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskSearch);