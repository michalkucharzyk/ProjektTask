import React from "react";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import * as taskApi from "../../helpers/TaskApi";
import FormTask from "../FormTask/FormTask";
import TaskItem from "../TaskItem/TaskItem";
import styles from "./ListTask.module.scss";
import * as _ from "ramda";
import * as boardApi from "../../helpers/BoardApi";


class ListTask extends React.Component {
    state = {
        showModal: false,
        idBoard: null,
        tasks: [],
    };

    /**
     * Pobranie danych
     * @returns {Promise<void>}
     */
    componentDidMount = async () => {
        this.setIdBoard();
        this.getTasks();
    };

    /**
     * Ustawnie id board w stae
     */
    setIdBoard = () => {
        this.setState({
            idBoard: this.props.idBoard
        })
    };

    /**
     * Pobranie taskow dla wskaznej tablicy
     * @returns {Promise<void>}
     */
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

    /**
     * Otwarcie formularz dodawania
     */
    openModalInsert = () => {
        this.setState({
            showModal: true
        });
    };

    /**
     * Zamknięcie formularz dodwania
     */
    closeModal = () => {
        this.setState({
            showModal: false
        });
    };

    /**
     * Obsługa dodawania taskow do bazy
     * @param values
     * @returns {Promise<void>}
     * @constructor
     */
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
            board: arr[index]
        }
    };

    /**
     * Usuwanie tasków z bazy
     * @param e
     * @param id
     * @returns {Promise<void>}
     */
    deleteTaskFn = async (e, id) => {
        e.preventDefault();
        const {tasks} = this.state;
        await taskApi.deleteTask(id);
        const {index} = this.findById(id, tasks);
        this.setState({
            tasks: _.remove(index, 1, tasks)
        });
    };

    /**
     * Renderowanie contentu
     * @returns {*}
     */
    render() {
        const {tasks} = this.state;
        const {nameBoard} = this.props;
        return (
            <>
                {tasks.length ? (
                    <div className={styles.wrapper}>
                        {tasks.map(item =>
                            <TaskItem deleteTaskFn={this.deleteTaskFn}
                                      key={item.id} {...item}/>
                        )}
                    </div>
                ) : (
                    <div>
                        <p>Brak dodanych zadań {nameBoard}</p>
                    </div>
                )}
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