import "../../styles/Eojin/readyMain.css";
import React, { useState, useEffect } from 'react';

import ReadyHeader from "./readyHeader";
import ReadyQsheet from "./readyQsheet";
import ReadyRequest from "./readyRequest";
import ReadyPoster from "./readyPoster";
import ReadyTicket from "./readyTicket";
import ReadyManage from "./readyManage";
import ReadyComplete from "./readyComplete";

const ReadyMain = () => {
    const [step, setStep] = useState(1);
    const [complete, setComplete] = useState([
        {
            Qsheet: false,
            Request: false,
            Poster: false,
            Detail: false,
        }
    ]);

    const onCheck = (id) => {
        setComplete(prevState => {
            // 이전 상태의 복사본을 만듭니다.
            const updated = [...prevState];
            // 배열의 첫 번째 객체를 업데이트합니다.
            updated[0] = {
                ...updated[0],
                [id]: true
            };
            // 업데이트된 배열을 반환합니다.
            return updated;
        });
    };

    // 상태가 업데이트될 때 로그를 찍습니다.
    useEffect(() => {
        console.log(complete);
    }, [complete]);

    const onClick = (num) => {
        setStep(num);
    };

    const nextStep = () => {
        setStep(prevStep => prevStep + 1);
    };

    const preStep = () => {
        setStep(prevStep => prevStep - 1);
    };

    return (
        <div className="Ready_container">
            <div className="Ready_header"><ReadyHeader step={step} onClick={onClick}/></div>
            <div className="Ready_content">
                {step === 1 && <ReadyQsheet nextStep={nextStep} check={onCheck}/>}
                {step === 2 && <ReadyRequest preStep={preStep} nextStep={nextStep} check={onCheck} />}
                {step === 3 && <ReadyPoster preStep={preStep} nextStep={nextStep} check={onCheck} />}
                {step === 4 && <ReadyTicket preStep={preStep} nextStep={nextStep} check={onCheck} checklist={complete}/>}
                {step === 5 && <ReadyManage preStep={preStep} nextStep={nextStep} />}
                {step === 6 && <ReadyComplete />}
            </div>
        </div>
    )
};

export default ReadyMain;