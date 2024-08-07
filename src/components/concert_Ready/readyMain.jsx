import "../../styles/Eojin/readyMain.css";
import React, { useState } from 'react';

import ReadyHeader from "./readyHeader";
import ReadyQsheet from "./readyQsheet";
import ReadyRequest from "./readyRequest";
import ReadyComplete from "./readyComplete";

const ReadyMain = () => {
    const [step, setStep] = useState(1);

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
                {step === 1 && <ReadyQsheet nextStep={nextStep} />}
                {step === 2 && <ReadyRequest preStep={preStep} nextStep={nextStep} />}
                {step === 3 && <ReadyComplete />}
            </div>
        </div>
    )
};

export default ReadyMain;