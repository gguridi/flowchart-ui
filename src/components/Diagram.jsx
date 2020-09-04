import React from "react";
import PropTypes from "prop-types";
import flowchart from "flowchart.js";
import Canvg from "canvg";
import { Content, Row, Col, Box, Button } from "adminlte-2-react";

export default class Diagram extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        code: PropTypes.string,
        updateChart: PropTypes.func,
    };

    static defaultProps = {
        code: "",
    };

    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.onClickRender = this.onClickRender.bind(this);
        this.onChangeMarkdown = this.onChangeMarkdown.bind(this);
        this.onKeyPressMarkdown = this.onKeyPressMarkdown.bind(this);
        this.onDownload = this.onDownload.bind(this);
        this.onDownloadSVG = this.onDownloadSVG.bind(this);
        this.renderDiagram = this.renderDiagram.bind(this);
        this.state = {
            code: this.props.code,
            chart: flowchart.parse(""),
        };
    }

    componentDidMount() {
        if (this.state.code) {
            this.renderDiagram(this.state.code);
        }
    }

    onClickRender = (e) => {
        const code = this.state.code;
        this.renderDiagram(code);
        this.props.updateChart(this.props.id, this.props.title, code);
    };

    onChangeMarkdown = (e) => {
        this.setState({ code: e.target.value });
    };

    onDownload = (extension, mime) => {
        const svg = this.canvas.current.innerHTML;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        let vector = Canvg.fromString(ctx, svg);
        vector.start();

        let a = document.createElement("a");
        a.setAttribute("download", this.props.title + extension);
        a.setAttribute("href", canvas.toDataURL(mime));
        a.click();
    };

    onDownloadSVG = (e) => {
        const svg = this.canvas.current.innerHTML;
        let a = document.createElement("a");
        a.setAttribute("download", this.props.title + ".svg");
        a.setAttribute("href", "data:image/svg+xml," + encodeURIComponent(svg));
        a.click();
    };

    onKeyPressMarkdown = (e) => {
        if (e.key === "Enter") {
            const code = this.state.code;
            this.renderDiagram(code);
            this.props.updateChart(this.props.id, this.props.title, code);
        }
    };

    renderDiagram = (code) => {
        try {
            if (code) {
                document.getElementById("canvas-svg").innerHTML = "";
                let chart = flowchart.parse(code);
                chart.drawSVG("canvas-svg");
                this.setState({ chart });
            }
        } catch (e) {
            console.error(e);
        }
    };

    renderMarkdownButtons = () => {
        return [
            <Button
                key="render"
                type="danger"
                text="Render"
                onClick={this.onClickRender}
                className="margin-right"
            />,
        ];
    };

    renderVisualisationButtons = () => {
        return [
            <Button key="export" className="export" type="info" text="Export">
                <Button
                    type="info"
                    text="SVG"
                    onClick={this.onDownloadSVG}
                    className="margin-right"
                />
                <Button
                    type="info"
                    text="PNG"
                    onClick={() => this.onDownload(".png", "image/png")}
                    className="margin-right"
                />
                <Button
                    type="info"
                    text="JPG"
                    onClick={() => this.onDownload(".jpeg", "image/jpeg")}
                />
            </Button>,
        ];
    };

    render() {
        return (
            <Content title={this.props.title} browserTitle={this.props.title}>
                <Row>
                    <Col xs={6}>
                        <Box
                            title="Markdown"
                            type="primary"
                            collapsable
                            footer={this.renderMarkdownButtons()}
                        >
                            <textarea
                                className="form-control"
                                rows="20"
                                value={this.state.code}
                                onChange={this.onChangeMarkdown}
                                onKeyPress={this.onKeyPressMarkdown}
                            ></textarea>
                        </Box>
                    </Col>
                    <Col xs={6}>
                        <Box
                            title="Visualisation"
                            type="secondary"
                            collapsable
                            footer={this.renderVisualisationButtons()}
                        >
                            <div ref={this.canvas} id="canvas-svg" />
                        </Box>
                    </Col>
                </Row>
            </Content>
        );
    }
}
