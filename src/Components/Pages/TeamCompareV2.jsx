import React from "react";
import axios from "axios";
import {
    Container,
    Row,
    Col,
    Tab,
  } from "react-bootstrap";
import AccordionComponent from "./accordion";
import TeamNav from "./teamnav";

export default class TeamCompareV2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        rawDataFromResponseV2: null
    };
  }

  async componentDidMount() {
    await axios
      .get(global.config.apiEndpoint.production + "/winning-matchups-v2")
      .then((response) => {
        this.setState({ rawDataFromResponseV2: response.data });
      });
  }

  render() {
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey={0}>
          {this.state.rawDataFromResponseV2 === null ?
            null
            :
            <Row>
                <Col sm={3}>
                  <Container>
                  <TeamNav data={Object.keys(this.state.rawDataFromResponseV2)} />
                  </Container>
                </Col>
                <Col sm={9}>
                <Tab.Content>
                  {Object.keys(this.state.rawDataFromResponseV2).map((item,index) => {
                    return (
                    <AccordionComponent 
                      matchupswon={this.state.rawDataFromResponseV2[item]["winning_matchup"].length} 
                      dataindex={index} data={this.state.rawDataFromResponseV2[item]["winning_matchup"]} />
                    )
                  })}
                </Tab.Content>
              </Col>   
            </Row>
            }
          </Tab.Container>
      )
  }
}
