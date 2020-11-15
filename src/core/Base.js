import React from 'react'
import Menu from './Menu';


//{} <= this bracket means it should contain the return statement
const Base = ({
    title = "My Title",
    description = "description",
    className = "bg-dark text-white p-4",
    children
}) => {
    return (
        <div>
            <Menu/>
            <div className="container-fluid">
                <div className="jumbotron bg-dark text-white text-center">
                   <h1  style={{fontSize : 45, textAlign : "center"}} className="display-4">{title}</h1>
                   <p className="lead">{description}</p>
                </div>
                   <div className={className}>{children}</div>
            </div>
              
                    <footer className="footer bg-dark mt-auto py-5">
                        <div className="container-fluid bg-success text-white text-center py-3">
                            <h4>Please feel free to contact us any time</h4>
                            <button className="btn btn-warning btn-lg">Contact Us</button>
                        </div>
                        <div className="container">
                            <span className="text-muted">An <span className="text-white ">Amazing</span> page</span>
                        </div>
                    </footer>
               
        </div>
    )
}

export default  Base;