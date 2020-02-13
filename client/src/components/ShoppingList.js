import React, { Component } from 'react'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {

  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = (id) => {
    console.log(id)
    this.props.deleteItem(id);
  }

  onUpdate = (id) => {
    console.log('update')
  }

  render() {
    const { items } = this.props.item;
    console.log(this.props.item);
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map((item, index) => (
              <CSSTransition key={index} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, item._id)}
                  > &times;
                  </Button>
                  <Button
                    className="removse-btn"
                    color="info"
                    size="sm"
                    onClick={this.onUpdate.bind(this, item._id)}
                  > !
                  </Button>
                  <p>
                    Title: {item.title}
                  </p>
                  <p>
                    Description: {item.description}
                  </p>
                  <p>
                    Date: {item.date}
                  </p>
                  <p>
                    State:  {item.taskStatus}
                  </p>
                  {/* {(item.taskStatus)? (<button onClick={() => this.props.setTaskNotDone(task._id)}>Pending</button>)
                  : (<button onClick={() => this.props.setTaskDone(task._id)}>Done</button>)
                } */}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>

      </Container>
    )
  }
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  item: state.item
})

export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(ShoppingList)
