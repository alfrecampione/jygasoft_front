import {useEffect,useState} from "react";
import styles from "@/styles/index.module.css"
import axios from "axios";
import {PersonDto} from "@/Dto/in/CreatePerson";
import {PaymentDto} from "@/Dto/in/CreatePayment";
import {type} from "os";

const PORT = 7221;
export default function Home() {
  return (
    <>
      <div>
        <CreatePersonStack/>
      </div>
    </>
  );
}

function CreatePersonStack() {
const [personList, setPersonList] = useState<PersonDto[]>([]);
const URL = 'https://localhost:'+PORT+'/api/Person';
  useEffect(() => {
    axios.get(URL)
        .then((response) => {
            setPersonList(response.data)
        })
        .catch((error) => {
          console.log(error);
        })
  }, [])
  return(
      <div className={styles.personList}>
        {personList.map((person: PersonDto, index) =>
            <div key={index}>
                <CreatePerson person={person}/>
            </div>
        )}
      </div>
  )
}

type Person = {
  person: PersonDto
}
function CreatePerson({person}:Person){
  const [opened, SetOpened] = useState(false);
  const handleDivClick = () => {
    SetOpened(!opened);
  }
    return(
      <>
      <div className={styles.person} onClick={handleDivClick}>
        <p>{person.fullName}</p>
        <p>{person.email}</p>
        <p>{person.interestRate}%</p>
        <p>{person.startAmount}</p>
        <p>{person.paidAmount}</p>
        <p>{person.totalAmount}</p>
      </div>
      {opened &&
          <CreatePaymentList ci={person.ci} />}
      </>
  )
}
type PaymentCi={
  ci : string
}
function CreatePaymentList({ci}:PaymentCi){
  const [paymentList, setPaymentList] = useState<PaymentDto[]>([]);
  const URL = 'https://localhost:'+PORT+'/api/Payment/'+ci;
    useEffect(() => {
        axios.get(URL)
            .then((response) => {
                setPaymentList(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])
  return (
      <div className={styles.loanList}>
        {paymentList.map((payment, index) =>
          <div key={index} className={styles.loan}>
            <p>{payment.amount}</p>
            <p>{payment.paymentPeriod}</p>
            <p>{payment.payDate}</p>
            <p>{payment.status}</p>
          </div>
        )}
      </div>
  )

}