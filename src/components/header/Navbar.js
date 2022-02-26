import React from "react";
import ToolbarComponent from "./Toolbar";
import DrawerComponent from "./Drawer";

class Navbar extends React.Component {
    state = {
        left: false
    };

    toggleDrawer = () => {
        // if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        //   return;
        // }

        this.setState({ left: false });
    };

    openDrawer = () => {
        this.setState({
            left: true
        });
    };

    render() {
        return (
            <div className="App">
                <ToolbarComponent openDrawerHandler={this.openDrawer} />
                <DrawerComponent
                    left={this.state.left}
                    toggleDrawerHandler={this.toggleDrawer}
                />
                <div style={{ marginBottom: '62px' }}></div>
            </div>
        );
    }
}
export default Navbar;
