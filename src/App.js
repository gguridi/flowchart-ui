import React, { Component } from "react";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { Footer } from "adminlte-2-react";
import Admin from "./vendor/Admin";
import chartReducer from "./reducers/charts";
import Diagram from "./containers/Diagram";
import NewChart from "./containers/NewChart";
import Sidebar from "./containers/Sidebar";

const store = createStore(
    combineReducers({
        charts: chartReducer,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk),
);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Admin
                    title={["Flow", "Charts"]}
                    titleShort={["Fl", "Ch"]}
                    theme="blue"
                    sidebar={<Sidebar />}
                    footer={
                        <Footer>
                            PoweredBy{" "}
                            <a href="http://flowchart.js.org/" target="_blank">
                                FlowChart
                            </a>
                        </Footer>
                    }
                >
                    <Diagram path="/diagram/:id" />
                    <NewChart path="/new-chart" />
                </Admin>
            </Provider>
        );
    }
}

export default App;
