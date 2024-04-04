import {PaymentDto} from '@/Dto/in/CreatePayment';
import { useRouter } from 'next/router';
import React, {useEffect, useState} from "react";
import {PORT} from "@/pages";
import axios from "axios";
import styles from "@/styles/payments.module.css";
import Link from "next/link";



type FormType = {
    PersonCI: string;
    Amount: string;
    [key: string]: string;
};

export default function Home() {
    const [paymentList, setPaymentList] = useState<PaymentDto[]>([]);

    const router = useRouter();
    const [form, setForm] = useState<FormType>({
        PersonCI: router.query.param1 as string,
        Amount: '',
    });

    const URL = 'https://localhost:'+PORT+'/api/Payment/'+router.query.param1;
    useEffect(() => {
        axios.get(URL)
            .then((response) => {
                setPaymentList(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            personCI: form.PersonCI,
            amount: Number(form.Amount)
        };

        axios.post('https://localhost:'+PORT+'/api/Payment', data)
            .then(response => {
                axios.get(URL)
                    .then((response) => {
                        setPaymentList(response.data)
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
        <div className={styles.link}>
            <Link href="/" >
                <h4>Home</h4>
            </Link>
        </div>
        <div className={styles.paymentList}>
            {paymentList.map((payment, index) =>
                <div key={index} className={styles.payment}>
                    <p>{payment.amount}</p>
                    <p>{payment.paymentPeriod}</p>
                    <p>{payment.payDate}</p>
                    <p>{payment.status}</p>
                </div>
            )}
        </div>

            <div className={styles.pay}>
                <h2>Make Payment</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <p>Amount:</p>
                        <input name="Amount" required onChange={handleChange} />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}