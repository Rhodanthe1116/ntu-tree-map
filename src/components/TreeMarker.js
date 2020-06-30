import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import TreeInfoWindow from './TreeInfoWindow'
import PropTypes from 'prop-types';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';

import TreeIcon from './TreeIcon';

const useStyles = makeStyles({

    marker: {
        cursor: 'pointer',

    },
})



// Marker component
function TreeMarker({ show, tree, onDonateClick, onLearnMoreClick }) {
    const classes = useStyles()

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const id = open ? 'transitions-popper' : undefined;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true)
        onLearnMoreClick(tree)
    };
    const handleMouseEnter = (event) => {
        setAnchorEl(event.currentTarget)
        setOpen(true)
    }
    const handleMouseLeave = (event) => {
        setAnchorEl(null)
        setOpen(false)
    }

    if (!show) {
        return <></>
    }

    return (
        <div
            onMouseLeave={handleMouseLeave}
        >


            <TreeIcon
                className={classes.marker}
                color={open ? "secondary" : "primary"}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
            />

            <Popper id={id} open={open} anchorEl={anchorEl} transition={true}>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} >
                        <div>
                            <TreeInfoWindow
                                tree={tree}
                                onMouseLeave={handleMouseLeave}
                                onDonateClick={onDonateClick}
                                onLearnMoreClick={onLearnMoreClick}
                            />
                        </div>
                    </Fade>
                )}
            </Popper>
        </div>
    );
};

TreeMarker.propTypes = {
    show: PropTypes.bool,
    place: PropTypes.shape({
        name: PropTypes.string,
        formatted_address: PropTypes.string,
        rating: PropTypes.number,
        types: PropTypes.array,
        price_level: PropTypes.number,
        opening_hours: PropTypes.object,
    }).isRequired,
};


export default TreeMarker