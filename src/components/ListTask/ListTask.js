import React from "react";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import * as taskApi from "../../helpers/TaskApi";
import FormTask from "../FormTask/FormTask";
import * as boardApi from "../../helpers/BoardApi";

class ListTask extends React.Component {
    state = {
        showModal: false,
        idBoard: null,
        tasks: [],
    };

    componentDidMount  = async () => {
        this.setIdBoard();
        this.getTasks();
    };

    setIdBoard = () => {
        this.setState({
            idBoard: this.props.idBoard
        })
    };

    getTasks = async () => {
        const {idBoard} = this.props;
        if (idBoard) {
            const response = await taskApi.getAllByBoardId(idBoard);
            if (response.success) {
                this.setState({
                    tasks: response.content
                })
            }
        }
    };

    openModalInsert = () => {
        this.setState({
            showModal: true
        });
    };

    closeModal = () => {
        this.setState({
            showModal: false
        });
    };

    InsertTaskFn = async (values) => {
        const {idBoard} = this.state;
        const response = await taskApi.insertTask({'boardId': idBoard, ...values});
        if (response.success === true) {
            this.setState(prevState => ({
                tasks: [...prevState.tasks, response.content]
            }));

            this.closeModal();
        }
    };

    render() {
        return (
            <>
                {this.state.showModal ? (
                    <>
                        <Modal closeModalFn={this.closeModal}>
                            <FormTask InsertTaskFn={this.InsertTaskFn}> </FormTask>
                        </Modal>
                    </>
                ) : null}
                <Button onClick={this.openModalInsert}>Dodaj grupe</Button>
            </>
        )
    }
}

export default ListTask