import React from 'react';
import {colors} from "../../styles/global";
import CustomScrollbar from "react-custom-scrollbars";

class Scrollbar extends React.Component {

    renderThumbVertical = () => (
        <div
            style={{
                backgroundColor: colors.secondaryLight,
                borderRadius: '4px',
            }}
        />
    );

    renderTrackHorizontal = () => (
        <div style={{display: 'none'}}/>
    );

    render() {
        let {children} = this.props;
        return (
            <CustomScrollbar
                autoHeight
                autoHeightMin={0}
                autoHeightMax={700}
                thumbMinSize={30}
                universal={true}
                renderTrackHorizontal={this.renderTrackHorizontal}
                renderThumbVertical={this.renderThumbVertical}
            >
                {children}
            </CustomScrollbar>
        );
    }
}

export default Scrollbar;
