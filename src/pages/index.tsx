import {useEffect,useState} from "react";
import styles from "@/styles/index.module.css"
import axios from "axios";
import {CreatePersonDto} from "@/Dto/in/CreatePerson";
import {CreatePaymentDto} from "@/Dto/in/CreatePayment";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
export default function Home() {
  return (
    <>

    </>
  );
}

type PersonDtoProp = {
  personArr: CreatePersonDto[]
}

function CreatePersonStack({personArr}:PersonDtoProp) {
const [personList, setPersonList] = useState<CreatePersonDto[]>([]);
const port = 3001;
const URL = 'http://localhost:'+port+'/api/person';
  useEffect(() => {
    axios.get(URL)
        .then((response) => {setPersonList(response.data)})
        .catch(error=>console.log(error));
  }, [])
  return (
      <div className={styles.personList}>
        {personArr.map((person: CreatePersonDto, index) =>
            <CreatePerson person={person} index={index}/>
        )}
      </div>
  )
}

type Person = {
  person: CreatePersonDto
  index : number
}
function CreatePerson({person, index}:Person){
  const [opened, SetOpened] = useState(false);
  const handleDivClick = () => {
    SetOpened(!opened);
  }
  return(
      <>
      <div key={index} className={styles.person} onClick={handleDivClick}>
        <p>{person.FullName}</p>
        <p>{person.Email}</p>
        <p>{person.InterestRate}%</p>
        <p>{person.StartAmount}</p>
        <p>{person.PaidAmount}</p>
        <p>{person.TotalAmount}</p>
      </div>
      {opened &&
          <CreatePaymentList ci={person.CI} />}
      </>
  )
}
type PaymentCi={
  ci : string
}
function CreatePaymentList({ci}:PaymentCi){
  const [paymentList, setPaymentList] = useState<CreatePaymentDto[]>([]);
  const port = 3001;
  const URL = 'http://localhost:'+port+'/api/loan/'+ci;
  useEffect(() => {
    axios.get(URL)
        .then((response) => {setPaymentList(response.data)})
        .catch(error=>console.log(error));
  }, [])
  return (
      <div className={styles.loanList}>
        {paymentList.map((payment, index) =>
          <div key={index} className={styles.loan}>
            <p>{payment.Amount}</p>
            <p>{payment.Period}</p>
            <p>{payment.PayDate}</p>
            <p>{payment.Status}</p>
          </div>
        )}
      </div>
  )

}