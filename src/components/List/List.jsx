import React from "react";
import ListItem from "../ListItem/ListItem";
import style from './List.module.css'
import {store} from "../store/store";

const {inputState} = store
const List = ({items, length, handleDelete, handleCheck}) => {
    return (
        items.map(item => {
            return (
                <div key={item._id} className={style.listItem}>
                    <input
                        type="checkbox"
                        className={style.check}
                        onChange={() => handleCheck(item._id)}
                    />
                    <div>
                        <img src={`https://random.imagecdn.app/250/350?=${item._id}`} alt="defaultPic"/>
                    </div>
                    {
                        inputState.map(el => {
                            return (
                                <React.Fragment key={el.id}>
                                    <ListItem
                                        title={el.title}
                                        value={item[el.name]}
                                    />
                                </React.Fragment>
                            )
                        })
                    }
                    <button
                        onClick={() => handleDelete(item._id)}
                        disabled={length}
                    >
                        Delete
                    </button>
                </div>
            )
        })
    )
}

export default List;