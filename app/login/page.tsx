
"use client";
import styles from './page.module.css';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function LoginPage() {

    useEffect(() => {
        setPageNum(0);
    }, [])

    const [pageNum, setPageNum] = useState(0);

    const [user, setUser] = useState("");
    const [pronoun, setPronoun] = useState("");

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUser(value);
    }

    const handlePronounChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPronoun(value);
    }
    return (
        <div className={styles.app}>
            <h1 className={styles.title}>Friendship Is Blind</h1>
            <Image
                src="/images/icon.png"
                alt="Logo"
                width={300}
                height={300}
                className={styles.icon}
            />
            {(pageNum == 0) && (
                <>
                    <button className={styles.buttons} onClick={() => setPageNum(1)}>Login</button>
                    <button className={styles.buttons} onClick={() => setPageNum(2)}>Sign Up</button>
                </>
            )}

            {(pageNum == 1) && (
                <>
                    <div className={styles.typinginputcontainer}>
                        <input
                            className={styles.inputfield}
                            type="text"
                            placeholder="Username"
                            autoFocus
                            onChange={handleUserChange}
                            value={user} />
                        <div className={styles.typedtext}>
                            <h1>{user}</h1>
                        </div>
                    </div>
                    <Link href= "/mainMenu">
                        <button className={styles.buttons}>Login</button>
                    </Link>
                </>
            )}

            {(pageNum == 2) && (
                <>
                    <div className={styles.typinginputcontainer}>
                        <input
                            className={styles.inputfield}
                            type="text"
                            placeholder="Username"
                            autoFocus
                            onChange={handleUserChange}
                            value={user} />
                        <div className={styles.typedtext}>
                            <h1>{user}</h1>
                        </div>
                    </div>
                    <div className={styles.typinginputcontainer}>
                        <input
                            className={styles.inputfield}
                            type="text"
                            placeholder="Pronouns"
                            autoFocus
                            onChange={handlePronounChange}
                            value={pronoun} />
                        <div className={styles.typedtext}>
                            <h1>{pronoun}</h1>
                        </div>
                    </div>
                    <Link href={{
                        pathname: "/profile",
                        query:{
                            username: user
                        }
                        }}>
                        <button className={styles.buttons}>Sign Up</button>
                    </Link>
                </>
            )}
        </div>
    )
};

export default LoginPage;
