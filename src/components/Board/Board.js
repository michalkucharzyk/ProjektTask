import React from "react";
import * as boardApi from "../../helpers/BoardApi";
import styles from './Board.module.scss';
import BoardItem from "./BoardItem";
import Modal from "../Modal/Modal";
import FormBoard from "../FormBoard/FormBoard";
import Button from "../Button/Button";
import * as _ from 'ramda';
import FormBoardUpdate from "../FormBoard/FormBoardUpdate";


class Board extends React.Component {

    state = {
        showModal: false,
        insert: true,
        currentBoard: null,
        board: null,
        boards: []
    };

    openModalInsert = () => {
        this.setState({
            showModal: true,
            insert: true,
        })
    };
    openModalUpdate = () => {
        this.setState({
            showModal: true,
            insert: false,
        })
    };

    closeModal = () => {
        this.setState({
            showModal: false
        })
    };

    insertBoard = async (values, user) => {
        const board = await boardApi.insertBoard({userId: user.id, ...values});
        if (board.success === true) {
            this.setState(prevState => ({
                boards: [...prevState.boards, board.content]
            }));

            this.closeModal();
        }
    };

    componentDidMount = async () => {
        const {id} = this.props.user;
        await this.getBoard(id);
    };

    getBoard = async (user) => {
        if (user) {
            const boards = await boardApi.getAllByUserId(user);
            if (boards.success) {
                this.setState({
                    boards: boards.content
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
        await boardApi.deleteBoard(150);
        const {index} = this.findById(id, boards);
        this.setState({
            boards: _.remove(index, 1, boards)
        });
    };
    handleUpdateBoard = async (e, id) => {
        e.preventDefault(e);
        const {boards} = this.state;
        const {board} = this.findById(id, boards);
        this.setState({
            currentBoard: board
        });
        this.openModalUpdate();
    };

    updateBoard = async (values) => {
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
        const {boards} = this.state;
        return (
            <>
                {boards.length ? (
                    <div className={styles.wrapper}>
                        {boards.map(item =>
                            <BoardItem deleteBoardFn={this.deleteBoard} handleUpdateBoardFn={this.handleUpdateBoard}
                                       key={item.id} {...item}/>
                        )}
                    </div>
                ) : (
                    <div className={styles.noBoard}>
                        <p>Brak dodanych zadań</p>
                    </div>
                )}
                {this.state.showModal ? (
                    <>
                        <Modal closeModalFn={this.closeModal}>
                            {this.state.insert
                                ? <FormBoard InsertBoardFn={this.insertBoard}> </FormBoard>
                                : <FormBoardUpdate board={this.state.currentBoard}
                                                   UpdateBoardFn={this.updateBoard}> </FormBoardUpdate>
                            }
                        </Modal>
                    </>
                ) : null
                }
                <Button onClick={this.openModalInsert}>Dodaj grupe</Button>
            </>
        )
    }
}

export default Board;