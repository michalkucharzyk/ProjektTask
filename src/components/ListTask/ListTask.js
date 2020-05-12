import React from "react";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import * as taskApi from "../../helpers/TaskApi";
import FormTask from "../FormTask/FormTask";
import TaskItem from "../TaskItem/TaskItem";
import styles from "./ListTask.module.scss";
import * as _ from "ramda";

class ListTask extends React.Component {
    state = {
        showModal: false,
        idBoard:  this.props.idBoard,
        task: {},
        tasks: [],
    };

    /**
     * Pobranie danych
     * @returns {Promise<void>}
     */
    componentDidMount = async () => {
        this.getTasks();
    };

    /**
     * Pobranie taskow dla wskaznej tablicy
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
     * Otwarcie formularz dodawania
     */
    openModal = () => {
        this.setState({
            showModal: true,
        });
    };

    /**
     * Zamknięcie formularz dodwania
     */
    closeModal = () => {
        this.setState({
            showModal: false,
            task:{}
        });
    };

    /**
     * Obsługa dodawania taskow do bazy
     * @param values
     * @returns {Promise<void>}
     * @constructor
     */
    insertTask = async (values) => {
        const {idBoard} = this.state;
        const response = await taskApi.insertTask({'boardId': idBoard, ...values});
        if (response.success === true) {
            this.setState(prevState => ({
                tasks: [...prevState.tasks, response.content]
            }));

            this.closeModal();
        }
    };

    /**
     * Funkcja wyszukujaca index i element w tablicy o wskaznym id
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
     * Usuwanie tasków z bazy
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

    handleUpdateTask = async (id) =>
    {
        const {tasks} = this.state;
        const{task} = this.findById(id, tasks);
        this.setState({
            task: task
        });
        this.openModal();

    };

    updateTask = async (values) =>{
        const {tasks} = this.state;
        const {index} = this.findById(values.id, tasks);
        const response = await taskApi.updateTask(values);

        if (response.success === true) {
            this.setState({
                tasks: _.update(index, values, tasks)
            });
        }
        this.closeModal();
    };

    /**
     * Renderowanie contentu
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
                                    <TaskItem deleteTaskFn={this.deleteTask} handleUpdateTaskFn={this.handleUpdateTask}
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
                            <FormTask insertTaskFn={this.insertTask} updateTaskFn={this.updateTask} currentTask={task}> </FormTask>
                        </Modal>
                    </>
                ) : null}
                <Button onClick={this.openModal}>Dodaj zadanie</Button>
            </>
        )
    }
}

export default ListTask