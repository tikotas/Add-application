import React from "react";
import styles from './ListItem.module.css'

const ListItem = ({title, value}) => {
    return (
        <div className={styles.list_block}>
            <span>{title} :</span>
            {value}
        </div>
    )
}

export default ListItem;