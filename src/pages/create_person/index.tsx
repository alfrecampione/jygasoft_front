import axios from 'axios';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from "@/styles/create_person.module.css"

export default function Home() {
    const [form, setForm] = useState<FormType>({
        CI: '',
        Name: '',
        FatherLastName: '',
        MotherLastName: '',
        AmountBorrowed: '',
        PhoneNumber: '',
        Email: '',
        DateBorrowed: '',
        DayOfPayment: '',
        MonthsToPay: '',
        InterestRate: ''
    });

    type FormType = {
        CI: string;
        Name: string;
        FatherLastName: string;
        MotherLastName: string;
        AmountBorrowed: string;
        PhoneNumber: string;
        Email: string;
        DateBorrowed: string;
        DayOfPayment: string;
        MonthsToPay: string;
        InterestRate: string;
        [key: string]: string;
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        if (e.target.name === "dateBorrowed") {
            const dateParts = value.split("-");
            value = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`; // Formatea la fecha como dd/mm/yyyy
        }
        setForm({
            ...form,
            [e.target.name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in form) {
            formData.append(key, form[key]);
        }

        axios.post('https://localhost:7221/api/Person', formData)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <>
            <div className={styles.form}>
            <div className={styles.link}>
                <Link href="/" >
                    Home
                </Link>
            </div>
            <div className={styles.table}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <p>CI:</p>
                        <input name="CI" required onChange={handleChange} />
                    </div>
                    <div>
                        <p>Name:</p>
                        <input name="Name" required onChange={handleChange} />
                    </div>
                    <div>
                        <p>Father's Last Name:</p>
                        <input name="FatherLastName" required onChange={handleChange} />
                    </div>
                    <div>
                        <p>Mother's Last Name:</p>
                        <input name="MotherLastName" required onChange={handleChange} />
                    </div>
                    <div>
                        <p>Amount Borrowed:</p>
                        <input name="AmountBorrowed" required onChange={handleChange} />
                    </div>
                    <div>
                        <p>Phone:</p>
                        <input name="PhoneNumber" onChange={handleChange} />
                    </div>
                    <div>
                        <p>Email:</p>
                        <input name="Email" required onChange={handleChange} />
                    </div>
                    <div>
                        <p>Date Borrowed:</p>
                        <input name="DateBorrowed" type="date" onChange={handleChange} />
                    </div>
                    <div>
                        <p>Day of Payment:</p>
                        <input name="DayOfPayment" type="number" onChange={handleChange} />
                    </div>
                    <div>
                        <p>Months to Pay:</p>
                        <input name="MonthsToPay" type="number" onChange={handleChange} />
                    </div>
                    <div>
                        <p>Interest Rate:</p>
                        <input name="InterestRate" type="number" onChange={handleChange} />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
            </div>
        </>
    );
}