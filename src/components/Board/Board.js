import React from "react";
import * as boardApi from "../../helpers/BoardApi";
import styles from './Board.module.scss';
import BoardItem from "./BoardItem";
import Modal from "../Modal/Modal";
import FormBoard from "../FormBoard/FormBoard";
import Button from "../Button/Button";
import * as _ from 'ramda';


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

    insertBoard = async (values) => {
        const {idUser} = this.state;
        const board = await boardApi.insertBoard({userId: idUser, ...values});
        if (board.success === true) {
            this.setState(prevState => ({
                boards: [...prevState.boards, board.content]
            }));

            this.closeModal();
        }
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

    deleteBoard = async (e, id) => {
        e.preventDefault();
        const {boards} = this.state;
        await boardApi.deleteBoard(id);
        const {index} = this.findById(id, boards);
        this.setState({
            boards: _.remove(index, 1, boards)
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

    updateBoard = async (values) => {
        console.log(values);
        const {boards} = this.state;
        const {index} = this.findById(values.id, boards);
        const response = await boardApi.updateBoard(values);
        if (response.success === true) {
            this.setState({
                boards: _.update(index, values, boards)
            });
        }
        this.closeModal();
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
                                        <BoardItem deleteBoardFn={this.deleteBoard}
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
                            <FormBoard insertBoardFn={this.insertBoard}
                                       updateBoardFn={this.updateBoard}
                                       currentBoard={board}>
                            </FormBoard>
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