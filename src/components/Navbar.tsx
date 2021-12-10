import {FC, Dispatch, SetStateAction} from 'react'
import styles from '@styles/navbar.module.sass'

const Navbar: FC<{setPage: Dispatch<SetStateAction<string>>}> = ({setPage}) => {
    return (
        <nav className={styles.container}>
            <ul className={styles.navigation}>
                <li><button onClick={(e) => {
                    e.preventDefault()
                    setPage((e.target as HTMLButtonElement).innerText.toLowerCase())
                }}>Chats</button></li>
                <li onClick={(e) => {
                    e.preventDefault()
                    setPage((e.target as HTMLButtonElement).innerText.toLowerCase())
                }}><button>Chat</button></li>
                <li onClick={(e) => {
                    e.preventDefault()
                    setPage((e.target as HTMLButtonElement).innerText.toLowerCase())
                }}><button>Friends</button></li>
            </ul>
        </nav>
    )
}

export default Navbar