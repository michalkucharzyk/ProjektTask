import React from "react";
import * as boardApi from "../../helpers/BoardApi";
import styles from './Board.module.scss';
import BoardItem from "./BoardItem";
import Modal from "../Modal/Modal";
import BoardForm from "./BoardForm";
import Button from "../Button/Button";
import * as _ from 'ramda';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class Board extends React.Component {

    state = {
        showModal: false,
        idUser: this.props.user.id,
        load: false,
        board: {},
        boards: []
    };

    openModal = () => {
        this.setState({
            showModal: true,
        })
    };


    closeModal = () => {
        this.setState({
            showModal: false,
            board: {},
        })
    };

    componentDidMount = async () => {
        await this.getBoard();
    };

    getBoard = async () => {
        const {idUser} = this.state;
        if (idUser) {
            const boards = await boardApi.getAllByUserId(idUser);
            if (boards.success) {
                this.setState({
                    boards: boards.content,
                    load: true
                })
            }
        }
    };

    findById = (id, arr) => {
        const index = _.findIndex(_.propEq('id', id))(arr);
        return {
            index,
            board: arr[index]
        }
    };


    insertBoard = async (values, actions) => {
        const {idUser} = this.state;
        const response = await boardApi.insertBoard({userId: idUser, ...values});
        if (response.success === true) {
            this.setState(prevState => ({
                boards: [...prevState.boards, response.content]
            }));
            this.closeModal();
        } else {
            actions.setFieldError("name", response.message)
        }
    };

    deleteBoard = async (id) =>
    {
        const {boards} = this.state;
        await boardApi.deleteBoard(id);
        const {index} = this.findById(id, boards);
        this.setState({
            boards: _.remove(index, 1, boards)
        });
    };

    handleDeleteBoard = async (e,id) => {
        e.preventDefault();
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className="popupConfirm--wrapper">
                        <h1>Czy jesteś pewny?</h1>
                        <p>Chesz usunąc ten wpis?</p>
                        <div className="popupConfirm__containerBtn">
                        <Button onClick={onClose}>Nie</Button>
                            <Button
                                onClick={() => {
                                    this.deleteBoard(id);
                                    onClose();
                                }}
                            >
                                Tak
                            </Button>
                        </div>
                    </div>
                );
            }
        });
    };

    handleUpdateBoard = (e, id) => {
        e.preventDefault();
        const {boards} = this.state;
        const {board} = this.findById(id, boards);
        this.setState({
            board: board
        });
        this.openModal();
    };

    updateBoard = async (values,actions) => {
        console.log(values);
        const {boards} = this.state;
        const {index} = this.findById(values.id, boards);
        const response = await boardApi.updateBoard(values);
        if (response.success === true) {
            this.setState({
                boards: _.update(index, values, boards)
            });
            this.closeModal();
        }else {
            actions.setFieldError("name", response.message)
        }

    };


    render() {
        const {boards, board, load} = this.state;
        return (
            <>
                {load ? (
                    <>
                        {
                            boards.length ? (
                                <div className={styles.wrapper}>
                                    {boards.map(item =>
                                        <BoardItem deleteBoardFn={this.handleDeleteBoard}
                                                   handleUpdateBoardFn={this.handleUpdateBoard}
                                                   key={item.id} {...item}/>
                                    )}
                                </div>
                            ) : (
                                <div className={styles.noBoard}>
                                    <p>Brak dodanych zadań</p>
                                </div>
                            )
                        }
                    </>
                ) : (
                    <div className={styles.noBoard}>
                        <p>Ladowanie tablicy</p>
                    </div>
                )}
                {this.state.showModal ? (
                    <>
                        <Modal closeModalFn={this.closeModal}>
                            <BoardForm insertBoardFn={this.insertBoard}
                                       updateBoardFn={this.updateBoard}
                                       currentBoard={board}>
                            </BoardForm>
                        </Modal>
                    </>
                ) : null
                }
                <Button onClick={this.openModal}>Dodaj grupe</Button>
            </>
        )
    }
}

export default Board;