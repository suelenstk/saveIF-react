import React, {Component} from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';

import {Card} from '../../components/Card/Card.jsx';
import {FormInputs} from '../../components/FormInputs/FormInputs.jsx';
import {UserCard} from '../../components/UserCard/UserCard.jsx';
import Button from '../../elements/CustomButton/CustomButton.jsx';

import avatar from "../../assets/img/faces/face-3.jpg";

class NovoPost extends Component {
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Novo Post"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-8"]}
                      proprieties={[
                        {
                          label: "Título",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Titulo",
                        }
                      ]}
                    />

                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>Descrição</ControlLabel>
                          <FormControl rows="4" componentClass="textarea"
                            bsClass="form-control"
                            placeholder="Descrição" />
                        </FormGroup>
                      </Col>
                    </Row>

                    <FormInputs
                      ncols={["col-md-6"]}
                      proprieties={[
                        {
                          label: "Selecione um arquivo: ",
                          type: "file",
                          bsClass: "form-control",
                          placeholder: "File",
                        }
                      ]}
                    />

                    <Button
                      bsStyle="danger"
                      pullRight
                      fill
                      type="submit"
                    >
                      Postar
                </Button>
                    <div className="clearfix"></div>
                  </form>
                }
              />

            </Col>
          </Row>
        </Grid>
      </div>

    );
  }
}
export default NovoPost;