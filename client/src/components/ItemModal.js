import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types'

class ItemModal extends Component {

    state = {
        modal: false,
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();
        const newItem = {
            title: this.state.title,
            description: this.state.descripcion,
            date: this.state.date
        }
        console.log(newItem);
        //add item via addItem action
        this.props.addItem(newItem);

        //close Modal
        this.toggle();
    }

    render() {
        return (
            <div>
                <Button
                    color="dark"
                    style={{ marginBottom: '2rem' }}
                    onClick={this.toggle}
                > Add Item </Button>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>
                        Add To Shopping List
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Items</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    id="item"
                                    placeholder=" Add shopping item"
                                    onChange={this.onChange}
                                />
                                <Input
                                    type="text"
                                    name="descripcion"
                                    id="item"
                                    placeholder=" Add Descipcion"
                                    onChange={this.onChange}
                                />
                                Date:
                                <input
                                    type="date"
                                    name="date"
                                    id="item"
                                    onChange={this.onChange}
                                ></input>
                                <br></br>
                                <Button
                                    color="dark"
                                    style={{ marginTop: '2rem' }}
                                >Add Item</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

ItemModal.propTypes = {
    addItem: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item
})

export default connect(mapStateToProps, { addItem })(ItemModal);
