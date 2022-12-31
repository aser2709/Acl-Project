import React, { Component } from 'react';
import PDF from './PDF';

class Post extends Component {
    state = {
        title: '',
        postSubmitted: false
    }

    onChange = input => e => {
        this.setState({
            [input]: e.target.value
        });
    }

    submitPost = (e) => {
        
        if(!this.state.title){
            alert('All fields are required!');
            e.preventDefault();
        }else{
            this.setState({
                postSubmitted: true
            });
        }
    }
    render(){
        return(
            <>
                {  !this.state.postSubmitted ? 
                    (<div className="container">
                        <div className="jumbotron mt-3">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="well well-sm">
                                        <form className="form-horizontal" method="post">
                                            <fieldset>
                                                <legend className="text-center header">Get your certificate</legend>
                                                <div className="form-group">
                                                    <span className="col-md-1 col-md-offset-2 text-center"><i className="fa fa-user bigicon"></i></span>
                                                    <input onChange={this.onChange('title')} name="title" type="text" placeholder="Enter name to be displayed on the certificate" className="form-control" />
                                                </div>
                                                <div className="form-group">
                                                    <button type="button" onClick={this.submitPost} className="btn btn-primary btn-lg">Submit</button>
                                                </div>
                                            </fieldset>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>) : (
                        <PDF title={this.state.title}/>
                    )
                }
            </>
        );
    }
}

export default Post;