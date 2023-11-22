import { useEffect } from "react";
import { useState } from "react";
import { Fieldset } from 'primereact/fieldset';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Calendar } from 'primereact/calendar';
import { color } from "@mui/system";
const Dates = () => {
    const [start, setStart] = useState("")
    const [end, setEnd] = useState()
    const [date, setDate] = useState([])

    const getAllDates = () => {
        fetch(`https://www.hebcal.com/hebcal?cfg=fc&v=1&i=off&maj=on&min=on&nx=on&mf=on&ss=on&mod=on&lg=he&s=on&start=${start}&end=${end}`)
            .then(response => response.json())
            .then(data => setDate(data))
            .catch('error', console.error("error"))
    }
    const getParashot = () => {
        const filter = date.filter(d => {
            return d.className === 'parashat';
        });
        setDate(filter)
    }


    return (
        <>
            <h1>תאריך התחלה</h1>
            <div >
                <Calendar value={date} dateFormat="yy-mm-dd" onChange={(e) => setStart(e.value.toISOString().slice(0,10))} />
            </div>
            <h1>תאריך סיום</h1>
            <Calendar value={date} dateFormat="yy-mm-dd" onChange={(e) => setEnd(e.value.toISOString().slice(0,10))} /><br></br><br></br>
            <Button onClick={() => getAllDates()} variant="outlined" href="#outlined-buttons">הצג הכל</Button><br></br><br></br>
            <Button onClick={() => getParashot()} variant="outlined" href="#outlined-buttons">הצג פרשות שבוע</Button><br></br>
            <div>
                {date.length > 0 && (
                    <div  >
                        {date.map(i => (
                            // <div style={{ border: '1px solid red' ,height:"300px", width:"400px"}}>
                            //     <h1>{i.title}</h1>
                            //     <p>{i.description}</p>
                            //     <h3>{i.start}</h3>
                            // </div>
                            <fieldset style={{ height: "330px", width: "400px"}}>
                                <legend><h1>{i.title}</h1></legend>
                                <h3>Description:</h3><p>{i.description}</p>
                                <h3>Date:</h3><p>{i.start}</p>
                            </fieldset>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
export default Dates;