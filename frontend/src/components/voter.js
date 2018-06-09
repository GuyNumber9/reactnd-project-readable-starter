import React from 'react';

class VoteComponent extends React.Component {
    constructor(){
        super();

        this.state = {
            voteCount: 0
        };

        
    }
    componentWillMount(){
        this.setState({
            voteCount: this.props.voteCount || 0
        })
    }
    componentWillReceiveProps(props){
        this.setState({
            voteCount: props.voteCount
        })
    }
    
    render(){
        return (
            <div className={`input-group ${this.props.className || ''}`}>
            <div className="input-group-prepend">
                <button className="btn btn-outline-danger" type="button" onClick={this.props.downVote}><i className="far fa-thumbs-down flip-v"></i></button>
            </div>
            <input className="form-control" style={{"textAlign": "center"}} value={this.state.voteCount} disabled />
             <div className="input-group-append">
                <button className="btn btn-outline-success" type="button" onClick={this.props.upVote}><i className="far fa-thumbs-up"></i></button>
             </div>
            </div>
        )
    }
}

export default VoteComponent;