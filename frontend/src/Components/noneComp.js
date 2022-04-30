import React, { Fragment, useEffect } from "react";


const NoneComp = ({ }) => {




    // useEffect(() => {
    // }, [])



    return (
        <Fragment>

            <div className="d-flex flex-column align-items-start p-5 ">


                <div>
                    <h2 className="home-poster ">Y</h2><h2 className="home-poster-mini">et</h2>
                </div>
                <br></br>
                <div>
                    <h2 className="home-poster ">A</h2><h2 className="home-poster-mini">nnother</h2>
                </div>
                <br></br>
                <div>
                    <h2 className="home-poster ">R</h2><h2 className="home-poster-mini">estaurant</h2>
                </div>
                <br></br>
                <div>
                    <h2 className="home-poster ">A</h2><h2 className="home-poster-mini">App</h2>
                </div>
            </div>
        </Fragment>
    );
}

export default NoneComp;