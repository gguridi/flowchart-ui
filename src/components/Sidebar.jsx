import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Sidebar as LTESidebar, Button } from "adminlte-2-react";
const { Item } = LTESidebar;

export default class Sidebar extends React.Component {
    static propTypes = {
        charts: PropTypes.object,
        deleteChart: PropTypes.func.isRequired,
    };

    static defaultProps = {
        charts: {},
    };

    constructor(props) {
        super(props);
        this.getAddButton = this.getAddButton.bind(this);
        this.state = {};
    }

    getCharts = () => {
        return Object.values(this.props.charts);
    };

    getAddButton = () => {
        return (
            <span
                id="new-chart"
                className="padding-top text-center input-group-btn"
            >
                <Button type="danger" text="+ New Chart" to="/new-chart" />
            </span>
        );
    };

    render() {
        return (
            <React.Fragment>
                {this.getCharts().map((chart) => (
                    <React.Fragment key={"fragment-" + chart.id}>
                        <Item
                            key={chart.id}
                            text={chart.title}
                            to={"/diagram/" + chart.id}
                        />
                        <FontAwesomeIcon
                            key={"trash-" + chart.id}
                            data-testid={"trash-" + chart.id}
                            color="white"
                            className="trash-icon"
                            icon={["fas", "trash"]}
                            onClick={(e) => {
                                this.props.deleteChart(chart.id);
                                e.preventDefault();
                            }}
                        />
                    </React.Fragment>
                ))}
                {this.getAddButton()}
            </React.Fragment>
        );
    }
}
