import React from "react";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import * as taskApi from "../../helpers/TaskApi";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import styles from "./TaskList.module.scss";
import * as _ from "ramda";
import {confirmAlert} from "react-confirm-alert";


class TaskList extends React.Component {
    state = {
        showModal: false,
        idBoard: this.props.idBoard,
        task: {},
        tasks: [],
    };

    /**
     *
     * @returns {Promise<void>}
     */
    componentDidMount = async () => {
        this.getTasks();
    };

    /**
     *
     * @returns {Promise<void>}
     */
    getTasks = async () => {
        const {idBoard} = this.state;
        if (idBoard) {
            const response = await taskApi.getAllByBoardId(idBoard);
            if (response.success) {
                this.setState({
                    tasks: response.content
                })
            }
        }
    };

    /**
     *
     */
    openModal = () => {
        this.setState({
            showModal: true,
        });
    };

    /**
     *
     */
    closeModal = () => {
        this.setState({
            showModal: false,
            task: {}
        });
    };

    /**
     *
     * @param values
     * @param actions
     * @returns {Promise<void>}
     * @constructor
     */
    insertTask = async (values, actions) => {
        const {idBoard} = this.state;
        const response = await taskApi.insertTask({'boardId': idBoard, ...values});

        if (response.success === true) {
            this.setState(prevState => ({
                tasks: [response.content, ...prevState.tasks,]
            }));
            this.closeModal();
        } else {
            actions.setFieldError("title", response.message)
        }
    };

    /**
     *
     * @param id
     * @param arr
     * @returns {{index: any, board: *}}
     */
    findById = (id, arr) => {
        const index = _.findIndex(_.propEq('id', id))(arr);
        return {
            index,
            task: arr[index]
        }
    };

    /**
     *
     * @param id
     */
    handleDeleteTask = async (id) => {
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div className="popupConfirm--wrapper">
                        <h1>Czy jesteś pewny?</h1>
                        <p>Chesz usunąc ten wpis?</p>
                        <div className="popupConfirm__containerBtn">
                            <Button onClick={onClose}>Nie</Button>
                            <Button
                                onClick={() => {
                                    this.deleteTask(id);
                                    onClose();
                                }} >
                                Tak
                            </Button>
                        </div>
                    </div>
                );
            }
        });
    };


    /**
     *
     * @param e
     * @param id
     * @returns {Promise<void>}
     */
    deleteTask = async (id) => {
        const {tasks} = this.state;
        await taskApi.deleteTask(id);
        const {index} = this.findById(id, tasks);
        this.setState({
            tasks: _.remove(index, 1, tasks)
        });
    };

    /**
     *
     * @param id
     * @returns {Promise<void>}
     */
    handleUpdateTask = async (id) => {
        const {tasks} = this.state;
        const {task} = this.findById(id, tasks);
        this.setState({
            task: task
        });
        this.openModal();

    };

    /**
     *
     * @param values
     * @param actions
     * @returns {Promise<void>}
     */
    updateTask = async (values, actions) => {
        const {tasks} = this.state;
        const {index} = this.findById(values.id, tasks);
        const response = await taskApi.updateTask(values);

        if (response.success === true) {
            this.setState({
                tasks: _.update(index, values, tasks)
            });
            this.closeModal();
        } else {
            actions.setFieldError("title", response.message)
        }

    };

    /**
     *
     * @returns {*}
     */
    render() {
        const {tasks, task} = this.state;
        const {nameBoard} = this.props;
        return (
            <>
                {tasks.length ? (
                    <div className={styles.wrapper}>
                        <table className={styles.table}>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Tytuł</th>
                                <th>Opis</th>
                                <th>Status</th>
                                <th>Akcje</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tasks.map(item =>
                                <TaskItem deleteTaskFn={this.handleDeleteTask} handleUpdateTaskFn={this.handleUpdateTask}
                                          key={item.id} {...item}/>
                            )}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>
                        <p>Brak dodanych zadań {nameBoard}</p>
                    </div>
                )}
                {this.state.showModal ? (
                    <>
                        <Modal closeModalFn={this.closeModal}>
                            <TaskForm insertTaskFn={this.insertTask} updateTaskFn={this.updateTask}
                                      currentTask={task}> </TaskForm>
                        </Modal>
                    </>
                ) : null}
                <Button onClick={this.openModal}>Dodaj zadanie</Button>
            </>
        )
    }
}

export default TaskList