import * as React from 'react'
import * as classNames from 'classnames'
import * as io from 'socket.io-client'

const socket = io.connect()

export interface Container {
    id: string
    name: string
    image: string
    state: string
    status: string
}

export class ContainerListItem extends React.Component<Container, {}> {

    onActionButtonClick() {
        const evt = this.isRunning() ? 'container.stop' : 'container.start'
        socket.emit(evt, { id: this.props.id })
    }

    isRunning() {
        return this.props.state === 'running'
    }

    isCopper(){
        //if(this.props.name === 'webmail') {  
          //  return true;
        //} else {
          //  return false; 
        //}

       var grade:string = this.props.name; 
       var result = false;
        switch(grade) { 
        case "webmail": { 
            //console.log("Excellent"); 
            result = true;
            break; 
        } 
        case "emailserver": { 
            //console.log("Good"); 
            result = true;
            break; 
        } 
        case "phpldapadmin": {
            //console.log("Fair"); 
            result = true;
            break;    
        } 
        case "openldap": { 
            //console.log("Poor"); 
            result = true;
            break; 
        }  
        case "reverse_proxy": { 
            //console.log("Poor"); 
            result = true;
            break; 
        }  
        default: { 
            //console.log("Invalid choice"); 
            result = false;
            break;  
                        
        } 
        }
        return result;
    }

    render() {
        //const panelClass = this.isRunning() ? 'success' : 'default'
        const panelClass = this.isCopper() ? 'success' : 'failed'
        const classes = classNames('panel', `panel-${panelClass}`)
        const buttonText = this.isRunning() ? 'STOP' : 'START'

        // if the docker container doesn't bellongs to copper then it will be ignored.
        if(this.isCopper()){
        return (
           
            <div className="col-sm-3">
                <div className={ classes }>
                    <div className="panel-heading">{ this.props.name }</div>
                    <div className="panel-body">
                        Status: {this.props.status}<br/>
                        Image: {this.props.image}
                        More :{this.props.state}
                    </div>
                    <div className="panel-footer">
                        <button onClick={this.onActionButtonClick.bind(this)} className="btn btn-default">{buttonText}</button>
                    </div>
                </div>
            </div>
     
     
        )
    }else{
        return (<div></div>)
    }
    }
}