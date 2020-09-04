import React from "react";
import PropTypes from "prop-types";
import { createBrowserHistory } from "history";
import { Content, Button, ButtonGroup, Inputs } from "adminlte-2-react";
const { Text } = Inputs;

export default class NewChart extends React.PureComponent {
    static propTypes = {
        createChart: PropTypes.func.isRequired,
    };

    static defaultProps = {
        history: createBrowserHistory(),
    };

    constructor(props) {
        super(props);
        this.getChartId = this.getChartId.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.state = {
            name: "",
        };
    }

    getChartId = (value) => {
        return value.replace(/\s+/g, "-").toLowerCase();
    };

    onChange = (e) => {
        this.setState({ name: e.target.value });
    };

    onCreate = (e) => {
        const title = this.state.name;
        const id = this.getChartId(title);
        this.props.createChart(id, title, "");
        this.props.history.push("/diagram/" + id);
    };

    render() {
        return (
            <Content modal={true} title="Add Chart" modalCloseTo="/">
                <Text
                    label="Name"
                    placeholder="Name of the Chart"
                    onChange={this.onChange}
                />
                <ButtonGroup margin={true}>
                    <Button
                        dataTestid="create-chart"
                        type="primary"
                        text="Create"
                        onClick={this.onCreate}
                        className="margin-right"
                    />
                </ButtonGroup>
            </Content>
        );
    }
}
